# ContentScope Development Guide

## Project Overview

ContentScope is an AI-powered content reasoning platform built with:

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: AWS Lambda + Node.js + TypeScript
- **Database**: DynamoDB
- **Storage**: S3
- **CDN**: CloudFront
- **Infrastructure**: AWS CDK

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React SPA     │    │   API Gateway    │    │  Lambda Functions│
│   (Frontend)    │───▶│   (REST API)     │───▶│   (Backend)     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                                               │
         │              ┌──────────────────┐            │
         └─────────────▶│   CloudFront     │            │
                        │   (CDN)          │            │
                        └──────────────────┘            │
                                                        │
                        ┌──────────────────┐            │
                        │   S3 Buckets     │◀───────────┘
                        │   (Storage)      │
                        └──────────────────┘
                                │
                        ┌──────────────────┐
                        │   DynamoDB       │
                        │   (Database)     │
                        └──────────────────┘
```

## Getting Started

### Prerequisites

- Node.js 18+
- AWS CLI configured
- OpenAI API key

### Local Development Setup

1. **Clone and install dependencies**:
```bash
git clone <repository>
cd contentoscope
npm install
```

2. **Set up environment variables**:
```bash
cp .env.example .env
# Edit .env with your OpenAI API key
```

3. **Start development server**:
```bash
npm run dev
```

This starts the frontend at `http://localhost:3000` with API proxy to your deployed backend.

## Project Structure

```
contentoscope/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── dist/               # Build output
├── backend/                 # Lambda functions
│   ├── src/
│   │   ├── handlers/       # Lambda function handlers
│   │   ├── services/       # Business logic services
│   │   └── types/          # Shared type definitions
│   └── dist/               # Compiled JavaScript
├── infrastructure/          # AWS CDK code
│   ├── lib/                # CDK stack definitions
│   └── bin/                # CDK app entry point
├── docs/                   # Documentation
└── scripts/                # Deployment scripts
```

## Development Workflow

### Frontend Development

The frontend is a React SPA with the following key features:

**Key Components**:
- `Layout`: Main application layout with navigation
- `LandingPage`: Marketing homepage
- `ContentInput`: Content upload and analysis form
- `AnalysisDashboard`: Results visualization
- `PlatformAdaptation`: Content adaptation interface
- `LearningInsights`: Educational content and progress

**State Management**:
- React Query for server state
- React hooks for local state
- No global state management (keeping it simple)

**Styling**:
- Tailwind CSS for utility-first styling
- Custom components in `index.css`
- Responsive design for mobile/desktop

**Development Commands**:
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Backend Development

The backend consists of serverless Lambda functions:

**Key Services**:
- `AIService`: Handles OpenAI API integration
- `analyzeContent`: Main content analysis handler
- `adaptContent`: Platform adaptation handler

**Database Schema**:
```typescript
// Analysis Table
{
  analysisId: string (PK)
  userId?: string
  content: string
  platforms: string[]
  results: AnalysisResults
  createdAt: string
}

// User Table
{
  userId: string (PK)
  email?: string
  analysisCount: number
  createdAt: string
  lastActive: string
}
```

**Development Commands**:
```bash
cd backend
npm run build        # Compile TypeScript
npm run test         # Run tests
```

### Infrastructure Development

Infrastructure is defined using AWS CDK:

**Key Resources**:
- Lambda functions with proper IAM roles
- API Gateway with CORS configuration
- DynamoDB tables with pay-per-request billing
- S3 buckets for storage and hosting
- CloudFront distribution for global CDN

**Development Commands**:
```bash
cd infrastructure
npm run build        # Compile CDK code
npm run synth        # Generate CloudFormation
npm run deploy       # Deploy to AWS
npm run destroy      # Remove all resources
```

## Adding New Features

### 1. Adding a New Page

1. Create component in `frontend/src/pages/`:
```typescript
// NewPage.tsx
import React from 'react'

const NewPage = () => {
  return (
    <div>
      <h1>New Page</h1>
    </div>
  )
}

export default NewPage
```

2. Add route in `App.tsx`:
```typescript
import NewPage from './pages/NewPage'

// In Routes component
<Route path="/new" element={<NewPage />} />
```

3. Add navigation link in `Layout.tsx`

### 2. Adding a New API Endpoint

1. Create handler in `backend/src/handlers/`:
```typescript
// newEndpoint.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // Implementation
}
```

2. Add Lambda function in CDK stack:
```typescript
const newFunction = new lambda.Function(this, 'NewFunction', {
  // Configuration
})
```

