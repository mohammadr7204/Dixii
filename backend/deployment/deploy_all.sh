#!/bin/bash

# Set project ID
PROJECT_ID="dixii-da77b"
REGION="us-central1"
SERVICE_ACCOUNT="dixii-functions@${PROJECT_ID}.iam.gserviceaccount.com"

# Function to deploy a Cloud Function
deploy_function() {
    local name=$1
    local entry_point=$2
    local trigger_type=$3
    local source_dir=$4
    local extra_args=$5

    echo "Deploying function: ${name}"

    cd "${source_dir}" || exit

    # Install dependencies
    if [ -f "requirements.txt" ]; then
        pip install -r requirements.txt
    fi

    # Deploy based on trigger type
    if [ "${trigger_type}" == "http" ]; then
        gcloud functions deploy "${name}" \
            --gen2 \
            --runtime=python310 \
            --region="${REGION}" \
            --source=. \
            --entry-point="${entry_point}" \
            --trigger-http \
            --service-account="${SERVICE_ACCOUNT}" \
            ${extra_args}
    elif [ "${trigger_type}" == "storage" ]; then
        gcloud functions deploy "${name}" \
            --gen2 \
            --runtime=python310 \
            --region="${REGION}" \
            --source=. \
            --entry-point="${entry_point}" \
            --trigger-event-filters="type=google.cloud.storage.object.v1.finalized" \
            --trigger-event-filters="bucket=accountantai-documents" \
            --service-account="${SERVICE_ACCOUNT}" \
            ${extra_args}
    elif [ "${trigger_type}" == "pubsub" ]; then
        gcloud functions deploy "${name}" \
            --gen2 \
            --runtime=python310 \
            --region="${REGION}" \
            --source=. \
            --entry-point="${entry_point}" \
            --trigger-topic="${name}" \
            --service-account="${SERVICE_ACCOUNT}" \
            ${extra_args}
    fi

    cd - || exit
}

# Deploy document functions
deploy_function "process_document" "process" "storage" "../functions/documents" ""
deploy_function "organize_document" "organize" "pubsub" "../functions/documents" ""

# Deploy client functions
deploy_function "create_client" "create" "http" "../functions/clients" ""
deploy_function "list_clients" "list" "http" "../functions/clients" ""

# Deploy auth functions
deploy_function "verify_token" "verify" "http" "../functions/auth" ""

echo "All functions deployed successfully!"