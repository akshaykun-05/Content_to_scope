import { APIGatewayProxyEvent } from 'aws-lambda'
import { handler as analyzeHandler } from '../handlers/analyzeContent'
import { handler as adaptHandler } from '../handlers/adaptContent'

// Mock the AIService
jest.mock('../services/aiService', () => {
  return {
    AIService: jest.fn().mockImplementation(() => ({
      analyzeContent: jest.fn().mockResolvedValue({
        analysisId: 'test-analysis-id',
        overallScore: 75,
        platformScores: [],
        engagementFactors: [],
        failurePoints: [],
        improvements: [],
        adaptations: {}
      }),
      generateAdaptations: jest.fn().mockResolvedValue({
        twitter: 'Adapted content for Twitter'
      })
    }))
  }
})

describe('Lambda Handlers', () => {
  describe('analyzeContent handler', () => {
    it('should handle valid analysis request', async () => {
      const event: Partial<APIGatewayProxyEvent> = {
        httpMethod: 'POST',
        body: JSON.stringify({
          content: 'Test content',
          contentType: 'text',
          platforms: ['twitter']
        })
      }

      const result = await analyzeHandler(event as APIGatewayProxyEvent)

      expect(result.statusCode).toBe(200)
      const body = JSON.parse(result.body)
      expect(body.success).toBe(true)
      expect(body.data).toBeDefined()
    })

    it('should handle missing content', async () => {
      const event: Partial<APIGatewayProxyEvent> = {
        httpMethod: 'POST',
        body: JSON.stringify({
          contentType: 'text',
          platforms: ['twitter']
        })
      }

      const result = await analyzeHandler(event as APIGatewayProxyEvent)

      expect(result.statusCode).toBe(400)
      const body = JSON.parse(result.body)
      expect(body.success).toBe(false)
      expect(body.error).toContain('required')
    })

    it('should handle CORS preflight', async () => {
      const event: Partial<APIGatewayProxyEvent> = {
        httpMethod: 'OPTIONS'
      }

      const result = await analyzeHandler(event as APIGatewayProxyEvent)

      expect(result.statusCode).toBe(200)
      expect(result.headers).toHaveProperty('Access-Control-Allow-Origin')
    })

    it('should handle invalid HTTP method', async () => {
      const event: Partial<APIGatewayProxyEvent> = {
        httpMethod: 'GET'
      }

      const result = await analyzeHandler(event as APIGatewayProxyEvent)

      expect(result.statusCode).toBe(405)
    })
  })

  describe('adaptContent handler', () => {
    it('should handle valid adaptation request', async () => {
      const event: Partial<APIGatewayProxyEvent> = {
        httpMethod: 'POST',
        body: JSON.stringify({
          content: 'Test content',
          targetPlatform: 'twitter'
        })
      }

      const result = await adaptHandler(event as APIGatewayProxyEvent)

      expect(result.statusCode).toBe(200)
      const body = JSON.parse(result.body)
      expect(body.success).toBe(true)
      expect(body.data).toBeDefined()
    })

    it('should handle missing target platform', async () => {
      const event: Partial<APIGatewayProxyEvent> = {
        httpMethod: 'POST',
        body: JSON.stringify({
          content: 'Test content'
        })
      }

      const result = await adaptHandler(event as APIGatewayProxyEvent)

      expect(result.statusCode).toBe(400)
      const body = JSON.parse(result.body)
      expect(body.success).toBe(false)
    })
  })
})