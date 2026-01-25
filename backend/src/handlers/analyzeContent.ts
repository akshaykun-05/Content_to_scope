import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { AIService } from '../services/aiService'
import { ContentAnalysisRequest, APIResponse } from '../types/index'

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

    const request: ContentAnalysisRequest = JSON.parse(event.body)

    // Validate request
    if (!request.content || !request.platforms || request.platforms.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Content and platforms are required'
        } as APIResponse)
      }
    }

    // Analyze content
    const analysis = await aiService.analyzeContent(request)

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: analysis,
        message: 'Content analysis completed successfully'
      } as APIResponse)
    }

  } catch (error) {
    console.error('Analysis handler error:', error)
    
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