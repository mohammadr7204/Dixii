import functions_framework
from flask import jsonify, request
from google.cloud import storage
from google.cloud import firestore
import firebase_admin
from firebase_admin import auth
import os
import json
from datetime import datetime
import uuid

# Initialize Firebase app
try:
    firebase_admin.get_app()
except ValueError:
    firebase_admin.initialize_app()

# Initialize clients
storage_client = storage.Client()
db = firestore.Client()

def verify_auth(request):
    """Verify Firebase token in request."""
    auth_header = request.headers.get('Authorization', '')
    if not auth_header.startswith('Bearer '):
        return None, 'No authentication token provided'

    token = auth_header.split('Bearer ')[1]
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token, None
    except Exception as e:
        return None, str(e)

@functions_framework.http
def upload_document(request):
    """Handle document upload."""
    # Verify authentication
    user, error = verify_auth(request)
    if error:
        return jsonify({'error': error}), 401

    # Set CORS headers
    headers = {
        'Access-Control-Allow-Origin': os.getenv('ALLOWED_ORIGINS', 'http://localhost:3000')
    }

    if request.method == 'OPTIONS':
        headers.update({
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '3600'
        })
        return ('', 204, headers)

    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400, headers

        file = request.files['file']
        client_id = request.form.get('clientId')

        # Generate unique filename
        file_extension = os.path.splitext(file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_extension}"

        # Upload to Cloud Storage
        bucket = storage_client.bucket(os.getenv('STORAGE_BUCKET', 'accountantai-documents'))
        blob = bucket.blob(f"documents/{user['uid']}/{unique_filename}")
        blob.upload_from_file(file)

        # Create document record in Firestore
        doc_ref = db.collection('documents').document()
        doc_data = {
            'id': doc_ref.id,
            'userId': user['uid'],
            'clientId': client_id,
            'fileName': file.filename,
            'fileType': file.content_type,
            'fileSize': file.content_length,
            'downloadURL': blob.public_url,
            'storagePath': blob.name,
            'createdAt': datetime.utcnow().isoformat(),
            'updatedAt': datetime.utcnow().isoformat(),
            'category': 'Uncategorized'
        }
        doc_ref.set(doc_data)

        return jsonify(doc_data), 200, headers

    except Exception as e:
        return jsonify({'error': str(e)}), 500, headers

@functions_framework.http
def list_documents(request):
    """List documents with optional filtering."""
    # Verify authentication
    user, error = verify_auth(request)
    if error:
        return jsonify({'error': error}), 401

    # Set CORS headers
    headers = {
        'Access-Control-Allow-Origin': os.getenv('ALLOWED_ORIGINS', 'http://localhost:3000')
    }

    if request.method == 'OPTIONS':
        headers.update({
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '3600'
        })
        return ('', 204, headers)

    try:
        # Get query parameters
        search = request.args.get('search', '')
        category = request.args.get('category', '')

        # Build query
        query = db.collection('documents').where('userId', '==', user['uid'])

        if category:
            query = query.where('category', '==', category)

        # Execute query
        docs = query.stream()

        # Process results
        documents = []
        for doc in docs:
            doc_data = doc.to_dict()
            if search:
                # Simple search in filename and category
                if (search.lower() in doc_data['fileName'].lower() or
                    search.lower() in doc_data.get('category', '').lower()):
                    documents.append(doc_data)
            else:
                documents.append(doc_data)

        return jsonify(documents), 200, headers

    except Exception as e:
        return jsonify({'error': str(e)}), 500, headers

@functions_framework.http
def delete_document(request, document_id):
    """Delete a document."""
    # Verify authentication
    user, error = verify_auth(request)
    if error:
        return jsonify({'error': error}), 401

    # Set CORS headers
    headers = {
        'Access-Control-Allow-Origin': os.getenv('ALLOWED_ORIGINS', 'http://localhost:3000')
    }

    if request.method == 'OPTIONS':
        headers.update({
            'Access-Control-Allow-Methods': 'DELETE',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '3600'
        })
        return ('', 204, headers)

    try:
        # Get document
        doc_ref = db.collection('documents').document(document_id)
        doc = doc_ref.get()

        if not doc.exists:
            return jsonify({'error': 'Document not found'}), 404, headers

        doc_data = doc.to_dict()

        # Verify ownership
        if doc_data['userId'] != user['uid']:
            return jsonify({'error': 'Unauthorized'}), 403, headers

        # Delete from Storage
        bucket = storage_client.bucket(os.getenv('STORAGE_BUCKET', 'accountantai-documents'))
        blob = bucket.blob(doc_data['storagePath'])
        blob.delete()

        # Delete from Firestore
        doc_ref.delete()

        return jsonify({'message': 'Document deleted successfully'}), 200, headers

    except Exception as e:
        return jsonify({'error': str(e)}), 500, headers