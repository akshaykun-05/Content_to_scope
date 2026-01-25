#!/bin/bash

# ContentScope Validation Script
set -e

echo "🔍 Validating ContentScope setup..."

# Check Node.js version
echo "📋 Checking Node.js version..."
node_version=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$node_version" -lt 18 ]; then
    echo "❌ Node.js version 18+ required. Current: $(node --version)"
    exit 1
else
    echo "✅ Node.js version: $(node --version)"
fi

# Check AWS CLI
echo "📋 Checking AWS CLI..."
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not found. Please install AWS CLI"
    exit 1
else
    echo "✅ AWS CLI version: $(aws --version)"
fi

# Check AWS credentials
echo "📋 Checking AWS credentials..."
if ! aws sts get-caller-identity > /dev/null 2>&1; then
    echo "❌ AWS credentials not configured"
    echo "Please run 'aws configure' or set AWS environment variables"
    exit 1
else
    echo "✅ AWS credentials configured"
fi

# Check environment variables
echo "📋 Checking environment variables..."
if [ -z "$OPENAI_API_KEY" ]; then
    echo "⚠️  OPENAI_API_KEY not set (required for AI features)"
else
    echo "✅ OPENAI_API_KEY is set"
fi

# Check package.json files
echo "📋 Checking package.json files..."
for dir in . frontend backend infrastructure; do
    if [ -f "$dir/package.json" ]; then
        echo "✅ $dir/package.json exists"
    else
        echo "❌ $dir/package.json missing"
        exit 1
    fi
done

# Check TypeScript configurations
echo "📋 Checking TypeScript configurations..."
for dir in frontend backend infrastructure; do
    if [ -f "$dir/tsconfig.json" ]; then
        echo "✅ $dir/tsconfig.json exists"
    else
        echo "❌ $dir/tsconfig.json missing"
        exit 1
    fi
done

# Check source files
echo "📋 Checking source files..."
required_files=(
    "frontend/src/App.tsx"
    "frontend/src/main.tsx"
    "backend/src/services/aiService.ts"
    "backend/src/handlers/analyzeContent.ts"
    "backend/src/handlers/adaptContent.ts"
    "backend/src/types/index.ts"
    "infrastructure/lib/contentoscope-stack.ts"
    "infrastructure/bin/contentoscope.ts"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        exit 1
    fi
done

# Try to build backend
echo "📋 Testing backend build..."
cd backend
if npm run build > /dev/null 2>&1; then
    echo "✅ Backend builds successfully"
else
    echo "❌ Backend build failed"
    exit 1
fi
cd ..

# Try to build frontend
echo "📋 Testing frontend build..."
cd frontend
if npm run build > /dev/null 2>&1; then
    echo "✅ Frontend builds successfully"
else
    echo "❌ Frontend build failed"
    exit 1
fi
cd ..

# Try to build infrastructure
echo "📋 Testing infrastructure build..."
cd infrastructure
if npm run build > /dev/null 2>&1; then
    echo "✅ Infrastructure builds successfully"
else
    echo "❌ Infrastructure build failed"
    exit 1
fi
cd ..

echo ""
echo "🎉 All validations passed!"
echo "✅ ContentScope is ready for deployment"
echo ""
echo "Next steps:"
echo "1. Run 'npm run deploy' to deploy to AWS"
echo "2. Update frontend/.env.production with your API Gateway URL"
echo "3. Redeploy frontend with updated environment variables"