# 🚀 ContentScope AWS Deployment Guide

## Prerequisites ✅
- AWS Account with appropriate permissions
- AWS CLI installed and configured
- OpenAI API Key (you have this: sk-proj-BAs8...)

## Step-by-Step Deployment

### 1. Configure AWS CLI (If Not Done)
Open a new Command Prompt or PowerShell as Administrator and run:

```cmd
aws configure
```

Enter your:
- **AWS Access Key ID**: (from your AWS account)
- **AWS Secret Access Key**: (from your AWS account)
- **Default region**: us-east-1
- **Default output format**: json

### 2. Set Environment Variable
```cmd
set OPENAI_API_KEY=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
```

### 3. Bootstrap CDK (First Time Only)
```cmd
cd infrastructure
npx cdk bootstrap
```

### 4. Deploy to AWS
```cmd
npx cdk deploy --require-approval never
```

## What Gets Deployed

### AWS Resources Created:
- **Lambda Functions**: 2 functions for content analysis
- **API Gateway**: REST API endpoints
- **DynamoDB**: 2 tables for data storage
- **S3 Buckets**: Content storage and website hosting
- **CloudFront**: Global CDN for fast delivery

### Estimated Costs:
- **Development**: $0 (AWS Free Tier)
- **Light Usage**: $5-15/month
- **OpenAI API**: $10-50/month (based on usage)

## After Deployment

### You'll Get:
1. **Website URL**: https://your-cloudfront-domain.cloudfront.net
2. **API URL**: https://your-api-gateway-id.execute-api.us-east-1.amazonaws.com

### Update Frontend Configuration:
1. Copy the API Gateway URL from deployment output
2. Update `frontend/.env.production`:
   ```
   VITE_API_URL=https://your-api-gateway-url/api/v1
   ```
3. Rebuild and redeploy frontend:
   ```cmd
   cd frontend
   npm run build
   cd ../infrastructure
   npx cdk deploy
   ```

## Troubleshooting

### Common Issues:
1. **AWS CLI not found**: Restart terminal after installation
2. **Permission denied**: Ensure AWS user has necessary permissions
3. **CDK bootstrap error**: Run `npx cdk bootstrap` first
4. **OpenAI API errors**: Verify API key and billing setup

### Required AWS Permissions:
- CloudFormation (full access)
- Lambda (full access)
- API Gateway (full access)
- DynamoDB (full access)
- S3 (full access)
- CloudFront (full access)
- IAM (create/attach roles)

## Manual Deployment Steps

If automated deployment fails, you can:

1. **Create Lambda Functions** manually in AWS Console
2. **Upload backend code** as ZIP files
3. **Create API Gateway** and connect to Lambda
4. **Set up DynamoDB tables** manually
5. **Configure S3 and CloudFront** for frontend

## Success Indicators

✅ **Deployment Successful When:**
- CDK deploy completes without errors
- You receive CloudFront and API Gateway URLs
- Website loads at CloudFront URL
- API responds to test requests

## Next Steps After Deployment

1. **Test the application** at your CloudFront URL
2. **Monitor costs** in AWS Billing Dashboard
3. **Set up CloudWatch alarms** for monitoring
4. **Configure custom domain** (optional)

## Support

If you encounter issues:
1. Check AWS CloudWatch Logs
2. Verify all environment variables
3. Ensure AWS permissions are correct
4. Check OpenAI API key validity

---

**Ready to deploy? Follow the steps above in order!**