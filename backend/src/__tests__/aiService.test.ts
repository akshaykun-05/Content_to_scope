import { AIService } from '../services/aiService'
import { ContentAnalysisRequest } from '../types/index'

// Mock OpenAI
jest.mock('openai', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue({
            choices: [{
              message: {
                content: 'Mock AI response'
              }
            }]
          })
        }
      }
    }))
  }
})

describe('AIService', () => {
  let aiService: AIService

  beforeEach(() => {
    aiService = new AIService()
  })

  describe('analyzeContent', () => {
    it('should analyze content successfully', async () => {
      const request: ContentAnalysisRequest = {
        content: 'Test content for analysis',
        contentType: 'text',
        platforms: ['twitter', 'linkedin']
      }

      const result = await aiService.analyzeContent(request)

      expect(result).toBeDefined()
      expect(result.analysisId).toBeDefined()
      expect(result.overallScore).toBeGreaterThanOrEqual(0)
      expect(result.overallScore).toBeLessThanOrEqual(100)
      expect(result.platformScores).toHaveLength(2)
      expect(result.engagementFactors).toBeDefined()
      expect(result.failurePoints).toBeDefined()
      expect(result.improvements).toBeDefined()
      expect(result.adaptations).toBeDefined()
    })

    it('should handle empty content', async () => {
      const request: ContentAnalysisRequest = {
        content: '',
        contentType: 'text',
        platforms: ['twitter']
      }

      await expect(aiService.analyzeContent(request)).resolves.toBeDefined()
    })

    it('should handle multiple platforms', async () => {
      const request: ContentAnalysisRequest = {
        content: 'Test content',
        contentType: 'text',
        platforms: ['twitter', 'linkedin', 'instagram', 'facebook', 'blog']
      }

      const result = await aiService.analyzeContent(request)
      expect(result.platformScores).toHaveLength(5)
      expect(Object.keys(result.adaptations)).toHaveLength(5)
    })
  })

  describe('generateAdaptations', () => {
    it('should generate adaptations for multiple platforms', async () => {
      const content = 'Test content for adaptation'
      const platforms = ['twitter', 'linkedin']

      const adaptations = await aiService.generateAdaptations(content, platforms)

      expect(adaptations).toBeDefined()
      expect(Object.keys(adaptations)).toHaveLength(2)
      expect(adaptations.twitter).toBeDefined()
      expect(adaptations.linkedin).toBeDefined()
    })

    it('should handle single platform', async () => {
      const content = 'Test content'
      const platforms = ['twitter']

      const adaptations = await aiService.generateAdaptations(content, platforms)

      expect(adaptations).toBeDefined()
      expect(Object.keys(adaptations)).toHaveLength(1)
      expect(adaptations.twitter).toBeDefined()
    })
  })
})