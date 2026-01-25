export interface ContentAnalysisRequest {
  content: string
  contentType: 'text' | 'image' | 'url'
  platforms: string[]
  userId?: string
}

export interface ContentAnalysisResponse {
  analysisId: string
  overallScore: number
  platformScores: PlatformScore[]
  engagementFactors: EngagementFactor[]
  failurePoints: FailurePoint[]
  improvements: Improvement[]
  adaptations: Record<string, string>
}

export interface PlatformScore {
  platform: string
  score: number
  color: string
}

export interface EngagementFactor {
  name: string
  score: number
  status: 'good' | 'warning' | 'poor'
  explanation: string
}

export interface FailurePoint {
  type: 'critical' | 'warning' | 'info'
  title: string
  description: string
  suggestion: string
  impact: 'High' | 'Medium' | 'Low'
}

export interface Improvement {
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  expectedImpact: string
}

export interface PlatformAdaptationRequest {
  content: string
  sourcePlatform: string
  targetPlatform: string
  userId?: string
}

export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}