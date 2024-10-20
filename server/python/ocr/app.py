from flask import Flask, request, jsonify
import easyocr
from flask_cors import CORS
from PIL import Image
import io

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all routes and origins

# Initialize EasyOCR reader
reader = easyocr.Reader(['en'])  # Specify the language(s)

@app.route('/extract-text', methods=['POST'])
def extract_text():
    # Check if an image file is present in the request
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400
    
    image_file = request.files['image']

    # Open the image using PIL
    img = Image.open(image_file)

    # Convert the image to byte stream for easyOCR
    img_bytes = io.BytesIO()
    img.save(img_bytes, format='PNG')
    img_bytes = img_bytes.getvalue()

    # Use EasyOCR to extract text
    results = reader.readtext(img_bytes)

    # Extract only the text from results
    extracted_text = ' '.join([text for _, text, _ in results])
    print(extracted_text)

    # Return the extracted text as plain text (or JSON if preferred)
    return jsonify({'extracted_text': extracted_text}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5002)
