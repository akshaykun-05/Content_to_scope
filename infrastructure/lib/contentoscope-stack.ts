import * as cdk from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment'
import { Construct } from 'constructs'

// Declare process for environment variables
declare const process: {
  env: {
    OPENAI_API_KEY?: string
  }
}

export class ContentscopeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // DynamoDB Tables
    const analysisTable = new dynamodb.Table(this, 'AnalysisTable', {
      tableName: 'contentoscope-analysis',
      partitionKey: { name: 'analysisId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // For development
      pointInTimeRecoverySpecification: {
        pointInTimeRecoveryEnabled: false // Keep costs low
      }
    })

    const userTable = new dynamodb.Table(this, 'UserTable', {
      tableName: 'contentoscope-users',
      partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      pointInTimeRecoverySpecification: {
        pointInTimeRecoveryEnabled: false
      }
    })

    // S3 Bucket for file uploads and static hosting
    const contentBucket = new s3.Bucket(this, 'ContentBucket', {
      bucketName: `contentoscope-content-${this.account}`,
      cors: [
        {
          allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.POST, s3.HttpMethods.PUT],
          allowedOrigins: ['*'],
          allowedHeaders: ['*'],
        },
      ],
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    })

    // S3 Bucket for frontend hosting
    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      bucketName: `contentoscope-website-${this.account}`,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      publicReadAccess: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    })

    // Lambda Functions
    const analyzeContentFunction = new lambda.Function(this, 'AnalyzeContentFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handlers/analyzeContent.handler',
      code: lambda.Code.fromAsset('../backend/dist'),
      timeout: cdk.Duration.seconds(30),
      memorySize: 512,
      environment: {
        ANALYSIS_TABLE_NAME: analysisTable.tableName,
        CONTENT_BUCKET_NAME: contentBucket.bucketName,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY || 'your-openai-api-key'
      }
    })

    const adaptContentFunction = new lambda.Function(this, 'AdaptContentFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handlers/adaptContent.handler',
      code: lambda.Code.fromAsset('../backend/dist'),
      timeout: cdk.Duration.seconds(30),
      memorySize: 512,
      environment: {
        ANALYSIS_TABLE_NAME: analysisTable.tableName,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY || 'your-openai-api-key'
      }
    })

    // Grant permissions
    analysisTable.grantReadWriteData(analyzeContentFunction)
    analysisTable.grantReadWriteData(adaptContentFunction)
    userTable.grantReadWriteData(analyzeContentFunction)
    contentBucket.grantReadWrite(analyzeContentFunction)

    // API Gateway
    const api = new apigateway.RestApi(this, 'ContentscopeApi', {
      restApiName: 'ContentScope API',
      description: 'API for ContentScope content analysis platform',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'Authorization']
      }
    })

    // API Routes
    const v1 = api.root.addResource('api').addResource('v1')
    
    const analyzeResource = v1.addResource('analyze')
    analyzeResource.addMethod('POST', new apigateway.LambdaIntegration(analyzeContentFunction))

    const adaptResource = v1.addResource('adapt')
    adaptResource.addMethod('POST', new apigateway.LambdaIntegration(adaptContentFunction))

    // CloudFront Distribution
    const distribution = new cloudfront.Distribution(this, 'ContentscopeDistribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED
      },
      additionalBehaviors: {
        '/api/*': {
          origin: new origins.RestApiOrigin(api),
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
          allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL
        }
      },
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html'
        }
      ]
    })

    // Deploy frontend (placeholder - in real deployment, build frontend first)
    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset('../frontend/dist')],
      destinationBucket: websiteBucket,
      distribution,
      distributionPaths: ['/*']
    })

    // Outputs
    new cdk.CfnOutput(this, 'WebsiteURL', {
      value: `https://${distribution.distributionDomainName}`,
      description: 'ContentScope Website URL'
    })

    new cdk.CfnOutput(this, 'ApiURL', {
      value: api.url,
      description: 'ContentScope API URL'
    })

    new cdk.CfnOutput(this, 'ContentBucketName', {
      value: contentBucket.bucketName,
      description: 'S3 Bucket for content uploads'
    })
  }
}