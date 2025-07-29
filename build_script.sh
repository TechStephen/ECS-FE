#!/bin/bash
set -e  # Exit immediately if any command fails (except where we handle it explicitly)

# Constants
REPO="767398032512.dkr.ecr.us-east-1.amazonaws.com/ecs-fe"
IMAGE="ecs-fe"
TAG="latest"

# Build Docker image
echo "🔨 Building Docker image..."
docker build -t ${IMAGE} .

# Tag the image for ECR
echo "🏷 Tagging Docker image..."
docker tag ${IMAGE}:${TAG} ${REPO}:${TAG}

# Login to ECR
echo "🔐 Logging into ECR..."
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${REPO}

# Push the image
echo "🚀 Pushing Docker image to ECR..."
docker push ${REPO}:${TAG}