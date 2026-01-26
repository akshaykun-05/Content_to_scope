import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, Image, Link as LinkIcon, Zap, Brain } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { contentAPI, ContentAnalysisRequest } from '../services/api'
import { useAuth } from '../contexts/AuthContext'

const ContentInput = () => {
  const navigate = useNavigate()
  const { incrementAnalysisCount } = useAuth()
  const [contentType, setContentType] = useState<'text' | 'image' | 'url'>('text')
  const [textContent, setTextContent] = useState('')
  const [urlContent, setUrlContent] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['twitter'])

  const analysisMutation = useMutation({
    mutationFn: (request: ContentAnalysisRequest) => contentAPI.analyzeContent(request),
    onSuccess: async (data) => {
      toast.success('Analysis complete!')
      
      // Update user progress
      await incrementAnalysisCount(data.overallScore)
      
      // Store results in sessionStorage for the dashboard
      sessionStorage.setItem('analysisResults', JSON.stringify(data))
      // Store the original content for potential adaptation
      // Use the extracted content from the response if available (for URLs), otherwise use the input
      const contentForAdaptation = data.originalContent || 
                                  (contentType === 'text' ? textContent : 
                                   contentType === 'url' ? urlContent : 
                                   'Uploaded content')
      sessionStorage.setItem('contentToAdapt', contentForAdaptation)
      navigate('/dashboard')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Analysis failed. Please try again.')
    }
  })

  const platforms = [
    { 
      id: 'twitter', 
      name: 'Twitter', 
      color: 'bg-blue-500',
      logo: (
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    { 
      id: 'linkedin', 
      name: 'LinkedIn', 
      color: 'bg-blue-700',
      logo: (
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    { 
      id: 'instagram', 
      name: 'Instagram', 
      color: 'bg-pink-500',
      logo: (
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C8.396 0 7.929.01 7.694.048 7.46.085 7.297.13 7.159.172a3.838 3.838 0 0 0-1.414.923A3.836 3.836 0 0 0 4.822 2.5c-.041.138-.086.301-.123.535C4.66 3.27 4.65 3.737 4.65 7.358v9.284c0 3.621.01 4.088.048 4.323.037.234.082.397.123.535.18.563.454 1.077.923 1.414.337.337.851.611 1.414.923.138.041.301.086.535.123.235.038.702.048 4.323.048h9.284c3.621 0 4.088-.01 4.323-.048.234-.037.397-.082.535-.123a3.838 3.838 0 0 0 1.414-.923 3.836 3.836 0 0 0 .923-1.414c.041-.138.086-.301.123-.535.038-.235.048-.702.048-4.323V7.358c0-3.621-.01-4.088-.048-4.323-.037-.234-.082-.397-.123-.535a3.838 3.838 0 0 0-.923-1.414A3.836 3.836 0 0 0 19.5 4.822c-.138-.041-.301-.086-.535-.123C18.73 4.66 18.263 4.65 14.642 4.65H7.358zm-.081 1.802h9.166c3.499 0 3.9.006 4.28.048.26.037.4.166.492.27.096.096.233.232.27.492.042.38.048.781.048 4.28v9.166c0 3.499-.006 3.9-.048 4.28-.037.26-.166.4-.27.492-.096.096-.232.233-.492.27-.38.042-.781.048-4.28.048H7.936c-3.499 0-3.9-.006-4.28-.048-.26-.037-.4-.166-.492-.27a1.294 1.294 0 0 1-.27-.492c-.042-.38-.048-.781-.048-4.28V7.936c0-3.499.006-3.9.048-4.28.037-.26.166-.4.27-.492.096-.096.232-.233.492-.27.38-.042.781-.048 4.28-.048L11.936 1.802zm4.064 2.142a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
        </svg>
      )
    },
    { 
      id: 'facebook', 
      name: 'Facebook', 
      color: 'bg-blue-600',
      logo: (
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    { 
      id: 'blog', 
      name: 'Blog', 
      color: 'bg-gray-600',
      logo: (
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    },
    { 
      id: 'youtube', 
      name: 'YouTube', 
      color: 'bg-red-600',
      logo: (
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
  ]

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'text/*': ['.txt', '.md'],
    },
    maxFiles: 1,
    onDrop: (files) => {
      if (files.length > 0) {
        setContentType('image')
        toast.success('File uploaded successfully!')
      }
    }
  })

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    )
  }

  const handleAnalyze = async () => {
    let content = ''
    
    if (contentType === 'text' && !textContent.trim()) {
      toast.error('Please enter some text content')
      return
    }
    
    if (contentType === 'url' && !urlContent.trim()) {
      toast.error('Please enter a URL')
      return
    }
    
    if (contentType === 'image' && acceptedFiles.length === 0) {
      toast.error('Please upload an image')
      return
    }

    if (selectedPlatforms.length === 0) {
      toast.error('Please select at least one platform')
      return
    }

    // Get content based on type
    if (contentType === 'text') {
      content = textContent
    } else if (contentType === 'url') {
      content = urlContent
    } else if (contentType === 'image') {
      content = `Image file: ${acceptedFiles[0].name}`
    }

    analysisMutation.mutate({
      content,
      contentType,
      platforms: selectedPlatforms
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Compact Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-3">
            <Brain className="w-4 h-4 mr-2" />
            AI Content Analysis
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Analyze Your Content</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload content and select platforms for AI-powered insights.
          </p>
        </div>

        {/* Main Content - Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Content Input - Full width on mobile, left side on desktop */}
          <div className="lg:col-span-8 space-y-4">
            {/* Content Type & Input Combined */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6">
              {/* Content Type Selector - Stack on mobile, horizontal on desktop */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
                <button
                  onClick={() => setContentType('text')}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    contentType === 'text'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  <FileText className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-sm font-medium">Text</span>
                </button>
                <button
                  onClick={() => setContentType('image')}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    contentType === 'image'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  <Image className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-sm font-medium">Image</span>
                </button>
                <button
                  onClick={() => setContentType('url')}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    contentType === 'url'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  <LinkIcon className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-sm font-medium">URL</span>
                </button>
              </div>

              {/* Content Input Area */}
              {contentType === 'text' && (
                <div>
                  <textarea
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Paste your content here... (social media post, blog excerpt, article, etc.)"
                    className="w-full h-32 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    {textContent.length} characters
                  </div>
                </div>
              )}

              {contentType === 'image' && (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  {acceptedFiles.length > 0 ? (
                    <div>
                      <p className="text-green-600 font-medium text-sm">
                        {acceptedFiles[0].name} uploaded
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Click or drag to replace
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-600 font-medium text-sm">
                        {isDragActive ? 'Drop your image here' : 'Drag & drop an image, or click to select'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Supports PNG, JPG, GIF, WebP
                      </p>
                    </div>
                  )}
                </div>
              )}

              {contentType === 'url' && (
                <div>
                  <input
                    type="url"
                    value={urlContent}
                    onChange={(e) => setUrlContent(e.target.value)}
                    placeholder="https://example.com/your-content"
                    className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Enter the URL of your blog post, article, or web content
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Platform Selection & Analysis - Full width on mobile, right side on desktop */}
          <div className="lg:col-span-4 space-y-4">
            {/* Platform Selection - Mobile-friendly Grid */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Target Platforms</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
                {platforms.map((platform) => (
                  <label
                    key={platform.id}
                    className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={selectedPlatforms.includes(platform.id)}
                      onChange={() => handlePlatformToggle(platform.id)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${platform.color}`}>
                      {platform.logo}
                    </div>
                    <span className="text-sm font-medium text-gray-700 truncate">{platform.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Analysis Button */}
            <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-xl shadow-lg border border-gray-100 p-6">
              <button
                onClick={handleAnalyze}
                disabled={analysisMutation.isPending}
                className="w-full bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {analysisMutation.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Analyze Content</span>
                  </>
                )}
              </button>
              
              {selectedPlatforms.length > 0 && (
                <div className="mt-4 p-3 bg-white/60 rounded-lg">
                  <p className="font-medium mb-2 text-gray-800 text-sm">Analysis includes:</p>
                  <ul className="space-y-1 text-xs text-gray-600">
                    <li className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-primary-500 rounded-full"></div>
                      <span>Content structure & readability</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-primary-500 rounded-full"></div>
                      <span>Platform-specific optimization</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-primary-500 rounded-full"></div>
                      <span>Engagement prediction</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-primary-500 rounded-full"></div>
                      <span>Improvement recommendations</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentInput