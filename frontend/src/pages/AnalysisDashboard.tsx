import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { AlertTriangle, CheckCircle, TrendingUp, Target, Lightbulb } from 'lucide-react'
import { ContentAnalysisResponse } from '../services/api'

const AnalysisDashboard = () => {
  const [analysisData, setAnalysisData] = useState<ContentAnalysisResponse | null>(null)
  const [hasAnalysis, setHasAnalysis] = useState(false)

  useEffect(() => {
    // Load analysis results from sessionStorage
    const storedResults = sessionStorage.getItem('analysisResults')
    if (storedResults) {
      try {
        const data = JSON.parse(storedResults) as ContentAnalysisResponse
        setAnalysisData(data)
        setHasAnalysis(true)
      } catch (error) {
        console.error('Failed to parse analysis results:', error)
        setHasAnalysis(false)
      }
    } else {
      setHasAnalysis(false)
    }
  }, [])

  // Show empty state if no analysis has been done
  if (!hasAnalysis || !analysisData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Analysis Yet</h2>
            <p className="text-gray-600 mb-8">
              Start by analyzing your content to see detailed insights and recommendations.
            </p>
            <Link 
              to="/analyze" 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Lightbulb className="w-5 h-5 mr-2" />
              Analyze Content
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Use real analysis data
  const overallScore = analysisData.overallScore
  const platformScores = analysisData.platformScores
  const engagementFactors = analysisData.engagementFactors
  const failurePoints = analysisData.failurePoints
  const improvements = analysisData.improvements

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Analysis</h1>
          <p className="text-gray-600">AI-powered insights for your content</p>
        </div>
        <div className="flex space-x-2">
          <button 
            className="btn-secondary text-sm px-3 py-2"
            onClick={() => {
              const dataStr = JSON.stringify(analysisData, null, 2)
              const dataBlob = new Blob([dataStr], {type: 'application/json'})
              const url = URL.createObjectURL(dataBlob)
              const link = document.createElement('a')
              link.href = url
              link.download = 'content-analysis.json'
              link.click()
            }}
          >
            Export
          </button>
          <Link to="/analyze" className="btn-primary text-sm px-3 py-2">
            New Analysis
          </Link>
        </div>
      </div>

      {/* Scores Grid - More Compact and Mobile-friendly */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
          <div className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
            {overallScore}
          </div>
          <div className="text-gray-600 text-sm mt-1">Overall</div>
        </div>

        {platformScores.map((platform) => (
          <div key={platform.platform} className="bg-white rounded-lg shadow-sm border p-4 text-center">
            <div className={`text-xl font-bold ${getScoreColor(platform.score)}`}>
              {platform.score}
            </div>
            <div className="text-gray-600 text-sm mt-1">{platform.platform}</div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
              <div
                className="h-1.5 rounded-full"
                style={{
                  width: `${platform.score}%`,
                  backgroundColor: platform.color
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid - Mobile-friendly */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Engagement Factors - Compact */}
        <div className="bg-white rounded-lg shadow-sm border p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Engagement Factors</h2>
          <div className="space-y-3">
            {engagementFactors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {factor.status === 'good' && <CheckCircle className="w-4 h-4 text-green-500" />}
                  {factor.status === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                  {factor.status === 'poor' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                  <span className="text-sm font-medium text-gray-900">{factor.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${
                        factor.status === 'good' ? 'bg-green-500' :
                        factor.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${factor.score}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-gray-600 w-6">{factor.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Performance Chart - Compact */}
        <div className="bg-white rounded-lg shadow-sm border p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform Performance</h2>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={platformScores}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="platform" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="score" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Improvements - Compact */}
        <div className="bg-white rounded-lg shadow-sm border p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span>Top Improvements</span>
          </h2>
          <div className="space-y-3">
            {improvements.map((improvement, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-900 text-sm">{improvement.title}</h3>
                  <span className="text-xs text-green-600 font-medium">{improvement.expectedImpact}</span>
                </div>
                <p className="text-gray-600 text-xs mb-2">{improvement.description}</p>
                <button 
                  className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded hover:bg-primary-200 transition-colors"
                  onClick={() => {
                    // Copy improvement suggestion to clipboard
                    navigator.clipboard.writeText(improvement.description)
                    alert('Improvement suggestion copied to clipboard!')
                  }}
                >
                  Apply Fix
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Issues & Next Steps - Mobile-friendly */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Failure Points - Compact */}
        <div className="bg-white rounded-lg shadow-sm border p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span>Issues Identified</span>
          </h2>
          <div className="space-y-3">
            {failurePoints.map((point, index) => (
              <div key={index} className={`p-3 rounded-lg border-l-3 ${
                point.type === 'critical' ? 'border-red-500 bg-red-50' :
                point.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                'border-blue-500 bg-blue-50'
              }`}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-900 text-sm">{point.title}</h3>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    point.impact === 'High' ? 'bg-red-100 text-red-800' :
                    point.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {point.impact}
                  </span>
                </div>
                <p className="text-gray-700 text-xs mb-2">{point.description}</p>
                <div className="flex items-start space-x-1">
                  <Lightbulb className="w-3 h-3 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-600">{point.suggestion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps - Compact */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-5">
          <div className="flex items-start space-x-3">
            <Target className="w-5 h-5 text-primary-600 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-primary-900 mb-2">Next Steps</h3>
              <p className="text-primary-700 text-sm mb-4">
                Start with high-priority improvements to maximize your content's performance.
              </p>
              <div className="flex space-x-2">
                <Link 
                  to="/adapt" 
                  className="bg-primary-600 hover:bg-primary-700 text-white text-sm px-3 py-2 rounded-lg transition-colors"
                  onClick={() => {
                    // Store the analyzed content for adaptation
                    const storedResults = sessionStorage.getItem('analysisResults')
                    if (storedResults) {
                      try {
                        const data = JSON.parse(storedResults)
                        // Use the original content from the analysis response if available
                        const contentForAdaptation = data.originalContent || 'Sample content for adaptation'
                        sessionStorage.setItem('contentToAdapt', contentForAdaptation)
                      } catch (error) {
                        console.error('Failed to store content for adaptation:', error)
                      }
                    }
                  }}
                >
                  Adapt for Platforms
                </Link>
                <Link to="/learn" className="bg-white text-primary-700 border border-primary-300 hover:bg-primary-50 text-sm px-3 py-2 rounded-lg transition-colors">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalysisDashboard