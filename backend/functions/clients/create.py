import functions_framework
from flask import Request, jsonify
from google.cloud import firestore
import json
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
def create_client(request: Request):
    """HTTP Cloud Function to create a new client."""
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
        # Get request JSON data
        request_json = request.get_json(silent=True)
        if not request_json:
            return (jsonify({'error': 'No client data provided'}), 400, headers)

        # Extract client data
        name = request_json.get('name')
        email = request_json.get('email')
        phone = request_json.get('phone', '')
        address = request_json.get('address', '')

        # Validate required fields
        if not name or not email:
            return (jsonify({'error': 'Name and email are required'}), 400, headers)

        # Create a new client document
        client_ref = db.collection('clients').document()
        client_data = {
            'name': name,
            'email': email,
            'phone': phone,
            'address': address,
            'created_at': firestore.SERVER_TIMESTAMP,
            'updated_at': firestore.SERVER_TIMESTAMP,
            'user_id': user_id
        }
        client_ref.set(client_data)

        # Return the created client data with ID
        response_data = client_data.copy()
        response_data['id'] = client_ref.id
        # Remove timestamps as they're not serializable
        if 'created_at' in response_data:
            response_data['created_at'] = str(response_data['created_at'])
        if 'updated_at' in response_data:
            response_data['updated_at'] = str(response_data['updated_at'])

        return (jsonify({
            'success': True,
            'client': response_data
        }), 201, headers)

    except Exception as e:
        print(f"Error creating client: {e}")
        return (jsonify({'error': str(e)}), 500, headers)