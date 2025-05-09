#!/bin/bash

# Set your GCP project ID
PROJECT_ID="dixii-da77b"

# Create a service account for Cloud Functions
gcloud iam service-accounts create dixii-functions \
  --display-name="Dixii Cloud Functions Service Account" \
  --project=${PROJECT_ID}

# Create a storage bucket for documents if it doesn't exist
gcloud storage buckets create gs://accountantai-documents \
  --project=${PROJECT_ID} \
  --location=us-central1 \
  --uniform-bucket-level-access || true

# Set up CORS configuration for the storage bucket
cat > cors.json << EOF
[
  {
    "origin": ["*"],
    "method": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    "responseHeader": ["Content-Type", "Access-Control-Allow-Origin"],
    "maxAgeSeconds": 3600
  }
]
EOF

gcloud storage buckets update gs://accountantai-documents \
  --cors-file=cors.json \
  --project=${PROJECT_ID}

# Clean up temporary files
rm cors.json

# Create necessary Firestore indexes
gcloud firestore indexes composite create \
  --collection-group=documents \
  --query-scope=COLLECTION \
  --field-config field-path=userId,order=ASCENDING \
  --field-config field-path=createdAt,order=DESCENDING \
  --project=${PROJECT_ID}

gcloud firestore indexes composite create \
  --collection-group=documents \
  --query-scope=COLLECTION \
  --field-config field-path=userId,order=ASCENDING \
  --field-config field-path=category,order=ASCENDING \
  --project=${PROJECT_ID}

# Set up environment variables
echo "Setting up environment variables..."
echo "ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}" > .env

echo "Environment setup complete!"
