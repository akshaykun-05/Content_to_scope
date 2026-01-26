import { ReactNode, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, BarChart3, Shuffle, BookOpen, Menu, X, LogOut, User } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { currentUser, userData, logout } = useAuth()
  
  const navigation = [
    { name: 'Analyze', href: '/analyze', icon: Search },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Adapt', href: '/adapt', icon: Shuffle },
    { name: 'Learn', href: '/learn', icon: BookOpen },
  ]

  const isActive = (path: string) => location.pathname === path

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Compact Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-12 sm:h-14">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-7 sm:h-7 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">CS</span>
              </div>
              <span className="text-base sm:text-lg font-bold text-gray-900">ContentScope</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* User Menu and Mobile Menu */}
            <div className="flex items-center space-x-2">
              {/* User Info - Desktop */}
              <div className="hidden lg:flex items-center space-x-3">
                {userData && (
                  <div className="text-right">
                    <div className="text-xs font-medium text-gray-900">
                      {currentUser?.displayName}
                    </div>
                    <div className="text-xs text-gray-500">
                      🔥 {userData.currentStreak} • 📚 {userData.modulesCompleted.length}
                    </div>
                  </div>
                )}
              </div>

              {/* User Avatar and Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-1 p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {currentUser?.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'User'}
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full"
                    />
                  ) : (
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-primary-600 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                  )}
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="text-sm font-medium text-gray-900">
                        {currentUser?.displayName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {currentUser?.email}
                      </div>
                    </div>
                    {userData && (
                      <div className="px-4 py-2 border-b border-gray-100">
                        <div className="text-xs text-gray-600 space-y-1">
                          <div>🔥 Streak: {userData.currentStreak} days</div>
                          <div>📚 Modules: {userData.modulesCompleted.length}/25</div>
                          <div>📊 Analyses: {userData.totalAnalyses}</div>
                        </div>
                      </div>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button 
                className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white">
              <div className="px-4 py-2 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
                
                {/* Mobile User Info */}
                {userData && (
                  <div className="px-3 py-2 border-t border-gray-200 mt-2">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      {currentUser?.displayName}
                    </div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>🔥 {userData.currentStreak} day streak</div>
                      <div>📚 {userData.modulesCompleted.length}/25 modules</div>
                      <div>📊 {userData.totalAnalyses} analyses</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content - Better mobile padding */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
        {children}
      </main>

      {/* Click outside to close menus */}
      {(isMobileMenuOpen || isUserMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsMobileMenuOpen(false)
            setIsUserMenuOpen(false)
          }}
        />
      )}
    </div>
  )
}

export default Layout