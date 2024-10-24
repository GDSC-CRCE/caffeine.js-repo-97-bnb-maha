# AI-Powered Legal Document Management System

## Overview

The **AI-Powered Legal Document Management System** is a comprehensive platform designed for efficient creation, editing, and management of legal documents. It supports document upload, updates, and retrieval through advanced vector embedding technology, making it easier to organize and search large volumes of legal texts. The system integrates features like Optical Character Recognition (OCR) and Natural Language Processing (NLP) for enhanced legal text analysis, alongside capabilities for secure digital signatures on documents. Additionally, the platform includes a chatbot feature that can answer queries related to specific legal documents, providing an interactive way to navigate and understand legal content.

## Features

1. **Document Creation, Upload, and Management**:
   - Easy-to-use interface for creating and editing legal documents.
   - Support for uploading various document formats including PDF and DOCX.
   - Document update feature for modifying existing legal texts.
   - Secure and efficient storage of documents in PostgreSQL.

2. **Advanced OCR and Text Extraction**:
   - High-accuracy OCR for extracting text from uploaded images.
   - Automatic text extraction from PDF and image files while maintaining structure.

3. **Legal Text Analysis with InLegalBERT**:
   Powered by the **InLegalBERT** model, the platform offers several legal text processing tasks:
   - **Statute Identification**: Recognizes and categorizes legal statutes.
   - **Legal Issue Spotting**: Highlights key legal issues within documents.
   - **Document Classification**: Classifies legal documents into predefined categories.
   - **IPC Section Classification**: Identifies relevant Indian Penal Code sections in the text.

4. **Vector Embedding for Document Retrieval**:
   - Documents are processed using vector embedding technology to enable efficient search and retrieval based on semantic similarity.
   - Fast and accurate document search results based on legal context.

5. **Digital Signatures**:
   - Supports signing and verifying signatures on legal texts.

6. **Chatbot for Legal Document Queries**:
   - Interactive chatbot feature that allows users to ask questions related to the contents of a legal document.
   - Provides quick responses for statute explanations, legal issue clarifications, or specific document section inquiries.

7. **Interactive and User-Friendly Interface**:
   - Responsive and intuitive user interface.
   - Real-time feedback during document upload, creation, and analysis.
   - Interactive display of extracted text, chatbot responses, and analysis results.

## Technology Stack

### Frontend
- **React.js**: For building interactive user interfaces.
- **React Router**: Smooth navigation across pages.
- **Tailwind CSS**: For responsive and customizable styling.
- **Shadcn UI Components**: Pre-built UI components for professional-grade user experiences.

### Backend
- **Flask**: Python-based lightweight framework for backend services.
- **Flask-CORS**: For secure Cross-Origin Resource Sharing.
- **PostgreSQL**: A powerful relational database for document storage and management.
- **pdfplumber**: For PDF text extraction.
- **Hugging Face Transformers**: Utilizing the InLegalBERT model for legal document analysis.

### Machine Learning and OCR
- **PyTorch**: To run the InLegalBERT model for various NLP tasks.
- **Vector Embedding**: Utilized for fast document search and retrieval.
- **Custom OCR Implementation**: For extracting text from image-based legal documents.

### Chatbot
- **Gemini ai**: Utilized for understanding user queries and providing responses based on the content of the legal document.

## Setup and Installation

1. **Clone the Repository**:
   ```
   git clone [repository-url]
   cd ai-powered-legal-doc-management
   ```

2. **Frontend Setup**:
   ```
   cd client
   npm install
   npm start
   ```
   This will start the development server on `http://localhost:3000`.

3. **Backend Setup**:
   ```
   cd server/python
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```

4. **Database Setup (PostgreSQL)**:
   - Install and configure PostgreSQL.
   - Create a new database for the document management system.
   - Set up the connection parameters in the environment variables.

5. **Starting the Backend Server**:
   ```
   python app.py
   ```
   The Flask server will start on `http://localhost:5000`.

6. **Environment Configuration**:
   - Ensure CORS is properly configured for secure frontend-backend communication.
   - Set up environment variables for API keys, database access, and other configurations.

## Usage Guide

1. **Access the Application**:
   - Navigate to `http://localhost:3000` in your web browser.

2. **Document Creation and Upload**:
   - Create new legal documents directly in the editor or upload existing PDFs and DOCX files.
   - For images, the system will automatically perform OCR and display the extracted text.

3. **Document Retrieval**:
   - Use the search functionality to retrieve documents based on their content. The vector embedding technology ensures accurate and context-based search results.

4. **Document Update**:
   - Select an existing document and update its content through the editor.

5. **Applying Digital Signatures**:
   - Apply digital signatures to your documents.

6. **Chatbot Querying**:
   - Interact with the chatbot to ask questions about the content of the legal document, such as clarifications on legal issues, statutes, or sections.
   - Get real-time responses based on the document analysis.

7. **Legal Text Analysis**:
   - Perform advanced legal text analyses like statute identification, issue spotting, and IPC section classification.
   - View the results in an easy-to-understand format.

## Project Structure

- `/client`: React frontend application.
  - `/src`: Source files for React components.
  - `/public`: Public assets and HTML entry point.
- `/server/python`: Flask backend.
  - `/bert`: Main Flask application and NLP model integrations.
  - `/ocr`: OCR processing modules.
  - `/Opennyai`: Additional AI components for legal text analysis (details pending).

## Contributing

Contributions are welcome to improve this legal document management system! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
5. Push to the branch (`git push origin feature/AmazingFeature`).
6. Open a Pull Request.

Ensure your code adheres to the project's coding standards, and include appropriate tests for new features.

## License

[Specify the license here, e.g., MIT License, Apache License 2.0, etc.]

## Contact and Support

For questions, feature requests, or support, please contact:

**Team Name** : Caffiene.js 

**Team Members**
 - [**Shreya Rathod**](https://github.com/shreyarathod)
 - [**Riva Rodrigues**](https://github.com/Riva-Rodrigues)
 - [**Nirmitee Sarode**](https://github.com/NirmiteeS)
 - [**Tabish Shaikh**](https://github.com/shktabish)

## Acknowledgments

- Appreciation to the open-source community for the libraries and tools used in this project.
