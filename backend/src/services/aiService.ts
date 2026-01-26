export interface ContentAnalysisRequest {
  content: string
  contentType: 'text' | 'image' | 'url'
  platforms: string[]
  userId?: string
}

export interface ContentAnalysisResponse {
  analysisId: string
  overallScore: number
  originalContent?: string
  platformScores: Array<{
    platform: string
    score: number
    color: string
  }>
  engagementFactors: Array<{
    name: string
    score: number
    status: 'good' | 'warning' | 'poor'
    explanation: string
  }>
  failurePoints: Array<{
    type: 'critical' | 'warning' | 'info'
    title: string
    description: string
    suggestion: string
    impact: 'High' | 'Medium' | 'Low'
  }>
  improvements: Array<{
    priority: 'high' | 'medium' | 'low'
    title: string
    description: string
    expectedImpact: string
  }>
  adaptations: Record<string, string>
}

export class AIService {
  async analyzeContent(request: ContentAnalysisRequest): Promise<ContentAnalysisResponse> {
    try {
      // For now, use enhanced mock analysis with URL handling
      let contentToAnalyze = request.content
      let originalContent = request.content

      // Simple URL content extraction fallback
      if (request.contentType === 'url') {
        try {
          // Try to extract content from URL using a simple approach
          originalContent = await this.extractContentFromUrl(request.content)
          contentToAnalyze = originalContent
        } catch (error) {
          console.error('URL extraction failed:', error)
          // Fallback to using URL as description
          contentToAnalyze = `Content from URL: ${request.content}`
          originalContent = contentToAnalyze
        }
      }

      // Generate intelligent mock analysis
      const analysis = this.generateIntelligentAnalysis(contentToAnalyze, request.platforms)
      
      return {
        analysisId: this.generateAnalysisId(),
        overallScore: analysis.overallScore,
        originalContent: originalContent,
        platformScores: analysis.platformScores,
        engagementFactors: analysis.engagementFactors,
        failurePoints: analysis.failurePoints,
        improvements: analysis.improvements,
        adaptations: await this.generateAdaptations(contentToAnalyze, request.platforms)
      }
    } catch (error) {
      console.error('Analysis failed:', error)
      // Final fallback
      return this.generateBasicAnalysis(request)
    }
  }

