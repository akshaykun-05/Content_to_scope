import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { AIService } from '../services/aiService'
import { verifyFirebaseToken } from '../services/authService'

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

    const request = JSON.parse(event.body)
    request.userId = userId

    // Validate request
    if (!request.content || !request.targetPlatform) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'INVALID_REQUEST',
          message: 'Missing required fields: content, targetPlatform'
        })
      }
    }

    // Adapt content
    const adaptedContent = aiService.generatePlatformAdaptation(request.targetPlatform, request.content)

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: {
          originalContent: request.content,
          adaptedContent: adaptedContent,
          targetPlatform: request.targetPlatform
        }
      })
    }

  } catch (error) {
    console.error('Adaptation error:', error)
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'ADAPTATION_FAILED',
        message: error instanceof Error ? error.message : 'Content adaptation failed'
      })
    }
  }
}