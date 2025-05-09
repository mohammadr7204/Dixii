#!/bin/bash

# Check if ANTHROPIC_API_KEY is set
if [ -z "$ANTHROPIC_API_KEY" ]; then
  echo "Error: ANTHROPIC_API_KEY environment variable is not set"
  echo "Please set it using: export ANTHROPIC_API_KEY=your-api-key"
  exit 1
fi

# Make scripts executable
chmod +x setup_environment.sh
chmod +x deploy_processing_functions.sh

# Run setup script
echo "Setting up environment..."
./setup_environment.sh

# Deploy functions
echo "Deploying functions..."
./deploy_processing_functions.sh

echo "Deployment complete!"