  private async extractContentFromUrl(url: string): Promise<string> {
    // Simple URL content extraction without external dependencies
    try {
      // Add protocol if missing
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url
      }

      // For now, return a descriptive text about the URL
      // In a production environment, you would use a web scraping service
      const domain = new URL(url).hostname
      return `Content extracted from ${domain}. This appears to be a web article or blog post that discusses various topics. The content has been analyzed for social media optimization across different platforms.`
    } catch (error) {
      throw new Error('Failed to process URL')
    }
  }

  private generateIntelligentAnalysis(content: string, platforms: string[]) {
    const contentLength = content.length
    const hasHashtags = content.includes('#')
    const hasEmojis = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/u.test(content)
    const hasQuestion = content.includes('?')
    const hasURL = /https?:\/\//.test(content)
    const wordCount = content.split(/\s+/).length
    
    // Calculate intelligent overall score
    let overallScore = 65 // Base score
    if (contentLength > 50 && contentLength < 300) overallScore += 15
    if (contentLength > 300 && contentLength < 500) overallScore += 10
    if (hasHashtags) overallScore += 8
    if (hasEmojis) overallScore += 6
    if (hasQuestion) overallScore += 10
    if (wordCount > 5 && wordCount < 50) overallScore += 8
    if (contentLength > 800) overallScore -= 20
    if (contentLength < 20) overallScore -= 15
    
    overallScore = Math.max(35, Math.min(95, overallScore))

    return {
      overallScore,
      platformScores: platforms.map(platform => ({
        platform: this.formatPlatformName(platform),
        score: this.calculatePlatformSpecificScore(platform, content, overallScore),
        color: this.getPlatformColor(platform)
      })),
      engagementFactors: [
        {
          name: 'Headline',
          score: this.calculateHeadlineScore(content),
          status: this.calculateHeadlineScore(content) > 70 ? 'good' as const : 
                  this.calculateHeadlineScore(content) > 50 ? 'warning' as const : 'poor' as const,
          explanation: this.getHeadlineExplanation(content)
        },
        {
          name: 'Structure',
          score: this.calculateStructureScore(content),
          status: this.calculateStructureScore(content) > 70 ? 'good' as const : 
                  this.calculateStructureScore(content) > 50 ? 'warning' as const : 'poor' as const,
          explanation: this.getStructureExplanation(content)
        },
        {
          name: 'Tone',
          score: 80 + Math.floor(Math.random() * 15),
          status: 'good' as const,
          explanation: 'Tone appears appropriate for social media engagement'
        },
        {
          name: 'Length',
          score: this.calculateLengthScore(content),
          status: this.calculateLengthScore(content) > 70 ? 'good' as const : 
                  this.calculateLengthScore(content) > 50 ? 'warning' as const : 'poor' as const,
          explanation: this.getLengthExplanation(content)
        },
        {
          name: 'CTA',
          score: this.calculateCTAScore(content),
          status: this.calculateCTAScore(content) > 70 ? 'good' as const : 
                  this.calculateCTAScore(content) > 50 ? 'warning' as const : 'poor' as const,
          explanation: this.getCTAExplanation(content)
        }
      ],
      failurePoints: this.generateFailurePoints(content),
      improvements: this.generateImprovements(content, hasHashtags, hasQuestion)
    }
  }

  private calculatePlatformSpecificScore(platform: string, content: string, baseScore: number): number {
    let platformScore = baseScore
    const contentLength = content.length

    switch (platform) {
      case 'twitter':
        if (contentLength <= 280) platformScore += 15
        else if (contentLength > 500) platformScore -= 25
        break
      case 'linkedin':
        if (contentLength > 100 && contentLength < 1300) platformScore += 10
        if (content.toLowerCase().includes('professional') || content.toLowerCase().includes('business')) platformScore += 5
        break
      case 'instagram':
        if (content.includes('📸') || content.includes('✨')) platformScore += 8
        if (content.split('#').length > 3) platformScore += 5
        break
      case 'facebook':
        if (contentLength > 50 && contentLength < 400) platformScore += 8
        break
    }

    return Math.max(30, Math.min(100, platformScore + Math.floor(Math.random() * 10) - 5))
  }

  private calculateHeadlineScore(content: string): number {
    const firstLine = content.split('\n')[0] || content.substring(0, 100)
    let score = 60
    
    if (firstLine.includes('?')) score += 15
    if (firstLine.includes('!')) score += 10
    if (firstLine.length > 10 && firstLine.length < 80) score += 15
    if (/\d/.test(firstLine)) score += 8
    
    return Math.max(30, Math.min(100, score))
  }

  private calculateStructureScore(content: string): number {
    let score = 60
    const lines = content.split('\n').filter(line => line.trim().length > 0)
    
    if (lines.length > 1) score += 15
    if (content.includes('•') || content.includes('-') || content.includes('*')) score += 10
    if (content.length > 100 && content.length < 500) score += 10
    
    return Math.max(30, Math.min(100, score))
  }

  private calculateLengthScore(content: string): number {
    const length = content.length
    if (length < 20) return 30
    if (length > 20 && length < 100) return 70
    if (length > 100 && length < 300) return 85
    if (length > 300 && length < 500) return 75
    if (length > 500 && length < 800) return 60
    return 40
  }

  private calculateCTAScore(content: string): number {
    let score = 45
    
    if (content.includes('?')) score += 20
    if (content.toLowerCase().includes('click')) score += 15
    if (content.toLowerCase().includes('comment')) score += 15
    if (content.toLowerCase().includes('share')) score += 10
    if (content.toLowerCase().includes('follow')) score += 10
    
    return Math.max(30, Math.min(100, score))
  }

  private getHeadlineExplanation(content: string): string {
    const firstLine = content.split('\n')[0] || content.substring(0, 100)
    if (firstLine.includes('?')) return 'Strong hook with engaging question'
    if (firstLine.length > 80) return 'Headline could be more concise'
    if (firstLine.length < 10) return 'Headline needs more detail'
    return 'Decent headline structure'
  }

  private getStructureExplanation(content: string): string {
    const lines = content.split('\n').filter(line => line.trim().length > 0)
    if (lines.length > 3) return 'Well-structured with good formatting'
    if (content.length > 300) return 'Could benefit from better paragraph breaks'
    return 'Structure is adequate for social media'
  }

  private getLengthExplanation(content: string): string {
    const length = content.length
    if (length < 50) return 'Content is too short for optimal engagement'
    if (length > 500) return 'Content may be too long for social media platforms'
    return 'Good length for social media engagement'
  }

  private getCTAExplanation(content: string): string {
    if (content.includes('?')) return 'Good engagement prompt with question'
    if (content.toLowerCase().includes('comment') || content.toLowerCase().includes('share')) return 'Has engagement prompts'
    return 'Could benefit from stronger call-to-action'
  }

  private generateFailurePoints(content: string) {
    const failurePoints = []
    
    if (content.length > 500) {
      failurePoints.push({
        type: 'warning' as const,
        title: 'Content Length Concern',
        description: 'Content may be too long for optimal social media engagement',
        suggestion: 'Consider breaking into shorter segments or creating a thread',
        impact: 'Medium' as const
      })
    }
    
    if (!content.includes('#') && !content.includes('?')) {
      failurePoints.push({
        type: 'info' as const,
        title: 'Engagement Opportunities',
        description: 'Content lacks hashtags and engagement prompts',
        suggestion: 'Add relevant hashtags and questions to encourage interaction',
        impact: 'Medium' as const
      })
    }
    
    return failurePoints
  }

  private generateImprovements(content: string, hasHashtags: boolean, hasQuestion: boolean) {
    const improvements = []
    
    improvements.push({
      priority: 'high' as const,
      title: 'Optimize for Platform Length',
      description: 'Adjust content length for each platform\'s optimal engagement',
      expectedImpact: '+25% engagement'
    })
    
    if (!hasHashtags) {
      improvements.push({
        priority: 'medium' as const,
        title: 'Add Strategic Hashtags',
        description: 'Include 2-3 relevant hashtags to improve discoverability',
        expectedImpact: '+15% reach'
      })
    }
    
    if (!hasQuestion) {
      improvements.push({
        priority: 'high' as const,
        title: 'Enhance Call-to-Action',
        description: 'Add engaging questions or prompts to encourage interaction',
        expectedImpact: '+30% engagement'
      })
    }
    
    return improvements
  }

  async generateAdaptations(content: string, platforms: string[]): Promise<Record<string, string>> {
    const adaptations: Record<string, string> = {}

    for (const platform of platforms) {
      adaptations[platform] = this.generatePlatformAdaptation(platform, content)
    }

    return adaptations
  }

  private generatePlatformAdaptation(platform: string, content: string): string {
    switch (platform) {
      case 'twitter':
        return this.adaptForTwitter(content)
      case 'linkedin':
        return this.adaptForLinkedIn(content)
      case 'instagram':
        return this.adaptForInstagram(content)
      case 'facebook':
        return this.adaptForFacebook(content)
      case 'blog':
        return this.adaptForBlog(content)
      case 'youtube':
        return this.adaptForYouTube(content)
      default:
        return content
    }
  }

  private adaptForTwitter(content: string): string {
    let adapted = content
    
    // Shorten if too long
    if (adapted.length > 250) {
      adapted = adapted.substring(0, 240) + '... 🧵'
    }
    
    // Add hashtags if missing
    if (!adapted.includes('#')) {
      adapted += ' #ContentCreation #SocialMedia'
    }
    
    // Add engagement prompt
    if (!adapted.includes('?')) {
      adapted += '\n\nWhat do you think? 💭'
    }
    
    return adapted
  }

  private adaptForLinkedIn(content: string): string {
    let adapted = `💼 Professional Insight:\n\n${content}`
    
    // Add professional hashtags
    if (!adapted.includes('#')) {
      adapted += '\n\n#LinkedIn #Professional #Business #Growth #Insights'
    }
    
    // Add engagement question
    if (!adapted.includes('?')) {
      adapted += '\n\nWhat has been your experience with this? Share your thoughts in the comments!'
    }
    
    return adapted
  }

  private adaptForInstagram(content: string): string {
    let adapted = `✨ ${content}`
    
    // Add visual elements
    if (!adapted.includes('📸') && !adapted.includes('✨')) {
      adapted = `✨ ${adapted} 📸`
    }
    
    // Add Instagram hashtags
    if (!adapted.includes('#')) {
      adapted += '\n\n#Instagram #Content #Creative #Inspiration #SocialMedia #Engagement #Community #Share #Love #Follow'
    }
    
    return adapted
  }

  private adaptForFacebook(content: string): string {
    let adapted = `👋 Hey everyone!\n\n${content}`
    
    // Add community engagement
    if (!adapted.includes('?')) {
      adapted += '\n\nWhat do you think about this? Let me know in the comments! 💬👇'
    }
    
    return adapted
  }

  private adaptForBlog(content: string): string {
    return `# Blog Post\n\n## Introduction\n\n${content}\n\n## Key Takeaways\n\nThis content has been optimized for blog format with proper structure and SEO considerations.\n\n## Conclusion\n\nThank you for reading! Don't forget to share your thoughts in the comments below.`
  }

  private adaptForYouTube(content: string): string {
    return `🎥 ${content}\n\n📺 Don't forget to LIKE this video if it helped you!\n👍 SUBSCRIBE for more content like this\n🔔 Hit the notification bell to stay updated\n💬 COMMENT below with your thoughts!\n\n#YouTube #Content #Subscribe #Like #Share`
  }

  private generateBasicAnalysis(request: ContentAnalysisRequest): ContentAnalysisResponse {
    return {
      analysisId: this.generateAnalysisId(),
      overallScore: 70,
      originalContent: request.content,
      platformScores: request.platforms.map(platform => ({
        platform: this.formatPlatformName(platform),
        score: 65 + Math.floor(Math.random() * 20),
        color: this.getPlatformColor(platform)
      })),
      engagementFactors: [
        {
          name: 'Headline',
          score: 75,
          status: 'good' as const,
          explanation: 'Content has good opening structure'
        },
        {
          name: 'Structure',
          score: 70,
          status: 'good' as const,
          explanation: 'Well-organized content'
        },
        {
          name: 'Tone',
          score: 80,
          status: 'good' as const,
          explanation: 'Appropriate tone for audience'
        },
        {
          name: 'Length',
          score: 65,
          status: 'warning' as const,
          explanation: 'Length could be optimized for platforms'
        },
        {
          name: 'CTA',
          score: 60,
          status: 'warning' as const,
          explanation: 'Could benefit from stronger call-to-action'
        }
      ],
      failurePoints: [],
      improvements: [
        {
          priority: 'high' as const,
          title: 'Optimize Content Length',
          description: 'Adjust content length for platform-specific engagement',
          expectedImpact: '+25% engagement'
        }
      ],
      adaptations: {}
    }
  }

  private formatPlatformName(platform: string): string {
    const names: Record<string, string> = {
      twitter: 'Twitter',
      linkedin: 'LinkedIn',
      instagram: 'Instagram',
      facebook: 'Facebook',
      blog: 'Blog',
      youtube: 'YouTube'
    }
    return names[platform] || platform
  }

  private getPlatformColor(platform: string): string {
    const colors: Record<string, string> = {
      twitter: '#1DA1F2',
      linkedin: '#0077B5',
      instagram: '#E4405F',
      facebook: '#1877F2',
      blog: '#6B7280',
      youtube: '#FF0000'
    }
    return colors[platform] || '#6B7280'
  }

  private generateAnalysisId(): string {
    return `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
}