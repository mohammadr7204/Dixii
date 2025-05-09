import functions_framework
from flask import Request, jsonify
from google.cloud import storage
from google.cloud import firestore
from google.cloud import pubsub_v1
import uuid
import time
import os
import json
from datetime import datetime, timedelta
import firebase_admin
from firebase_admin import auth

# Initialize Firebase app
try:
    firebase_admin.get_app()
except ValueError:
    firebase_admin.initialize_app()

# Initialize Firestore client
db = firestore.Client()

# Initialize Pub/Sub publisher
publisher = pubsub_v1.PublisherClient()

def verify_token(token):
    """Verify Firebase ID token."""
    try:
        return auth.verify_id_token(token)
    except Exception as e:
        print(f"Error verifying token: {e}")
        return None

def extract_token(request):
    """Extract bearer token from authorization header."""
    auth_header = request.headers.get('Authorization', '')
    if auth_header.startswith('Bearer '):
        return auth_header.split('Bearer ')[1]
    return None

@functions_framework.http
def upload_document(request: Request):
    """HTTP Cloud Function to handle document upload."""
    # Set CORS headers for preflight requests
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)

    # Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }

    # Verify authentication
    token = extract_token(request)
    if not token:
        return (jsonify({'error': 'No authentication token provided'}), 401, headers)

    decoded_token = verify_token(token)
    if not decoded_token:
        return (jsonify({'error': 'Invalid authentication token'}), 401, headers)

    user_id = decoded_token['uid']

    try:
        # Check if the request contains a file
        if 'file' not in request.files:
            return (jsonify({'error': 'No file in request'}), 400, headers)

        # Get the file from the request
        uploaded_file = request.files.get('file')

        # Check if the file is empty
        if uploaded_file.filename == '':
            return (jsonify({'error': 'Empty file name'}), 400, headers)

        # Get metadata
        client_id = request.form.get('client_id', 'unknown_client')

        # Generate a unique filename with client_id as prefix
        timestamp = int(time.time())
        unique_id = uuid.uuid4().hex
        unique_filename = f"{client_id}/{timestamp}_{unique_id}_{uploaded_file.filename}"

        # Upload to Cloud Storage
        storage_client = storage.Client()
        bucket = storage_client.bucket('accountantai-documents')
        blob = bucket.blob(unique_filename)

        # Upload the file
        file_content = uploaded_file.read()
        content_type = uploaded_file.content_type or 'application/octet-stream'
        blob.upload_from_string(
            file_content,
            content_type=content_type
        )

        # Create a signed URL for temporary access
        signed_url = blob.generate_signed_url(
            version="v4",
            expiration=timedelta(minutes=15),
            method="GET"
        )

        # Create a document entry in Firestore
        doc_ref = db.collection('documents').document()
        doc_data = {
            'filename': uploaded_file.filename,
            'storage_path': unique_filename,
            'client_id': client_id,
            'user_id': user_id,
            'uploaded_at': firestore.SERVER_TIMESTAMP,
            'processed': False,
            'processing_status': 'pending',
            'metadata': {
                'document_type': 'unknown',
                'file_size': len(file_content),
                'content_type': content_type
            }
        }
        doc_ref.set(doc_data)

        # Publish a message to trigger document processing
        topic_path = publisher.topic_path('dixii-da77b', 'document-processing')
        message_data = {
            'document_id': doc_ref.id,
            'storage_path': unique_filename,
            'bucket': 'accountantai-documents'
        }

        publisher.publish(
            topic_path,
            data=json.dumps(message_data).encode('utf-8')
        )

        # Return success response with document info
        return (jsonify({
            'success': True,
            'document_id': doc_ref.id,
            'filename': uploaded_file.filename,
            'storage_path': unique_filename,
            'signed_url': signed_url,
            'client_id': client_id,
            'processing_status': 'pending'  # Indicate processing is queued
        }), 200, headers)

    except Exception as e:
        print(f"Error processing upload: {e}")
        return (jsonify({'error': str(e)}), 500, headers)