3. Add API Gateway route:
```typescript
const newResource = v1.addResource('new')
newResource.addMethod('POST', new apigateway.LambdaIntegration(newFunction))
```

### 3. Adding New AI Features

1. Extend `AIService` class:
```typescript
async newAIFeature(input: string): Promise<Result> {
  const completion = await openai.chat.completions.create({
    // OpenAI configuration
  })
  return this.parseResponse(completion)
}
```

2. Update type definitions in `types/index.ts`

3. Add frontend integration

## Testing

### Frontend Testing

```bash
cd frontend
npm run test         # Run Jest tests
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report
```

### Backend Testing

```bash
cd backend
npm run test         # Run Jest tests
```

### Integration Testing

Test the deployed API:

```bash
# Test analysis endpoint
curl -X POST https://your-api-url/api/v1/analyze \
  -H "Content-Type: application/json" \
  -d '{"content":"Test content","contentType":"text","platforms":["twitter"]}'
```

## Performance Optimization

### Frontend Optimization

- **Code Splitting**: Implement route-based code splitting
- **Image Optimization**: Use WebP format and lazy loading
- **Bundle Analysis**: Use `npm run build -- --analyze`

### Backend Optimization

- **Lambda Cold Starts**: Keep functions warm with scheduled events
- **Memory Allocation**: Monitor and optimize Lambda memory settings
- **Database Queries**: Use DynamoDB efficiently with proper indexing

### Cost Optimization

- **DynamoDB**: Use on-demand billing for variable workloads
- **Lambda**: Optimize memory and timeout settings
- **S3**: Use lifecycle policies for old data
- **CloudFront**: Configure appropriate caching policies

## Monitoring and Debugging

### AWS CloudWatch

- **Lambda Logs**: Monitor function execution and errors
- **API Gateway**: Track request/response metrics
- **DynamoDB**: Monitor read/write capacity and throttling

### Frontend Debugging

- **React DevTools**: Component inspection and profiling
- **Network Tab**: API request/response debugging
- **Console Logs**: Strategic logging for debugging

### Common Issues

1. **CORS Errors**: Check API Gateway CORS configuration
2. **Lambda Timeouts**: Increase timeout or optimize code
3. **DynamoDB Throttling**: Check capacity settings
4. **OpenAI Rate Limits**: Implement retry logic with exponential backoff

## Security Considerations

### API Security

- **Input Validation**: Validate all user inputs
- **Rate Limiting**: Implement per-IP rate limiting
- **Authentication**: Add JWT tokens for production
- **HTTPS Only**: Enforce HTTPS for all communications

### AWS Security

- **IAM Roles**: Use least-privilege principle
- **VPC**: Consider VPC for sensitive workloads
- **Encryption**: Enable encryption at rest and in transit
- **Secrets**: Use AWS Secrets Manager for API keys

## Deployment Strategies

### Development Deployment

```bash
# Quick deployment for testing
./scripts/deploy.sh
```

### Production Deployment

1. **Environment Separation**: Use separate AWS accounts/regions
2. **CI/CD Pipeline**: Implement GitHub Actions or AWS CodePipeline
3. **Blue/Green Deployment**: Use AWS CodeDeploy for zero-downtime
4. **Rollback Strategy**: Keep previous versions for quick rollback

### Monitoring Production

- **CloudWatch Alarms**: Set up alerts for errors and performance
- **AWS X-Ray**: Distributed tracing for debugging
- **Cost Monitoring**: Set up billing alerts

## Contributing

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Configured for React and Node.js
- **Prettier**: Automatic code formatting
- **Conventional Commits**: Use conventional commit messages

### Pull Request Process

1. Create feature branch from `main`
2. Implement changes with tests
3. Update documentation
4. Submit PR with clear description
5. Address review feedback
6. Merge after approval

### Release Process

1. Update version numbers
2. Update CHANGELOG.md
3. Create release tag
4. Deploy to production
5. Monitor for issues

## Troubleshooting

### Common Development Issues

1. **Node Version**: Ensure Node.js 18+
2. **AWS Credentials**: Check AWS CLI configuration
3. **Environment Variables**: Verify .env file setup
4. **Dependencies**: Clear node_modules and reinstall

### Production Issues

1. **Lambda Errors**: Check CloudWatch Logs
2. **API Timeouts**: Increase Lambda timeout
3. **Database Errors**: Check DynamoDB metrics
4. **Frontend Issues**: Check CloudFront logs

For more help, check the GitHub issues or create a new issue with detailed information.