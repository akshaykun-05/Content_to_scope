import { ContentAnalysisRequest, ContentAnalysisResponse, EngagementFactor, FailurePoint, Improvement } from '../types/index'

// Mock AI Service for development/testing
export class AIService {
  async analyzeContent(request: ContentAnalysisRequest): Promise<ContentAnalysisResponse> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Generate mock analysis based on content
      const analysis = this.generateMockAnalysis(request)
      
      return {
        analysisId: this.generateAnalysisId(),
        overallScore: analysis.overallScore,
        platformScores: this.calculatePlatformScores(request.platforms, analysis),
        engagementFactors: analysis.engagementFactors,
        failurePoints: analysis.failurePoints,
        improvements: analysis.improvements,
        adaptations: await this.generateAdaptations(request.content, request.platforms)
      }
    } catch (error) {
      console.error('AI analysis failed:', error)
      throw new Error('Content analysis failed')
    }
  }

  private generateMockAnalysis(request: ContentAnalysisRequest): any {
    const contentLength = request.content.length
    const hasHashtags = request.content.includes('#')
    const hasEmojis = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/u.test(request.content)
    
    return {
      overallScore: Math.max(50, Math.min(95, 80 - Math.floor(contentLength / 50) + (hasHashtags ? 10 : 0) + (hasEmojis ? 5 : 0))),
      engagementFactors: [
        { 
          name: 'Headline', 
          score: 85, 
          status: 'good' as const, 
          explanation: 'Strong opening that captures attention' 
        },
        { 
          name: 'Structure', 
          score: contentLength > 200 ? 60 : 80, 
          status: contentLength > 200 ? 'warning' as const : 'good' as const, 
          explanation: contentLength > 200 ? 'Content could be more concise' : 'Well-structured content' 
        },
        { 
          name: 'Tone', 
          score: 90, 
          status: 'good' as const, 
          explanation: 'Appropriate tone for target audience' 
        },
        { 
          name: 'Length', 
          score: contentLength > 280 ? 45 : 75, 
          status: contentLength > 280 ? 'poor' as const : 'good' as const, 
          explanation: contentLength > 280 ? 'Too long for optimal social media engagement' : 'Good length for social platforms' 
        },
        { 
          name: 'CTA', 
          score: request.content.toLowerCase().includes('click') || request.content.includes('?') ? 75 : 60, 
          status: 'warning' as const, 
          explanation: 'Call-to-action could be more specific' 
        }
      ] as EngagementFactor[],
      failurePoints: [
        ...(contentLength > 280 ? [{
          type: 'critical' as const,
          title: 'Content Too Long for Platform',
          description: 'Content exceeds optimal length for social media platforms',
          suggestion: 'Break into shorter segments or create a thread',
          impact: 'High' as const
        }] : []),
        ...(!hasHashtags ? [{
          type: 'warning' as const,
          title: 'Missing Hashtags',
          description: 'No hashtags found for improved discoverability',
          suggestion: 'Add 2-3 relevant hashtags',
          impact: 'Medium' as const
        }] : [])
      ] as FailurePoint[],
      improvements: [
        {
          priority: 'high' as const,
          title: 'Optimize Content Length',
          description: 'Adjust content length for platform-specific optimal engagement',
          expectedImpact: '+25% engagement'
        },
        {
          priority: 'medium' as const,
          title: 'Add Strategic Hashtags',
          description: 'Include relevant hashtags to improve discoverability',
          expectedImpact: '+15% reach'
        }
      ] as Improvement[]
    }
  }

  private calculatePlatformScores(platforms: string[], analysis: any): any[] {
    const baseScore = analysis.overallScore
    return platforms.map(platform => ({
      platform: this.formatPlatformName(platform),
      score: Math.max(40, Math.min(100, baseScore + Math.floor(Math.random() * 20) - 10)), // Simulate platform-specific variations
      color: this.getPlatformColor(platform)
    }))
  }

  async generateAdaptations(content: string, platforms: string[]): Promise<Record<string, string>> {
    const adaptations: Record<string, string> = {}
    
    for (const platform of platforms) {
      // Simulate platform-specific adaptations
      let adaptedContent = content
      
      switch (platform) {
        case 'twitter':
          adaptedContent = content.length > 250 ? content.substring(0, 240) + '... 🧵' : content
          if (!content.includes('#')) adaptedContent += ' #ContentCreation'
          break
        case 'linkedin':
          adaptedContent = `💼 Professional insight:\n\n${content}\n\nWhat are your thoughts? Share in the comments! #LinkedIn #Professional`
          break
        case 'instagram':
          adaptedContent = `✨ ${content}\n\n📸 #Instagram #Content #Creative #Inspiration #SocialMedia`
          break
        case 'facebook':
          adaptedContent = `👋 Hey everyone!\n\n${content}\n\nLet me know what you think in the comments! 💬`
          break
        case 'blog':
          adaptedContent = `# Blog Post\n\n${content}\n\n## Conclusion\n\nThis content has been optimized for blog format with proper structure and SEO considerations.`
          break
        default:
          adaptedContent = content
      }
      
      adaptations[platform] = adaptedContent
    }

    return adaptations
  }

  private formatPlatformName(platform: string): string {
    const names = {
      twitter: 'Twitter',
      linkedin: 'LinkedIn',
      instagram: 'Instagram',
      facebook: 'Facebook',
      blog: 'Blog',
      youtube: 'YouTube'
    }
    return names[platform as keyof typeof names] || platform
  }

  private getPlatformColor(platform: string): string {
    const colors = {
      twitter: '#1DA1F2',
      linkedin: '#0077B5',
      instagram: '#E4405F',
      facebook: '#1877F2',
      blog: '#6B7280',
      youtube: '#FF0000'
    }
    return colors[platform as keyof typeof colors] || '#6B7280'
  }

  private generateAnalysisId(): string {
    return `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
}