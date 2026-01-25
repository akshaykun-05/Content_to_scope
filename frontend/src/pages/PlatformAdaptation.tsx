import { useState } from 'react'
import { Copy, Download, Share2, Twitter, Linkedin, Instagram, Globe, ArrowRight, Zap } from 'lucide-react'
import toast from 'react-hot-toast'

const PlatformAdaptation = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('twitter')
  const [isGenerating, setIsGenerating] = useState(false)

  const originalContent = `Just discovered an amazing productivity technique that's completely changed how I work! The Pomodoro Technique involves working in focused 25-minute intervals followed by 5-minute breaks. After trying it for a week, I've noticed a 40% increase in my daily output and significantly less mental fatigue. The key is eliminating all distractions during those 25 minutes - no phone, no email, just pure focus on one task. If you're struggling with productivity or feeling overwhelmed, I highly recommend giving this a try. What productivity techniques have worked best for you?`

  const platforms = [
    {
      id: 'twitter',
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-blue-500',
      limits: { chars: 280, hashtags: 3 },
      adaptedContent: `🚀 Game-changer alert! Just tried the Pomodoro Technique for a week:\n\n✅ 25min focused work + 5min breaks\n✅ 40% productivity boost\n✅ Way less mental fatigue\n\nThe secret? Zero distractions during work blocks 📱❌\n\nWhat's your go-to productivity hack? 👇\n\n#ProductivityHack #PomodoroTechnique #WorkSmart`
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700',
      limits: { chars: 3000, hashtags: 5 },
      adaptedContent: `💡 Productivity Breakthrough: The Pomodoro Technique\n\nAfter struggling with focus and productivity, I decided to test the famous Pomodoro Technique for one week. The results were remarkable:\n\n📊 Key Results:\n• 40% increase in daily output\n• Significantly reduced mental fatigue\n• Better work-life balance\n• Improved task completion rates\n\n🎯 How it works:\n1. Work in focused 25-minute intervals\n2. Take 5-minute breaks between sessions\n3. Eliminate ALL distractions (phone, email, notifications)\n4. Focus on ONE task per session\n\nThe most challenging part was resisting the urge to check messages, but the payoff was incredible. My ability to deep-dive into complex projects improved dramatically.\n\n💭 For professionals feeling overwhelmed or struggling with focus, this technique offers a structured approach to reclaim your productivity.\n\nWhat productivity strategies have transformed your work? I'd love to hear your experiences in the comments.\n\n#Productivity #TimeManagement #WorkEfficiency #ProfessionalDevelopment #Focus`
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-pink-500',
      limits: { chars: 2200, hashtags: 30 },
      adaptedContent: `🍅 PRODUCTIVITY GAME CHANGER! ✨\n\nY'all, I just had to share this because it's literally transformed my work life! 🙌\n\nI tried the Pomodoro Technique for a WHOLE WEEK and I'm shook by the results! 🤯\n\n✨ What happened:\n• 40% more productive (no joke!)\n• Way less brain fog\n• Actually enjoying work again\n• Getting stuff DONE\n\n🎯 The magic formula:\n25 minutes of laser focus + 5 minute break = EVERYTHING\n\nThe hardest part? Putting that phone in another room 📱➡️🚪 But trust me, it's SO worth it!\n\nSwipe to see my productivity setup and tips! ➡️\n\nDrop a 🍅 if you're gonna try this!\n\n#ProductivityHacks #PomodoroTechnique #WorkSmart #Productivity #TimeManagement #Focus #WorkLifeBalance #GetStuffDone #ProductivityTips #Motivation #Success #Entrepreneur #StudentLife #WorkFromHome #Efficiency`
    },
    {
      id: 'blog',
      name: 'Blog Post',
      icon: Globe,
      color: 'bg-gray-600',
      limits: { chars: 10000, hashtags: 10 },
      adaptedContent: `# How the Pomodoro Technique Increased My Productivity by 40%\n\n## Introduction\n\nIn our hyper-connected world, maintaining focus has become increasingly challenging. Between constant notifications, endless emails, and the allure of social media, deep work seems like a luxury few can afford. That's why I decided to experiment with one of the most talked-about productivity techniques: the Pomodoro Technique.\n\n## What is the Pomodoro Technique?\n\nDeveloped by Francesco Cirillo in the late 1980s, the Pomodoro Technique is a time management method that breaks work into intervals, traditionally 25 minutes in length, separated by short breaks. These intervals are known as "pomodoros," named after the tomato-shaped kitchen timer Cirillo used as a university student.\n\n## My Week-Long Experiment\n\n### The Setup\nI committed to using the Pomodoro Technique for one full work week, tracking my productivity, energy levels, and overall satisfaction with my work output.\n\n### The Rules I Followed\n1. **25-minute focused work sessions** - No exceptions\n2. **5-minute breaks** between each session\n3. **Complete elimination of distractions** - Phone in another room, email closed, notifications off\n4. **One task per pomodoro** - No multitasking allowed\n5. **Longer 15-30 minute breaks** after every 4 pomodoros\n\n## The Results Were Remarkable\n\n### Quantitative Improvements\n- **40% increase in daily task completion**\n- **Reduced time spent on individual tasks** by an average of 15 minutes\n- **Decreased context switching** from 15+ times per hour to 2-3 times\n\n### Qualitative Benefits\n- **Significantly less mental fatigue** at the end of the day\n- **Improved focus quality** - deeper concentration during work periods\n- **Better work-life separation** - clearer boundaries between work and rest\n- **Increased satisfaction** with daily accomplishments\n\n## The Biggest Challenge: Eliminating Distractions\n\nThe most difficult aspect wasn't the time constraints—it was resisting the constant pull of digital distractions. Our brains are wired to seek novelty, and breaking the habit of checking phones and emails required genuine willpower.\n\n**My solution:** Physical separation. I placed my phone in another room and used a traditional timer. This simple change eliminated the temptation entirely.\n\n## Why It Works: The Science Behind Pomodoros\n\nThe technique leverages several psychological principles:\n\n1. **Timeboxing** creates urgency and prevents perfectionism\n2. **Regular breaks** prevent cognitive fatigue\n3. **Single-tasking** reduces cognitive load\n4. **Gamification** makes work feel more manageable and rewarding\n\n## Implementation Tips for Success\n\n### Start Small\nBegin with 2-3 pomodoros per day and gradually increase as the habit forms.\n\n### Choose the Right Tasks\nPomodoros work best for tasks requiring deep focus. Use them for writing, coding, analysis, or creative work.\n\n### Customize Your Breaks\nUse breaks for activities that genuinely refresh you: stretching, walking, hydrating, or brief meditation.\n\n### Track Your Progress\nKeep a simple log of completed pomodoros and tasks accomplished. This provides motivation and helps identify patterns.\n\n## Conclusion\n\nThe Pomodoro Technique isn't just another productivity fad—it's a scientifically-backed method that addresses the core challenges of modern work: distraction, fatigue, and overwhelm.\n\nAfter one week, I've made it a permanent part of my workflow. The combination of increased output and reduced stress has been transformative.\n\n**Your turn:** What productivity techniques have you tried? Have you experimented with time-blocking methods? Share your experiences in the comments below.\n\n---\n\n*Ready to boost your productivity? Start with just one 25-minute focused session today. You might be surprised by what you can accomplish.*`
    }
  ]

  const currentPlatform = platforms.find(p => p.id === selectedPlatform)!

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content)
    toast.success('Content copied to clipboard!')
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success('New variation generated!')
    } catch (error) {
      toast.error('Generation failed. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const getCharacterCount = (content: string) => {
    return content.length
  }

  const getCharacterStatus = (content: string, limit: number) => {
    const count = getCharacterCount(content)
    const percentage = (count / limit) * 100
    
    if (percentage > 100) return 'text-red-600'
    if (percentage > 90) return 'text-yellow-600'
    return 'text-green-600'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Platform Adaptation</h1>
          <p className="text-gray-600 mt-2">Optimize your content for different social media platforms</p>
        </div>
        <button className="btn-primary">Save All Adaptations</button>
      </div>

      {/* Platform Selector */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Platform</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {platforms.map((platform) => {
            const Icon = platform.icon
            return (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedPlatform === platform.id
                    ? 'border-primary-500 bg-primary-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className={`w-8 h-8 ${platform.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900">{platform.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Original Content */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Original Content</h2>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-gray-700 whitespace-pre-wrap">{originalContent}</p>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>{getCharacterCount(originalContent)} characters</span>
            <span>Blog post format</span>
          </div>
        </div>

        {/* Adapted Content */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Adapted for {currentPlatform.name}
            </h2>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="btn-secondary text-sm flex items-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Zap className="w-3 h-3" />
                  <span>Generate Variation</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-4 min-h-[200px]">
            <p className="text-gray-700 whitespace-pre-wrap">{currentPlatform.adaptedContent}</p>
          </div>

          {/* Platform Stats */}
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Character Count</span>
              <span className={`text-sm font-medium ${getCharacterStatus(currentPlatform.adaptedContent, currentPlatform.limits.chars)}`}>
                {getCharacterCount(currentPlatform.adaptedContent)} / {currentPlatform.limits.chars}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  getCharacterCount(currentPlatform.adaptedContent) > currentPlatform.limits.chars
                    ? 'bg-red-500'
                    : getCharacterCount(currentPlatform.adaptedContent) > currentPlatform.limits.chars * 0.9
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
                style={{
                  width: `${Math.min((getCharacterCount(currentPlatform.adaptedContent) / currentPlatform.limits.chars) * 100, 100)}%`
                }}
              ></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Hashtag Limit</span>
              <span className="text-sm font-medium text-gray-700">
                {(currentPlatform.adaptedContent.match(/#/g) || []).length} / {currentPlatform.limits.hashtags}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={() => handleCopy(currentPlatform.adaptedContent)}
              className="btn-secondary flex items-center space-x-2 flex-1"
            >
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </button>
            <button className="btn-secondary flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="btn-primary flex items-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Adaptation Insights */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Adaptation Insights</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Key Changes Made</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start space-x-2">
                <ArrowRight className="w-3 h-3 text-primary-500 mt-1 flex-shrink-0" />
                <span>Shortened content to fit character limits</span>
              </li>
              <li className="flex items-start space-x-2">
                <ArrowRight className="w-3 h-3 text-primary-500 mt-1 flex-shrink-0" />
                <span>Added platform-appropriate emojis and formatting</span>
              </li>
              <li className="flex items-start space-x-2">
                <ArrowRight className="w-3 h-3 text-primary-500 mt-1 flex-shrink-0" />
                <span>Optimized hashtags for discoverability</span>
              </li>
              <li className="flex items-start space-x-2">
                <ArrowRight className="w-3 h-3 text-primary-500 mt-1 flex-shrink-0" />
                <span>Adjusted tone for platform audience</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Platform Optimization</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Optimal posting time: 9-10 AM</li>
              <li>• Expected engagement: High</li>
              <li>• Audience match: 95%</li>
              <li>• Trending topics: Included</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Performance Prediction</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Engagement Rate</span>
                <span className="text-sm font-medium text-green-600">+35%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Reach</span>
                <span className="text-sm font-medium text-green-600">+28%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Click-through</span>
                <span className="text-sm font-medium text-green-600">+42%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card bg-primary-50 border-primary-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-primary-900">Ready to publish?</h3>
            <p className="text-primary-700 mt-1">Your content is optimized and ready for {currentPlatform.name}</p>
          </div>
          <div className="flex space-x-3">
            <button className="btn-secondary">Schedule Post</button>
            <button className="btn-primary">Publish Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlatformAdaptation