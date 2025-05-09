#!/bin/bash

# Set your GCP project ID
PROJECT_ID="dixii-da77b"

# Deploy document processing function (triggered by Cloud Storage)
gcloud functions deploy process_document \
  --gen2 \
  --runtime=python310 \
  --region=us-central1 \
  --source=../functions/documents \
  --entry-point=process_document \
  --trigger-event-filters="type=google.cloud.storage.object.v1.finalized" \
  --trigger-event-filters="bucket=accountantai-documents" \
  --service-account="dixii-functions@${PROJECT_ID}.iam.gserviceaccount.com" \
  --set-env-vars="ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}"

# Deploy document organization function (triggered by Pub/Sub)
gcloud functions deploy organize_document \
  --gen2 \
  --runtime=python310 \
  --region=us-central1 \
  --source=../functions/documents \
  --entry-point=organize_document \
  --trigger-topic=document-organization \
  --service-account="dixii-functions@${PROJECT_ID}.iam.gserviceaccount.com"

# Create Pub/Sub topics if they don't exist
gcloud pubsub topics create document-processing --project=${PROJECT_ID} || true
gcloud pubsub topics create document-organization --project=${PROJECT_ID} || true

# Set up IAM permissions for the service account
gcloud projects add-iam-policy-binding ${PROJECT_ID} \
  --member="serviceAccount:dixii-functions@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/storage.admin"

gcloud projects add-iam-policy-binding ${PROJECT_ID} \
  --member="serviceAccount:dixii-functions@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/firestore.admin"

gcloud projects add-iam-policy-binding ${PROJECT_ID} \
  --member="serviceAccount:dixii-functions@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/pubsub.publisher"

gcloud projects add-iam-policy-binding ${PROJECT_ID} \
  --member="serviceAccount:dixii-functions@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/pubsub.subscriber"