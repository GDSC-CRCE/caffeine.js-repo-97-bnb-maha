from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from dotenv import load_dotenv
from docx import Document
import mammoth
import os
import sys
import requests
import psycopg2
import json
from bs4 import BeautifulSoup
import google.generativeai as genai
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Configure CORS to allow requests from React frontend
CORS(app, resources={r"/*": {"origins": "*"}})

# Database configuration
db = psycopg2.connect(database=os.getenv('DATABASE_NAME'),
                      user=os.getenv('DATABASE_USER'),
                      password=os.getenv('PASSWORD'),
                      host=os.getenv('DATABASE_HOST'),
                      port=os.getenv('DATABASE_PORT'),
                      keepalives=1, keepalives_idle=30,
                      keepalives_interval=10, keepalives_count=5)

# Configure Google Generative AI with your API key
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("Google API key not found in environment variables.")
genai.configure(api_key=api_key)

# Route to get all services
@app.route('/api/services', methods=["GET"])
def services():
    cur = db.cursor()
    cur.execute('SELECT * FROM services')
    row_headers = [x[0] for x in cur.description]
    rv = cur.fetchall()
    json_data = [dict(zip(row_headers, result)) for result in rv]
    cur.close()
    return jsonify(json_data)

# Route to get forms of a particular service
@app.route('/api/forms', methods=["GET"])
def get_forms():
    service_id = request.args.get('service_id')
    cur = db.cursor()
    cur.execute("""
        SELECT services.service_id, services.service_name, forms.form_id, forms.form_name, forms.form_link
        FROM services
        INNER JOIN forms ON services.service_id = forms.service_id
        WHERE forms.service_id = %s;
    """, [service_id])
    row_headers = [x[0] for x in cur.description]
    rv = cur.fetchall()
    json_data = [dict(zip(row_headers, result)) for result in rv]
    cur.close()
    return jsonify(json_data)

# Route to get all queries for a form
@app.route('/api/form-details', methods=["GET"])
def get_form_details():
    form_id = request.args.get('form_id')
    cur = db.cursor()
    cur.execute("SELECT * FROM forms WHERE form_id = %s;", [form_id])
    row_headers = [x[0] for x in cur.description]
    rv = cur.fetchall()
    json_data = [dict(zip(row_headers, result)) for result in rv]
    
    cur.execute("""
        SELECT * FROM ques_categories WHERE id IN (
            SELECT DISTINCT(category_id) FROM input_ques
            WHERE ques_id IN (SELECT form_query_id FROM form_queries WHERE form_id = %s)
        );
    """, [form_id])
    row_headers = [x[0] for x in cur.description]
    rv = cur.fetchall()
    json_data.extend(dict(zip(row_headers, result)) for result in rv)

    cur.execute("SELECT * FROM input_ques WHERE ques_id IN (SELECT form_query_id FROM form_queries WHERE form_id = %s);", [form_id])
    row_headers = [x[0] for x in cur.description]
    rv = cur.fetchall()
    json_data.extend(dict(zip(row_headers, result)) for result in rv)

    cur.close()
    return jsonify(json_data)

@app.route('/api/final-content', methods=["POST"])
def final_content():
    form_details = request.json
    form_id = form_details["form_id"]

    # Execute the query to fetch the form link
    cur = db.cursor()
    cur.execute("SELECT form_link FROM forms WHERE form_id = %s;", [form_id])
    rv = cur.fetchone()  # Use fetchone() since we expect a single result
    cur.close()

    # Correctly access the first element of the tuple
    if rv is None:
        return jsonify({"error": "Form not found"}), 404

    form_link = rv[0]  # Access the first element (form_link) from the tuple

    # Download the document from the form link
    response = requests.get(form_link)
    directory = './docs'

    if not os.path.exists(directory):
        os.makedirs(directory)

    file_path = './docs/localfile.docx'
    with open(file_path, 'wb') as f:
        f.write(response.content)

    # Open the downloaded document and replace placeholders
    doc = Document(file_path)
    test_keys = sorted([int(x) for x in form_details.keys() if x.isdigit()], reverse=True)

    for key in test_keys:
        old = f'#{key}'
        new = str(form_details[str(key)])

        for p in doc.paragraphs:
            if old in p.text:
                inline = p.runs
                for i in range(len(inline)):
                    if old in inline[i].text:
                        inline[i].text = inline[i].text.replace(old, new)

    # Save the updated document
    output_path = "./docs/Output2.docx"
    doc.save(output_path)

    # Convert the document to HTML using Mammoth
    with open(output_path, 'rb') as f:
        docx_content = mammoth.convert_to_html(f)

    return jsonify({'content': docx_content.value})


# Route to return the final document as a PDF
@app.route('/api/final-form', methods=["POST"])
def final_form():
    contents = request.get_json()
    output_path = 'docs/Output2.pdf'
    
    c = canvas.Canvas(output_path, pagesize=A4)
    width, height = A4
    y_position = height - 50  # Start 50 pixels from the top
    
    for key, value in contents.items():
        line = f"{key}: {value}"
        c.drawString(50, y_position, line)
        y_position -= 20
    
    c.save()
    return send_file(output_path, as_attachment=True)

# Function to generate legal clauses
def generate_legal_clauses(content):
    if not content:
        return {"error": "Content is missing from request"}, 400

    try:
        cleaned_content = BeautifulSoup(content, "html.parser").get_text()

        prompt = (
            f"Based on the following content: {cleaned_content}, generate relevant legal clauses for a contract. "
            "Provide the output as a compact JSON array with each clause having the following structure:\n"
            '[{"clause_title": "Clause 1 Title", "description": "Clause 1 Description"},'
            '{"clause_title": "Clause 2 Title", "description": "Clause 2 Description"}]. '
            "Strictly format the output as JSON only."
        )

        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(prompt)

        if not response or not response.candidates:
            return {"error": "No response generated from the model"}, 500

        clauses_text = response.text.strip() if response.text else ""
        clauses_json = json.loads(clauses_text)

        if not isinstance(clauses_json, list):
            raise ValueError("Generated clauses are not in a JSON array format.")

        return {"clauses": clauses_json}, 200

    except Exception as e:
        return {"error": f"Error generating clauses: {str(e)}"}, 500

# Route for generating legal clauses
@app.route("/generate-clauses", methods=["POST"])
def clauses_endpoint():
    data = request.json
    content = data.get("content")
    return generate_legal_clauses(content)

# Main entry point
if __name__ == '__main__':
    app.run(debug=True, port=5001)
