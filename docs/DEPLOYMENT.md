# ContentScope Deployment Guide

## Prerequisites

1. **AWS Account**: Ensure you have an AWS account with appropriate permissions
2. **AWS CLI**: Install and configure AWS CLI with your credentials
3. **Node.js**: Version 18 or higher
4. **OpenAI API Key**: Get your API key from OpenAI

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd contentoscope
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. AWS Configuration

Configure AWS CLI if not already done:

```bash
aws configure
```

Or set environment variables:

```bash
export AWS_ACCESS_KEY_ID=your_access_key
export AWS_SECRET_ACCESS_KEY=your_secret_key
export AWS_DEFAULT_REGION=us-east-1
```

### 4. Deploy to AWS

#### Option A: Automated Deployment

```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

#### Option B: Manual Deployment

```bash
# Install all dependencies
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
cd infrastructure && npm install && cd ..

# Build backend
cd backend && npm run build && cd ..

# Build frontend
cd frontend && npm run build && cd ..

# Deploy infrastructure
cd infrastructure && npm run deploy
```

### 5. Post-Deployment Configuration

After deployment, you'll receive:
- CloudFront Distribution URL (your website)
- API Gateway URL (your backend API)

Update your frontend environment variables:

1. Create `frontend/.env.production`:
```
VITE_API_URL=https://your-api-gateway-url/api/v1
```

2. Rebuild and redeploy frontend:
```bash
cd frontend && npm run build && cd ..
cd infrastructure && npm run deploy
```

## AWS Resources Created

The deployment creates the following AWS resources (all within Free Tier limits):

### Compute
- **AWS Lambda Functions**: 2 functions for content analysis and adaptation
- **API Gateway**: REST API for backend endpoints

### Storage
- **DynamoDB Tables**: 2 tables for analysis data and user data
- **S3 Buckets**: 2 buckets for content uploads and website hosting

### CDN
- **CloudFront Distribution**: Global content delivery for the website

### Estimated Monthly Costs

With typical usage (within Free Tier):
- Lambda: $0 (1M requests/month free)
- API Gateway: $0 (1M requests/month free)
- DynamoDB: $0 (25GB storage free)
- S3: $0 (5GB storage free)
- CloudFront: $0 (1TB transfer free)

**Total: $0/month** (within Free Tier limits)

## Development Workflow

### Local Development

```bash
# Start frontend development server
npm run dev

# The frontend will proxy API calls to your deployed backend
```

### Making Changes

1. **Frontend Changes**: 
   ```bash
   cd frontend && npm run build && cd ..
   cd infrastructure && npm run deploy
   ```

2. **Backend Changes**:
   ```bash
   cd backend && npm run build && cd ..
   cd infrastructure && npm run deploy
   ```

### Monitoring and Logs

- **Lambda Logs**: Check CloudWatch Logs in AWS Console
- **API Gateway**: Monitor requests in AWS Console
- **DynamoDB**: View data in AWS Console

## Troubleshooting

### Common Issues

1. **OpenAI API Key Error**
   - Ensure your API key is valid and has sufficient credits
   - Check the environment variable is set correctly

2. **AWS Permissions Error**
   - Ensure your AWS user has necessary permissions
   - Check AWS CLI configuration

3. **Build Errors**
   - Ensure Node.js version 18+
   - Clear node_modules and reinstall dependencies

4. **CORS Issues**
   - API Gateway CORS is configured automatically
   - Check browser console for specific errors

### Getting Help

- Check AWS CloudWatch Logs for Lambda function errors
- Review API Gateway execution logs
- Verify environment variables are set correctly

## Cleanup

To remove all AWS resources:

```bash
cd infrastructure && npm run destroy
```

**Warning**: This will delete all data and cannot be undone.