from google.cloud import firestore
import firebase_admin
from firebase_admin import credentials

# Initialize Firebase Admin SDK if not already initialized
try:
    firebase_admin.get_app()
except ValueError:
    firebase_admin.initialize_app()

def get_firestore_client():
    """Get a Firestore client instance."""
    return firestore.Client()

def get_collection_ref(collection_name):
    """Get a reference to a Firestore collection."""
    db = get_firestore_client()
    return db.collection(collection_name)

def get_document_ref(collection_name, document_id):
    """Get a reference to a Firestore document."""
    collection_ref = get_collection_ref(collection_name)
    return collection_ref.document(document_id)

def batch_write():
    """Get a new batch write operation."""
    db = get_firestore_client()
    return db.batch()

def transaction():
    """Get a new transaction."""
    db = get_firestore_client()
    return db.transaction()
