import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { AIService } from '../services/aiService'
import { PlatformAdaptationRequest, APIResponse } from '../types/index'

const aiService = new AIService()

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Allow-Methods': 'POST,OPTIONS'
  }

  try {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers,
        body: ''
      }
    }

    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Method not allowed'
        } as APIResponse)
      }
    }

    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Request body is required'
        } as APIResponse)
      }
    }

    const request: PlatformAdaptationRequest = JSON.parse(event.body)

    // Validate request
    if (!request.content || !request.targetPlatform) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Content and target platform are required'
        } as APIResponse)
      }
    }

    // Generate adaptation
    const adaptations = await aiService.generateAdaptations(
      request.content, 
      [request.targetPlatform]
    )

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: {
          originalContent: request.content,
          adaptedContent: adaptations[request.targetPlatform],
          targetPlatform: request.targetPlatform
        },
        message: 'Content adaptation completed successfully'
      } as APIResponse)
    }

  } catch (error) {
    console.error('Adaptation handler error:', error)
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      } as APIResponse)
    }
  }
}