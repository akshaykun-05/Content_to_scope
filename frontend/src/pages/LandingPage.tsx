import { Link } from 'react-router-dom'
import { ArrowRight, Target, Zap, Brain, Users } from 'lucide-react'

const LandingPage = () => {
  const features = [
    {
      icon: Target,
      title: 'Understand Failures',
      description: 'Get AI-powered insights into why your content underperforms with specific, actionable explanations.',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      icon: Zap,
      title: 'Platform Adaptation',
      description: 'Automatically adapt your content for different social media platforms and audiences.',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      icon: Brain,
      title: 'Explainable AI',
      description: 'Learn from detailed AI explanations that help you improve your content creation skills.',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Users,
      title: 'Multi-Platform Support',
      description: 'Optimize for Twitter, LinkedIn, Instagram, blogs, and more with platform-specific insights.',
      gradient: 'from-orange-500 to-red-600'
    }
  ]

  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'Student Creator',
      content: 'ContentScope helped me understand why my posts weren\'t getting engagement. The AI explanations are incredibly detailed and actionable.'
    },
    {
      name: 'Jordan Smith',
      role: 'Content Creator',
      content: 'I\'ve grown my audience by 300% using ContentScope\'s platform adaptation features. It\'s like having a content strategist in my pocket.'
    },
    {
      name: 'Sam Rodriguez',
      role: 'Blogger',
      content: 'The learning insights have transformed how I write. I now understand what makes content successful across different platforms.'
    }
  ]

  return (
    <div className="relative min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative space-y-20">
        {/* Hero Section */}
        <section className="text-center space-y-8 pt-20">
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered Content Analysis
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Understand Why Your
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent"> Content Fails</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              AI-powered content analysis that explains failures, adapts content for different platforms, 
              and teaches you to create better content through explainable insights.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link to="/analyze" className="btn-primary inline-flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg">
              <span>Start Analyzing Content</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <Link to="/learn" className="btn-secondary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg text-center">
              Watch Demo
            </Link>
          </div>

          {/* Hero Image with Enhanced Design */}
          <div className="mt-16 relative">
            <div className="bg-gradient-to-br from-primary-50 to-blue-100 rounded-3xl p-8 max-w-5xl mx-auto shadow-2xl">
              <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                  <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                  <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-3/4"></div>
                  <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-1/2"></div>
                  <div className="h-32 bg-gradient-to-br from-primary-50 to-purple-50 rounded-xl flex items-center justify-center border-2 border-primary-100">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Brain className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-primary-700 font-semibold text-lg">Content Analysis Dashboard</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
        </section>

        {/* Features Section */}
        <section className="space-y-12 px-4">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">
              Everything You Need to Create Better Content
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive insights and tools to help you understand, 
              adapt, and improve your content across all platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-4">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="group card text-center space-y-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative">
          <div className="bg-gradient-to-r from-white via-blue-50 to-purple-50 rounded-3xl p-8 md:p-16 shadow-xl">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Loved by Content Creators
              </h2>
              <p className="text-lg text-gray-600">
                See how ContentScope is helping creators improve their content and grow their audience.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative">
          <div className="bg-gradient-to-r from-primary-600 via-purple-600 to-blue-600 rounded-3xl p-8 md:p-16 text-white shadow-2xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v20h40V20H20z'/%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
            
            <div className="relative text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Ready to Improve Your Content?
                </h2>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of creators who are already using ContentScope to create better, 
                  more engaging content across all platforms.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/analyze" className="inline-flex items-center space-x-2 bg-white text-primary-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/learn" className="inline-flex items-center space-x-2 border-2 border-white text-white font-semibold py-4 px-8 rounded-xl hover:bg-white hover:text-primary-600 transition-colors">
                  <span>Learn More</span>
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="text-3xl font-bold">10K+</div>
                  <div className="text-blue-100">Content Analyzed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">95%</div>
                  <div className="text-blue-100">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">6</div>
                  <div className="text-blue-100">Platforms Supported</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default LandingPage