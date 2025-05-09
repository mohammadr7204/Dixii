import functions_framework
from flask import Request, jsonify
from google.cloud import firestore
from google.cloud import storage
import firebase_admin
from firebase_admin import auth
import datetime

# Initialize Firebase app
try:
    firebase_admin.get_app()
except ValueError:
    firebase_admin.initialize_app()

# Initialize Firestore client
db = firestore.Client()
storage_client = storage.Client()

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

def generate_signed_url(storage_path):
    """Generate a signed URL for a file in Cloud Storage."""
    try:
        bucket = storage_client.bucket('accountantai-documents')
        blob = bucket.blob(storage_path)

        # Generate a signed URL that expires in 15 minutes
        url = blob.generate_signed_url(
            version="v4",
            expiration=datetime.timedelta(minutes=15),
            method="GET"
        )
        return url
    except Exception as e:
        print(f"Error generating signed URL: {e}")
        return None

@functions_framework.http
def list_documents(request: Request):
    """HTTP Cloud Function to list documents for the authenticated user."""
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
        # Get query parameters
        client_id = request.args.get('client_id')

        # Build query
        query = db.collection('documents').where('user_id', '==', user_id)

        # Filter by client_id if provided
        if client_id:
            query = query.where('client_id', '==', client_id)

        # Order by upload time (descending)
        query = query.order_by('uploaded_at', direction=firestore.Query.DESCENDING)

        # Execute query
        documents = []
        for doc in query.stream():
            doc_data = doc.to_dict()
            doc_data['id'] = doc.id

            # Generate signed URL for document access
            if 'storage_path' in doc_data:
                doc_data['signed_url'] = generate_signed_url(doc_data['storage_path'])

            # Convert timestamps to strings for JSON serialization
            if 'uploaded_at' in doc_data and doc_data['uploaded_at']:
                doc_data['uploaded_at'] = doc_data['uploaded_at'].isoformat()

            documents.append(doc_data)

        return (jsonify({
            'success': True,
            'documents': documents
        }), 200, headers)

    except Exception as e:
        print(f"Error listing documents: {e}")
        return (jsonify({'error': str(e)}), 500, headers)