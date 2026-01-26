import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { AIService, ContentAnalysisRequest } from '../services/aiService'
import { verifyFirebaseToken } from '../services/authService'

const dynamoClient = new DynamoDBClient({})
const docClient = DynamoDBDocumentClient.from(dynamoClient)
const aiService = new AIService()

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Allow-Methods': 'POST,OPTIONS'
  }

  try {
    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers,
        body: ''
      }
    }

    // Verify authentication
    const authHeader = event.headers.Authorization || event.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'UNAUTHORIZED',
          message: 'Authentication required'
        })
      }
    }

    const token = authHeader.substring(7)
    const decodedToken = await verifyFirebaseToken(token)
    const userId = decodedToken.uid

    // Parse request body
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'MISSING_BODY',
          message: 'Request body is required'
        })
      }
    }

    const request: ContentAnalysisRequest = JSON.parse(event.body)
    request.userId = userId // Ensure userId is set from auth token

    // Validate request
    if (!request.content || !request.contentType || !request.platforms) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'INVALID_REQUEST',
          message: 'Missing required fields: content, contentType, platforms'
        })
      }
    }

    // Analyze content
    const analysis = await aiService.analyzeContent(request)

    // Store analysis in DynamoDB
    await docClient.send(new PutCommand({
      TableName: process.env.ANALYSIS_TABLE_NAME,
      Item: {
        analysisId: analysis.analysisId,
        userId: userId,
        content: request.content,
        contentType: request.contentType,
        platforms: request.platforms,
        overallScore: analysis.overallScore,
        platformScores: analysis.platformScores,
        engagementFactors: analysis.engagementFactors,
        failurePoints: analysis.failurePoints,
        improvements: analysis.improvements,
        adaptations: analysis.adaptations,
        createdAt: new Date().toISOString()
      }
    }))

    // Update user stats
    await updateUserStats(userId, analysis.overallScore)

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: analysis
      })
    }

  } catch (error) {
    console.error('Analysis error:', error)
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'ANALYSIS_FAILED',
        message: error instanceof Error ? error.message : 'Analysis failed'
      })
    }
  }
}

async function updateUserStats(userId: string, score: number) {
  try {
    const today = new Date().toISOString().split('T')[0]
    
    await docClient.send(new UpdateCommand({
      TableName: process.env.USER_STATS_TABLE_NAME,
      Key: { userId },
      UpdateExpression: `
        SET totalAnalyses = if_not_exists(totalAnalyses, :zero) + :one,
            lastActivityDate = :today,
            updatedAt = :now
        ADD totalScore = :score
      `,
      ExpressionAttributeValues: {
        ':zero': 0,
        ':one': 1,
        ':score': score,
        ':today': today,
        ':now': new Date().toISOString()
      }
    }))
  } catch (error) {
    console.error('Failed to update user stats:', error)
    // Don't fail the main request if stats update fails
  }
}