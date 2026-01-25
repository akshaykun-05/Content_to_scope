#!/bin/bash

# ContentScope Deployment Script
set -e

echo "🚀 Starting ContentScope deployment..."

# Check if required environment variables are set
if [ -z "$OPENAI_API_KEY" ]; then
    echo "❌ Error: OPENAI_API_KEY environment variable is required"
    echo "Please set it in your .env file or export it:"
    echo "export OPENAI_API_KEY=your_api_key_here"
    exit 1
fi

# Check if AWS CLI is configured
if ! aws sts get-caller-identity > /dev/null 2>&1; then
    echo "❌ Error: AWS CLI is not configured"
    echo "Please run 'aws configure' or set AWS environment variables"
    exit 1
fi

# Install dependencies
echo "📦 Installing root dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend && npm install && cd ..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend && npm install && cd ..

# Install infrastructure dependencies
echo "📦 Installing infrastructure dependencies..."
cd infrastructure && npm install && cd ..

# Build backend first
echo "🔨 Building backend..."
cd backend && npm run build && cd ..

# Build frontend
echo "🔨 Building frontend..."
cd frontend && npm run build && cd ..

# Bootstrap CDK if needed
echo "🏗️ Bootstrapping CDK (if needed)..."
cd infrastructure
if ! aws cloudformation describe-stacks --stack-name CDKToolkit > /dev/null 2>&1; then
    echo "Bootstrapping CDK..."
    npx cdk bootstrap
fi

# Deploy infrastructure
echo "☁️ Deploying to AWS..."
npm run deploy
cd ..

echo "✅ Deployment complete!"
echo ""
echo "🌐 Your ContentScope application should be available at the CloudFront URL shown above."
echo "📝 Don't forget to update your frontend environment variables with the API Gateway URL if needed."