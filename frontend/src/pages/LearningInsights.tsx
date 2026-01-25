import { useState } from 'react'
import { BookOpen, Play, CheckCircle, Clock, TrendingUp, Award, ArrowRight, Lightbulb } from 'lucide-react'

const LearningInsights = () => {
  const [activeTab, setActiveTab] = useState('recommendations')

  const learningPath = [
    {
      id: 1,
      title: 'Content Structure Fundamentals',
      description: 'Learn how to structure your content for maximum engagement',
      duration: '15 min',
      completed: true,
      type: 'article'
    },
    {
      id: 2,
      title: 'Platform-Specific Writing Styles',
      description: 'Master the art of adapting your tone for different platforms',
      duration: '20 min',
      completed: true,
      type: 'video'
    },
    {
      id: 3,
      title: 'Effective Call-to-Actions',
      description: 'Create CTAs that drive engagement and conversions',
      duration: '12 min',
      completed: false,
      type: 'interactive'
    },
    {
      id: 4,
      title: 'Hashtag Strategy Mastery',
      description: 'Optimize your hashtag usage for better discoverability',
      duration: '18 min',
      completed: false,
      type: 'article'
    }
  ]

  const recommendations = [
    {
      title: 'Improve Your Headlines',
      description: 'Your recent content analysis shows headlines could be more engaging. Learn proven headline formulas.',
      priority: 'high',
      estimatedTime: '25 min',
      modules: ['Headline Psychology', 'A/B Testing Headlines', 'Platform-Specific Headlines']
    },
    {
      title: 'Master Content Length Optimization',
      description: 'Several posts exceeded optimal length. Learn how to convey your message concisely.',
      priority: 'medium',
      estimatedTime: '20 min',
      modules: ['Concise Writing', 'Content Editing', 'Platform Limits']
    },
    {
      title: 'Enhance Visual Storytelling',
      description: 'Boost engagement by incorporating visual elements effectively.',
      priority: 'low',
      estimatedTime: '30 min',
      modules: ['Visual Content Strategy', 'Image Selection', 'Infographic Basics']
    }
  ]

  const achievements = [
    {
      title: 'Content Analyzer',
      description: 'Analyzed your first piece of content',
      earned: true,
      date: '2 days ago'
    },
    {
      title: 'Platform Master',
      description: 'Adapted content for 3 different platforms',
      earned: true,
      date: '1 day ago'
    },
    {
      title: 'Quick Learner',
      description: 'Completed 5 learning modules',
      earned: false,
      progress: 60
    },
    {
      title: 'Engagement Expert',
      description: 'Achieved 80%+ engagement prediction score',
      earned: false,
      progress: 75
    }
  ]

  const bestPractices = [
    {
      category: 'Twitter',
      tips: [
        'Keep tweets under 280 characters for optimal engagement',
        'Use 1-2 relevant hashtags maximum',
        'Include a clear call-to-action',
        'Post during peak hours (9-10 AM, 7-9 PM)'
      ]
    },
    {
      category: 'LinkedIn',
      tips: [
        'Start with a hook in the first line',
        'Use line breaks for better readability',
        'Include industry-relevant hashtags',
        'End with a question to encourage comments'
      ]
    },
    {
      category: 'Instagram',
      tips: [
        'Use storytelling in your captions',
        'Include 5-10 relevant hashtags',
        'Add emojis to break up text',
        'Create shareable, visual-first content'
      ]
    }
  ]

  const progressStats = {
    modulesCompleted: 12,
    totalModules: 25,
    streakDays: 5,
    skillLevel: 'Intermediate'
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="w-4 h-4" />
      case 'interactive':
        return <Lightbulb className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50'
      case 'medium':
        return 'border-yellow-200 bg-yellow-50'
      default:
        return 'border-blue-200 bg-blue-50'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Learning Insights</h1>
          <p className="text-gray-600 mt-2">Personalized learning path based on your content analysis</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary-600">{progressStats.skillLevel}</div>
          <div className="text-sm text-gray-600">Current Level</div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">{progressStats.modulesCompleted}</div>
          <div className="text-gray-600 mt-1">Modules Completed</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-primary-500 h-2 rounded-full"
              style={{ width: `${(progressStats.modulesCompleted / progressStats.totalModules) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">{progressStats.streakDays}</div>
          <div className="text-gray-600 mt-1">Day Streak</div>
          <div className="text-xs text-green-600 mt-1">Keep it up!</div>
        </div>

        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-600">85%</div>
          <div className="text-gray-600 mt-1">Avg. Score</div>
          <div className="text-xs text-gray-500 mt-1">Last 7 analyses</div>
        </div>

        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600">3</div>
          <div className="text-gray-600 mt-1">Achievements</div>
          <div className="text-xs text-gray-500 mt-1">2 more to unlock</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'recommendations', label: 'Recommendations' },
            { id: 'learning-path', label: 'Learning Path' },
            { id: 'best-practices', label: 'Best Practices' },
            { id: 'achievements', label: 'Achievements' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'recommendations' && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Personalized Recommendations</h2>
            <p className="text-gray-600 mb-6">
              Based on your recent content analysis, here are targeted learning opportunities to improve your content performance.
            </p>
            
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className={`p-4 rounded-lg border ${getPriorityColor(rec.priority)}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                      rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {rec.priority} priority
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{rec.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{rec.estimatedTime}</span>
                      </span>
                      <span>{rec.modules.length} modules</span>
                    </div>
                    <button className="btn-primary text-sm">Start Learning</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'learning-path' && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Learning Path</h2>
            <p className="text-gray-600 mb-6">
              Follow this curated path to master content creation across all platforms.
            </p>
            
            <div className="space-y-4">
              {learningPath.map((module, index) => (
                <div key={module.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    module.completed ? 'bg-green-500' : 'bg-gray-300'
                  }`}>
                    {module.completed ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : (
                      <span className="text-white text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{module.title}</h3>
                    <p className="text-gray-600 text-sm">{module.description}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      {getTypeIcon(module.type)}
                      <span>{module.duration}</span>
                    </div>
                    <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      module.completed
                        ? 'bg-green-100 text-green-800'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}>
                      {module.completed ? 'Completed' : 'Start'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'best-practices' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {bestPractices.map((platform, index) => (
              <div key={index} className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{platform.category}</h3>
                <ul className="space-y-3">
                  {platform.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start space-x-2">
                      <ArrowRight className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Achievements</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className={`p-4 rounded-lg border ${
                  achievement.earned ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      achievement.earned ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{achievement.description}</p>
                      {achievement.earned ? (
                        <span className="text-xs text-green-600">Earned {achievement.date}</span>
                      ) : (
                        <div className="space-y-1">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary-500 h-2 rounded-full"
                              style={{ width: `${achievement.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600">{achievement.progress}% complete</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Next Steps */}
      <div className="card bg-primary-50 border-primary-200">
        <div className="flex items-start space-x-4">
          <TrendingUp className="w-6 h-6 text-primary-600 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-primary-900 mb-2">Continue Your Learning Journey</h3>
            <p className="text-primary-700 mb-4">
              You're making great progress! Complete your next recommended module to unlock new insights and improve your content performance.
            </p>
            <button className="btn-primary">Continue Learning</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearningInsights