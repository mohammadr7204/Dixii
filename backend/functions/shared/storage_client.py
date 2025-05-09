from google.cloud import storage

def get_storage_client():
    """Get a Storage client instance."""
    return storage.Client()

def get_bucket(bucket_name):
    """Get a reference to a Storage bucket."""
    client = get_storage_client()
    return client.bucket(bucket_name)

def get_blob(bucket_name, blob_name):
    """Get a reference to a Storage blob."""
    bucket = get_bucket(bucket_name)
    return bucket.blob(blob_name)

def upload_file(bucket_name, source_file, destination_blob_name):
    """Upload a file to Cloud Storage."""
    bucket = get_bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_file(source_file)
    return blob

def download_file(bucket_name, source_blob_name, destination_file_name):
    """Download a file from Cloud Storage."""
    bucket = get_bucket(bucket_name)
    blob = bucket.blob(source_blob_name)
    blob.download_to_filename(destination_file_name)

def generate_signed_url(bucket_name, blob_name, expiration=3600):
    """Generate a signed URL for a blob."""
    bucket = get_bucket(bucket_name)
    blob = bucket.blob(blob_name)
    return blob.generate_signed_url(expiration=expiration)
