import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://kw1mp0na2e.execute-api.us-east-1.amazonaws.com/prod/api/v1'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export interface ContentAnalysisRequest {
  content: string
  contentType: 'text' | 'image' | 'url'
  platforms: string[]
  userId?: string
}

export interface ContentAnalysisResponse {
  analysisId: string
  overallScore: number
  originalContent?: string  // Add this to store the extracted/processed content
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

export interface PlatformAdaptationRequest {
  content: string
  sourcePlatform?: string
  targetPlatform: string
  userId?: string
}

export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export const contentAPI = {
  async analyzeContent(request: ContentAnalysisRequest): Promise<ContentAnalysisResponse> {
    const response = await apiClient.post<APIResponse<ContentAnalysisResponse>>('/analyze', request)
    
    if (!response.data.success) {
      throw new Error(response.data.error || 'Analysis failed')
    }
    
    return response.data.data!
  },

  async adaptContent(request: PlatformAdaptationRequest): Promise<{
    originalContent: string
    adaptedContent: string
    targetPlatform: string
  }> {
    const response = await apiClient.post<APIResponse<{
      originalContent: string
      adaptedContent: string
      targetPlatform: string
    }>>('/adapt', request)
    
    if (!response.data.success) {
      throw new Error(response.data.error || 'Adaptation failed')
    }
    
    return response.data.data!
  },

}

export default apiClient