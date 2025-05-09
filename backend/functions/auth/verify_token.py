import functions_framework
import firebase_admin
from firebase_admin import credentials, auth
from flask import jsonify, Request
import os
import json

# Initialize Firebase app
try:
    firebase_admin.get_app()
except ValueError:
    # Use application default credentials
    firebase_admin.initialize_app()

def verify_auth_token(token):
    """Verify Firebase ID token."""
    try:
        # Verify the ID token while checking if the token is revoked
        decoded_token = auth.verify_id_token(token, check_revoked=True)
        # Token is valid and not revoked
        return decoded_token
    except auth.RevokedIdTokenError:
        # Token has been revoked
        return None
    except auth.InvalidIdTokenError:
        # Token is invalid
        return None
    except Exception as e:
        print(f"Unexpected error verifying token: {e}")
        return None

def extract_token(request):
    """Extract bearer token from authorization header."""
    auth_header = request.headers.get('Authorization', '')
    if auth_header.startswith('Bearer '):
        token = auth_header.split('Bearer ')[1]
        return token
    return None

@functions_framework.http
def auth_middleware(request: Request):
    """Verify Firebase token in request."""
    # Set CORS headers for preflight requests
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)

    # Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }

    # Get the token from Authorization header
    token = extract_token(request)
    if not token:
        return (jsonify({'error': 'No authentication token provided'}), 401, headers)

    # Verify the token
    decoded_token = verify_auth_token(token)
    if not decoded_token:
        return (jsonify({'error': 'Invalid authentication token'}), 401, headers)

    # Return user information
    return (jsonify({
        'uid': decoded_token['uid'],
        'email': decoded_token.get('email', ''),
        'authenticated': True
    }), 200, headers)