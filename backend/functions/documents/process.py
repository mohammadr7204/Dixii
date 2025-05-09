# backend/functions/documents/process.py

import functions_framework
from google.cloud import storage
from google.cloud import firestore
from google.cloud import pubsub_v1
import firebase_admin
from firebase_admin import auth
import base64
import io
import time
from datetime import datetime
import json
import os

# PDF processing
from pdf2image import convert_from_bytes
import anthropic

# Initialize services
try:
    firebase_admin.get_app()
except ValueError:
    firebase_admin.initialize_app()

db = firestore.Client()
storage_client = storage.Client()
publisher = pubsub_v1.PublisherClient()

# Anthropic configuration
ANTHROPIC_MODEL = "claude-3-opus-20240229"
MAX_TOKENS = 1000
API_MAX_RETRIES = 3

@functions_framework.cloud_event
def process_document(cloud_event):
    """Process a document when it's uploaded to Cloud Storage."""
    try:
        # Get the bucket and file information from the event
        data = cloud_event.data
        bucket_name = data["bucket"]
        file_name = data["name"]

        # Initialize clients
        storage_client = storage.Client()
        db = firestore.Client()

        # Get the file metadata
        bucket = storage_client.bucket(bucket_name)
        blob = bucket.blob(file_name)

        # Update document status in Firestore
        doc_ref = db.collection('documents').document(file_name)
        doc_ref.update({
            'status': 'processing',
            'updatedAt': firestore.SERVER_TIMESTAMP
        })

        # TODO: Add your document processing logic here
        # For example: OCR, text extraction, etc.

        # Update document status to completed
        doc_ref.update({
            'status': 'completed',
            'updatedAt': firestore.SERVER_TIMESTAMP
        })

        return {'status': 'success', 'message': 'Document processed successfully'}

    except Exception as e:
        # Update document status to error
        if 'doc_ref' in locals():
            doc_ref.update({
                'status': 'error',
                'error': str(e),
                'updatedAt': firestore.SERVER_TIMESTAMP
            })
        return {'status': 'error', 'message': str(e)}

def process_with_claude(file_content):
    """
    Process a document using Anthropic Claude API to extract important tax information

    Args:
        file_content: The binary content of the PDF file

    Returns:
        dict: Extracted document data
    """
    try:
        # Convert PDF to image
        images = None
        pdf_conversion_retries = 3

        for attempt in range(pdf_conversion_retries):
            try:
                images = convert_from_bytes(file_content, first_page=1, last_page=1)
                break
            except Exception as e:
                if attempt < pdf_conversion_retries - 1:
                    print(f"PDF conversion failed (attempt {attempt+1}/{pdf_conversion_retries}). Retrying: {str(e)}")
                    time.sleep(1)
                else:
                    print(f"PDF conversion failed after {pdf_conversion_retries} attempts")
                    raise

        # Encode image to base64
        buffered = io.BytesIO()
        images[0].save(buffered, format="PNG")
        image_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')

        # Initialize Anthropic client
        client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

        # Prepare prompt for document analysis
        prompt = """
        Please analyze this financial document and extract the following information:

        1. Document type (e.g., W-2, 1099-INT, 1099-R, Investment Statement, Account Summary, etc.)
        2. Statement period or tax year
        3. Financial institution name (if applicable)
        4. Account number (last 4 digits or masked, if applicable)

        Format your response exactly as follows, with each item on a new line:
        Document type: [type]
        Period/Year: [period]
        Institution: [name]
        Account number: [number]
        """

        # Call Anthropic Claude API with error handling
        response = None
        for attempt in range(API_MAX_RETRIES):
            try:
                response = client.messages.create(
                    model=ANTHROPIC_MODEL,
                    max_tokens=MAX_TOKENS,
                    messages=[
                        {
                            "role": "user",
                            "content": [
                                {
                                    "type": "text",
                                    "text": prompt
                                },
                                {
                                    "type": "image",
                                    "source": {
                                        "type": "base64",
                                        "media_type": "image/png",
                                        "data": image_base64
                                    }
                                }
                            ]
                        }
                    ]
                )
                break
            except Exception as api_error:
                if attempt < API_MAX_RETRIES - 1:
                    # Calculate backoff time (1s, 2s, 4s...)
                    backoff = 2 ** attempt
                    print(f"API call failed (attempt {attempt+1}/{API_MAX_RETRIES}). Retrying in {backoff}s: {str(api_error)}")
                    time.sleep(backoff)
                else:
                    print(f"API call failed after {API_MAX_RETRIES} attempts")
                    raise

        # Extract text from response
        extracted_text = response.content[0].text

        # Parse the extracted text
        document_data = parse_ai_response(extracted_text)

        return document_data

    except Exception as e:
        print(f"Error processing document with Claude: {str(e)}")
        return None

def parse_ai_response(text):
    """
    Parse the AI response into a structured dictionary

    Args:
        text: Text response from Claude

    Returns:
        dict: Structured document data
    """
    data = {
        'document_type': '',
        'period_year': '',
        'institution': '',
        'account_number': '',
        'raw_ai_response': text  # Store the raw response for debugging
    }

    # Parse line by line
    lines = text.split('\n')
    for line in lines:
        line = line.strip()
        if not line:
            continue

        # Extract document type
        if "document type:" in line.lower():
            data['document_type'] = line.split(":", 1)[1].strip()

        # Extract period/year
        elif "period" in line.lower() or "year" in line.lower():
            data['period_year'] = line.split(":", 1)[1].strip()

        # Extract institution
        elif "institution" in line.lower() or "payer" in line.lower():
            data['institution'] = line.split(":", 1)[1].strip()

        # Extract account number
        elif "account number" in line.lower():
            data['account_number'] = line.split(":", 1)[1].strip()

    return data