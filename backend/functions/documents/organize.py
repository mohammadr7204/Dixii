# backend/functions/documents/organize.py

import functions_framework
from google.cloud import storage
from google.cloud import firestore
import firebase_admin
from firebase_admin import auth
import re
import time
import json

# Initialize services
try:
    firebase_admin.get_app()
except ValueError:
    firebase_admin.initialize_app()

db = firestore.Client()
storage_client = storage.Client()

@functions_framework.cloud_event
def organize_document(cloud_event):
    """Organize a document based on its content."""
    try:
        # Get the message data from the event
        data = json.loads(cloud_event.data["message"]["data"])
        document_id = data["document_id"]

        # Get the document
        doc_ref = db.collection('documents').document(document_id)
        doc = doc_ref.get()

        if not doc.exists:
            return {'status': 'error', 'message': 'Document not found'}

        # Update document with organization data
        doc_ref.update({
            'organized': True,
            'updatedAt': firestore.SERVER_TIMESTAMP
        })

        return {'status': 'success', 'message': 'Document organized successfully'}

    except Exception as e:
        return {'status': 'error', 'message': str(e)}

def organize_storage_document(storage_path, document_data, client_name):
    """
    Organize a document in Cloud Storage based on extracted data

    Args:
        storage_path: Original path to the file in Cloud Storage
        document_data: Dictionary with extracted document data
        client_name: Client name

    Returns:
        str: New storage path or None on failure
    """
    try:
        # Extract key fields with fallbacks for missing data
        doc_type = document_data.get('document_type', 'unknown')
        period = document_data.get('period_year', 'unknown')

        # Clean up names for filesystem use
        client_clean = clean_filename(client_name)
        doc_type_clean = clean_filename(doc_type)

        # Original file name (from the end of the storage path)
        original_file_name = storage_path.split('/')[-1]

        # Create new path in organized structure
        # Format: organized/{client_name}/{doc_type}/{client_name}_{doc_type}_{period}.pdf
        new_filename = f"{client_clean}_{doc_type_clean}_{period}.pdf"
        new_path = f"organized/{client_clean}/{doc_type_clean}/{new_filename}"

        # Copy file in Cloud Storage
        source_bucket = storage_client.bucket('accountantai-documents')
        source_blob = source_bucket.blob(storage_path)

        destination_blob = source_bucket.copy_blob(
            source_blob, source_bucket, new_path
        )

        # Log the organization
        print(f"Organized document: {storage_path} → {new_path}")

        return new_path

    except Exception as e:
        print(f"Error organizing file {storage_path}: {str(e)}")
        return None

def clean_filename(text):
    """Convert text to a clean filename"""
    if not text:
        return "unknown"

    # Replace spaces with underscores but preserve name format
    # Remove common suffixes like Jr., Sr., III, etc.
    text = re.sub(r'\s+(Jr\.?|Sr\.?|I{1,3}|IV|V)$', '', text)

    # Replace spaces with underscores
    cleaned = text.replace(' ', '_')

    # Remove special characters but keep apostrophes in names
    cleaned = re.sub(r'[^\w\'\-]', '', cleaned)

    # Replace multiple underscores with a single one
    cleaned = re.sub(r'_+', '_', cleaned)

    return cleaned