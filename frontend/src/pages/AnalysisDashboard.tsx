import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { AlertTriangle, CheckCircle, TrendingUp, Target, Lightbulb } from 'lucide-react'
import { ContentAnalysisResponse } from '../services/api'

const AnalysisDashboard = () => {
  const [analysisData, setAnalysisData] = useState<ContentAnalysisResponse | null>(null)

  useEffect(() => {
    // Load analysis results from sessionStorage
    const storedResults = sessionStorage.getItem('analysisResults')
    if (storedResults) {
      try {
        const data = JSON.parse(storedResults) as ContentAnalysisResponse
        setAnalysisData(data)
      } catch (error) {
        console.error('Failed to parse analysis results:', error)
      }
    }
  }, [])

  // Use real data if available, otherwise fall back to mock data
  const overallScore = analysisData?.overallScore ?? 72
  const platformScores = analysisData?.platformScores ?? [
    { platform: 'Twitter', score: 78, color: '#1DA1F2' },
    { platform: 'LinkedIn', score: 85, color: '#0077B5' },
    { platform: 'Instagram', score: 65, color: '#E4405F' },
    { platform: 'Blog', score: 82, color: '#6B7280' },
  ]

  const engagementFactors = analysisData?.engagementFactors ?? [
    { name: 'Headline', score: 85, status: 'good' as const, explanation: 'Strong hook that captures attention' },
    { name: 'Structure', score: 70, status: 'warning' as const, explanation: 'Could benefit from better paragraph breaks' },
    { name: 'Tone', score: 90, status: 'good' as const, explanation: 'Appropriate tone for target audience' },
    { name: 'Length', score: 45, status: 'poor' as const, explanation: 'Too long for optimal social media engagement' },
    { name: 'CTA', score: 60, status: 'warning' as const, explanation: 'Call-to-action could be more specific' },
  ]

  const failurePoints = analysisData?.failurePoints ?? [
    {
      type: 'critical' as const,
      title: 'Content Too Long for Platform',
      description: 'Your content exceeds Twitter\'s optimal length of 280 characters. Current length: 420 characters.',
      suggestion: 'Break into a thread or shorten to key points. Focus on the main message.',
      impact: 'High' as const
    },
    {
      type: 'warning' as const,
      title: 'Weak Call-to-Action',
      description: 'No clear call-to-action detected. Users may not know what action to take.',
      suggestion: 'Add a specific CTA like "Share your thoughts" or "Click the link to learn more".',
      impact: 'Medium' as const
    },
    {
      type: 'info' as const,
      title: 'Missing Hashtags',
      description: 'No relevant hashtags found. This may limit discoverability.',
      suggestion: 'Add 2-3 relevant hashtags like #ContentCreation #SocialMedia',
      impact: 'Low' as const
    }
  ]

  const improvements = analysisData?.improvements ?? [
    {
      priority: 'high' as const,
      title: 'Shorten Content Length',
      description: 'Reduce content to 250 characters or less for optimal Twitter engagement',
      expectedImpact: '+25% engagement'
    },
    {
      priority: 'medium' as const,
      title: 'Add Clear CTA',
      description: 'Include a specific call-to-action to drive user engagement',
      expectedImpact: '+15% click-through'
    },
    {
      priority: 'low' as const,
      title: 'Include Relevant Hashtags',
      description: 'Add 2-3 targeted hashtags to improve discoverability',
      expectedImpact: '+10% reach'
    }
  ]

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100'
    if (score >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Analysis</h1>
          <p className="text-gray-600 mt-2">AI-powered insights for your content performance</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">Export Report</button>
          <button className="btn-primary">Analyze New Content</button>
        </div>
      </div>

      {/* Overall Score */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
            {overallScore}
          </div>
          <div className="text-gray-600 mt-1">Overall Score</div>
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${getScoreBg(overallScore)} ${getScoreColor(overallScore)}`}>
            Good Performance
          </div>
        </div>

        {platformScores.map((platform) => (
          <div key={platform.platform} className="card text-center">
            <div className={`text-2xl font-bold ${getScoreColor(platform.score)}`}>
              {platform.score}
            </div>
            <div className="text-gray-600 mt-1">{platform.platform}</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${platform.score}%`,
                  backgroundColor: platform.color
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Engagement Factors */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Engagement Factors</h2>
          <div className="space-y-4">
            {engagementFactors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {factor.status === 'good' && <CheckCircle className="w-5 h-5 text-green-500" />}
                  {factor.status === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                  {factor.status === 'poor' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                  <span className="font-medium text-gray-900">{factor.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        factor.status === 'good' ? 'bg-green-500' :
                        factor.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${factor.score}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600 w-8">{factor.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Performance Chart */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Platform Performance</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={platformScores}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="platform" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Failure Points */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <span>Content Issues Identified</span>
        </h2>
        <div className="space-y-4">
          {failurePoints.map((point, index) => (
            <div key={index} className={`p-4 rounded-lg border-l-4 ${
              point.type === 'critical' ? 'border-red-500 bg-red-50' :
              point.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
              'border-blue-500 bg-blue-50'
            }`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{point.title}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  point.impact === 'High' ? 'bg-red-100 text-red-800' :
                  point.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {point.impact} Impact
                </span>
              </div>
              <p className="text-gray-700 mb-2">{point.description}</p>
              <div className="flex items-start space-x-2">
                <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">{point.suggestion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Improvement Recommendations */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-green-500" />
          <span>Improvement Recommendations</span>
        </h2>
        <div className="space-y-4">
          {improvements.map((improvement, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                improvement.priority === 'high' ? 'bg-red-500' :
                improvement.priority === 'medium' ? 'bg-yellow-500' :
                'bg-green-500'
              }`}></div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900">{improvement.title}</h3>
                  <span className="text-sm text-green-600 font-medium">{improvement.expectedImpact}</span>
                </div>
                <p className="text-gray-600 text-sm">{improvement.description}</p>
              </div>
              <button className="btn-secondary text-sm">
                Apply Fix
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="card bg-primary-50 border-primary-200">
        <div className="flex items-start space-x-4">
          <Target className="w-6 h-6 text-primary-600 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-primary-900 mb-2">Next Steps</h3>
            <p className="text-primary-700 mb-4">
              Based on the analysis, we recommend starting with high-priority improvements to maximize your content's performance.
            </p>
            <div className="flex space-x-3">
              <button className="btn-primary">
                Adapt for Platforms
              </button>
              <button className="btn-secondary">
                View Learning Resources
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalysisDashboard