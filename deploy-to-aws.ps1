Write-Host "🚀 ContentScope AWS Deployment" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green

# Set environment variables
$env:OPENAI_API_KEY = $env:OPENAI_API_KEY
if (-not $env:OPENAI_API_KEY) {
    Write-Host "❌ OPENAI_API_KEY environment variable not set" -ForegroundColor Red
    Write-Host "Please set your OpenAI API key: `$env:OPENAI_API_KEY = 'your-key-here'" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Check AWS CLI
Write-Host "📋 Checking AWS CLI..." -ForegroundColor Yellow
try {
    $awsVersion = & "C:\Program Files\Amazon\AWSCLIV2\aws.exe" --version
    Write-Host "✅ AWS CLI found: $awsVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ AWS CLI not found" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check AWS credentials
Write-Host "📋 Checking AWS credentials..." -ForegroundColor Yellow
try {
    $identity = & "C:\Program Files\Amazon\AWSCLIV2\aws.exe" sts get-caller-identity | ConvertFrom-Json
    Write-Host "✅ AWS credentials configured for account: $($identity.Account)" -ForegroundColor Green
} catch {
    Write-Host "❌ AWS credentials not configured" -ForegroundColor Red
    Write-Host "Please run: aws configure" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Build backend
Write-Host "🔨 Building backend..." -ForegroundColor Yellow
Set-Location backend
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Backend build failed!" -ForegroundColor Red
    Set-Location ..
    Read-Host "Press Enter to exit"
    exit 1
}
Set-Location ..
Write-Host "✅ Backend built successfully" -ForegroundColor Green

# Build frontend
Write-Host "🔨 Building frontend..." -ForegroundColor Yellow
Set-Location frontend
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend build failed!" -ForegroundColor Red
    Set-Location ..
    Read-Host "Press Enter to exit"
    exit 1
}
Set-Location ..
Write-Host "✅ Frontend built successfully" -ForegroundColor Green

# Build infrastructure
Write-Host "🔨 Building infrastructure..." -ForegroundColor Yellow
Set-Location infrastructure
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Infrastructure build failed!" -ForegroundColor Red
    Set-Location ..
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✅ Infrastructure built successfully" -ForegroundColor Green

# Bootstrap CDK
Write-Host "🏗️ Bootstrapping CDK..." -ForegroundColor Yellow
npx cdk bootstrap

# Deploy to AWS
Write-Host "☁️ Deploying to AWS..." -ForegroundColor Yellow
Write-Host "This may take 5-10 minutes..." -ForegroundColor Cyan

npx cdk deploy --require-approval never

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Your ContentScope application is now live!" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📝 Next steps:" -ForegroundColor Yellow
    Write-Host "1. Check the output above for your website and API URLs" -ForegroundColor White
    Write-Host "2. Update frontend environment with the API URL" -ForegroundColor White
    Write-Host "3. Your app now has real AI analysis!" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
    Write-Host "Check the error messages above for details." -ForegroundColor Yellow
}

Set-Location ..
Write-Host ""
Read-Host "Press Enter to exit"