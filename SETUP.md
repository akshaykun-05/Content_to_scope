# 🚀 ContentScope Setup Guide

Complete setup instructions for getting ContentScope running locally and deploying to AWS.

## 📋 Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **AWS CLI** - [Installation guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)

## 🔧 Local Development Setup

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/contentoscope.git
cd contentoscope
```

### 2. Install Dependencies
```bash
# Root dependencies
npm install

# Frontend dependencies
cd frontend && npm install && cd ..

# Backend dependencies  
cd backend && npm install && cd ..

# Infrastructure dependencies
cd infrastructure && npm install && cd ..
```

### 3. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit .env file and add your OpenAI API key:
OPENAI_API_KEY=your-openai-api-key-here
AWS_REGION=us-east-1
```

### 4. Start Development
```bash
# Option 1: Windows users
start-dev.bat

# Option 2: All platforms
cd frontend && npm run dev
```

Your app will be running at `http://localhost:3000`

## ☁️ AWS Deployment

### 1. Configure AWS CLI
```bash
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key  
# Default region: us-east-1
# Default output format: json
```

### 2. Set Environment Variables
```bash
# Windows PowerShell
$env:OPENAI_API_KEY = "your-openai-api-key-here"

# Linux/Mac
export OPENAI_API_KEY="your-openai-api-key-here"
```

### 3. Deploy to AWS
```bash
# Windows
deploy-to-aws.ps1

# Or manually:
cd backend && npm run build && cd ..
cd frontend && npm run build && cd ..
cd infrastructure && npm run build && npx cdk bootstrap && npx cdk deploy
```

## 🧪 Testing

```bash
# Run backend tests
cd backend && npm test

# Run frontend in development mode
cd frontend && npm run dev
```

## 📁 Project Structure

```
contentoscope/
├── frontend/              # React TypeScript frontend
│   ├── src/
│   │   ├── pages/        # Application pages
│   │   ├── components/   # Reusable components
│   │   ├── services/     # API integration
│   │   └── main.tsx      # Entry point
│   ├── package.json
│   └── vite.config.ts
├── backend/               # Node.js Lambda functions
│   ├── src/
│   │   ├── handlers/     # API route handlers
│   │   ├── services/     # Business logic (AI service)
│   │   └── types/        # TypeScript definitions
│   └── package.json
├── infrastructure/        # AWS CDK deployment
│   ├── lib/
│   │   └── contentoscope-stack.ts
│   └── package.json
├── docs/                  # Documentation
├── scripts/               # Build scripts
├── .env.example          # Environment template
└── README.md
```

## 🔑 Environment Variables

### Required
- `OPENAI_API_KEY` - Your OpenAI API key for AI analysis

### Optional
- `AWS_REGION` - AWS region (default: us-east-1)
- `VITE_API_URL` - API endpoint URL (auto-configured)

## 🚨 Troubleshooting

### Build Errors
```bash
# Clean and reinstall dependencies
rm -rf node_modules package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json
rm -rf backend/node_modules backend/package-lock.json
rm -rf infrastructure/node_modules infrastructure/package-lock.json

npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
cd infrastructure && npm install && cd ..
```

### AWS Deployment Issues
```bash
# Verify AWS credentials
aws sts get-caller-identity

# Check CDK bootstrap
cd infrastructure && npx cdk bootstrap
```

### API Connection Issues
- Verify your OpenAI API key is valid
- Check that AWS Lambda functions are deployed
- Ensure CORS is properly configured

## 📊 Monitoring

After deployment, monitor your application:

- **CloudWatch Logs** - Lambda function logs
- **API Gateway** - Request/response monitoring  
- **CloudFront** - CDN performance
- **DynamoDB** - Database metrics

## 💰 Cost Optimization

- Uses AWS Free Tier where possible
- Serverless architecture scales to zero
- OpenAI API costs based on usage
- Estimated monthly cost: $5-50 depending on usage

## 🔒 Security

- Environment variables are never committed
- API keys are stored securely in AWS
- HTTPS enforced via CloudFront
- CORS properly configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📞 Support

If you encounter issues:

1. Check this setup guide
2. Review the troubleshooting section
3. Check existing GitHub issues
4. Create a new issue with detailed information

## 🎯 Next Steps

After setup:

1. **Customize branding** - Update colors, logos, and text
2. **Add features** - Extend AI analysis capabilities
3. **Optimize performance** - Add caching and optimization
4. **Scale up** - Add user authentication and data persistence