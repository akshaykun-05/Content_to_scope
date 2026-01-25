<<<<<<< HEAD
@echo off
echo 🔧 AWS Configuration Setup
echo ==========================

set AWS_CLI="C:\Program Files\Amazon\AWSCLIV2\aws.exe"

echo AWS CLI Version:
%AWS_CLI% --version

echo.
echo 📋 To configure AWS, you'll need:
echo.
echo 1. AWS Access Key ID (from your AWS account)
echo 2. AWS Secret Access Key (from your AWS account)
echo 3. Default region (recommend: us-east-1)
echo 4. Default output format (recommend: json)
echo.
echo 🔗 Get your AWS credentials from:
echo https://console.aws.amazon.com/iam/home#/security_credentials
echo.
echo Starting AWS configuration...
echo.

%AWS_CLI% configure

echo.
echo ✅ AWS configuration complete!
echo.
echo Testing connection...
%AWS_CLI% sts get-caller-identity

if %errorlevel% equ 0 (
    echo.
    echo ✅ AWS connection successful!
    echo You're ready to deploy ContentScope!
    echo.
    echo Next step: Run deploy-to-aws.bat
) else (
    echo.
    echo ❌ AWS connection failed. Please check your credentials.
)

echo.
=======
@echo off
echo 🔧 AWS Configuration Setup
echo ==========================

set AWS_CLI="C:\Program Files\Amazon\AWSCLIV2\aws.exe"

echo AWS CLI Version:
%AWS_CLI% --version

echo.
echo 📋 To configure AWS, you'll need:
echo.
echo 1. AWS Access Key ID (from your AWS account)
echo 2. AWS Secret Access Key (from your AWS account)
echo 3. Default region (recommend: us-east-1)
echo 4. Default output format (recommend: json)
echo.
echo 🔗 Get your AWS credentials from:
echo https://console.aws.amazon.com/iam/home#/security_credentials
echo.
echo Starting AWS configuration...
echo.

%AWS_CLI% configure

echo.
echo ✅ AWS configuration complete!
echo.
echo Testing connection...
%AWS_CLI% sts get-caller-identity

if %errorlevel% equ 0 (
    echo.
    echo ✅ AWS connection successful!
    echo You're ready to deploy ContentScope!
    echo.
    echo Next step: Run deploy-to-aws.bat
) else (
    echo.
    echo ❌ AWS connection failed. Please check your credentials.
)

echo.
>>>>>>> 990a7e1fbcd9bb81d9437c90f7f416c87a95e2a6
pause