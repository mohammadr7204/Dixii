# backend/functions/documents/status.py

import functions_framework
from flask import Request, jsonify
from google.cloud import firestore
import firebase_admin
from firebase_admin import auth

# Initialize services
try:
    firebase_admin.get_app()
except ValueError:
    firebase_admin.initialize_app()

db = firestore.Client()

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
def get_document_status(request: Request):
    """HTTP Cloud Function to get the status of a document."""
    # Set CORS headers for preflight requests
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
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
        # Get document_id from query parameters
        document_id = request.args.get('document_id')
        if not document_id:
            return (jsonify({'error': 'Document ID not provided'}), 400, headers)

        # Get document from Firestore
        doc_ref = db.collection('documents').document(document_id)
        doc = doc_ref.get()

        # Check if document exists and belongs to user
        if not doc.exists:
            return (jsonify({'error': 'Document not found'}), 404, headers)

        doc_data = doc.to_dict()
        if doc_data.get('user_id') != user_id:
            return (jsonify({'error': 'Unauthorized access to document'}), 403, headers)

        # Extract and return status information
        status_data = {
            'id': document_id,
            'filename': doc_data.get('filename', ''),
            'processing_status': doc_data.get('processing_status', 'unknown'),
            'processed': doc_data.get('processed', False),
            'organized': doc_data.get('organized', False),
            'document_type': doc_data.get('metadata', {}).get('document_type', 'unknown'),
            'period_year': doc_data.get('metadata', {}).get('period_year', ''),
            'institution': doc_data.get('metadata', {}).get('institution', ''),
            'error': doc_data.get('error', None)
        }

        return (jsonify({
            'success': True,
            'status': status_data
        }), 200, headers)

    except Exception as e:
        print(f"Error getting document status: {e}")
        return (jsonify({'error': str(e)}), 500, headers)