#!/bin/bash

# ContentScope Build Script
set -e

echo "🔨 Building all components..."

# Build backend
echo "📦 Building backend..."
cd backend
npm run build
cd ..

# Build frontend
echo "📦 Building frontend..."
cd frontend
npm run build
cd ..

# Build infrastructure
echo "📦 Building infrastructure..."
cd infrastructure
npm run build
cd ..

echo "✅ All components built successfully!"