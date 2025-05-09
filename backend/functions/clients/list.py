import functions_framework
from flask import Request, jsonify
from google.cloud import firestore
import firebase_admin
from firebase_admin import auth

# Initialize Firebase app
try:
    firebase_admin.get_app()
except ValueError:
    firebase_admin.initialize_app()

# Initialize Firestore client
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
def list_clients(request: Request):
    """HTTP Cloud Function to list clients for the authenticated user."""
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
        # Query clients for the current user
        clients_ref = db.collection('clients').where('user_id', '==', user_id)
        clients = []

        # Get client documents
        for doc in clients_ref.stream():
            client_data = doc.to_dict()
            client_data['id'] = doc.id

            # Convert timestamps to strings for JSON serialization
            if 'created_at' in client_data and client_data['created_at']:
                client_data['created_at'] = client_data['created_at'].isoformat()
            if 'updated_at' in client_data and client_data['updated_at']:
                client_data['updated_at'] = client_data['updated_at'].isoformat()

            clients.append(client_data)

        return (jsonify({
            'success': True,
            'clients': clients
        }), 200, headers)

    except Exception as e:
        print(f"Error listing clients: {e}")
        return (jsonify({'error': str(e)}), 500, headers)