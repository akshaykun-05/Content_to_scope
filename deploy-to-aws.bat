@echo off
echo 🚀 ContentScope AWS Deployment
echo ================================

REM Set AWS CLI path
set AWS_CLI="C:\Program Files\Amazon\AWSCLIV2\aws.exe"

REM Check if AWS CLI is available
%AWS_CLI% --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ AWS CLI not found at expected location.
    echo Please install AWS CLI from: https://awscli.amazonaws.com/AWSCLIV2.msi
    pause
    exit /b 1
)

echo ✅ AWS CLI found: 
%AWS_CLI% --version

REM Check AWS credentials
echo 📋 Checking AWS credentials...
%AWS_CLI% sts get-caller-identity >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ AWS credentials not configured.
    echo Please configure AWS credentials first:
    echo.
    echo Run this command and enter your AWS credentials:
    echo %AWS_CLI% configure
    echo.
    echo You'll need:
    echo - AWS Access Key ID
    echo - AWS Secret Access Key  
    echo - Default region (e.g., us-east-1)
    echo - Default output format (json)
    echo.
    pause
    exit /b 1
)

echo ✅ AWS credentials configured

REM Set OpenAI API Key
echo 🔑 Setting OpenAI API Key...
set OPENAI_API_KEY=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

REM Build all components
echo 🔨 Building backend...
cd backend
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Backend build failed!
    pause
    exit /b 1
)
cd ..

echo 🔨 Building frontend...
cd frontend
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Frontend build failed!
    pause
    exit /b 1
)
cd ..

echo 🔨 Building infrastructure...
cd infrastructure
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Infrastructure build failed!
    pause
    exit /b 1
)

REM Bootstrap CDK (if needed)
echo 🏗️ Bootstrapping CDK...
call npx cdk bootstrap
if %errorlevel% neq 0 (
    echo ⚠️ CDK bootstrap failed, but continuing...
)

REM Deploy to AWS
echo ☁️ Deploying to AWS...
call npx cdk deploy --require-approval never
if %errorlevel% neq 0 (
    echo ❌ Deployment failed!
    echo.
    echo Common issues:
    echo - AWS credentials not configured properly
    echo - Insufficient AWS permissions
    echo - Region not supported
    echo.
    pause
    exit /b 1
)

cd ..

echo.
echo ✅ Deployment completed successfully!
echo.
echo 🌐 Your ContentScope application is now live!
echo Check the output above for your website and API URLs.
echo.
echo 📝 Next steps:
echo 1. Copy the API Gateway URL from the output above
echo 2. Update frontend/.env.production with the API URL
echo 3. Redeploy to use real AI analysis
echo.
pause