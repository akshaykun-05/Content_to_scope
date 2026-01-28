import React, { createContext, useContext, useEffect, useState } from 'react'
import { UserStats } from '../services/api'

// User interface that matches what we need
interface User {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  emailVerified: boolean
  getIdToken: () => Promise<string>
}

interface AuthContextType {
  currentUser: User | null
  userData: UserStats | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>
  logout: () => Promise<void>
  updateUserProgress: (data: Partial<UserStats>) => Promise<void>
  incrementAnalysisCount: (score: number) => Promise<void>
  updateStreak: () => Promise<void>
  refreshUserData: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Simple in-memory user database for demo
const userDatabase = new Map<string, { email: string, password: string, displayName: string }>()

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)

  const createUserData = (user: User): UserStats => {
    return {
      userId: user.uid,
      totalAnalyses: 0,
      currentStreak: 1,
      longestStreak: 1,
      averageScore: 0,
      modulesCompleted: [],
      achievements: ['welcome'],
      lastActivityDate: new Date().toISOString().split('T')[0],
      weeklyProgress: [],
      monthlyProgress: [],
      platformsUsed: []
    }
  }

  const createUser = (email: string, displayName: string): User => {
    const uid = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    return {
      uid,
      email,
      displayName,
      photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=4F46E5&color=fff`,
      emailVerified: true,
      getIdToken: async () => {
        // Create a simple JWT-like token
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
        const payload = btoa(JSON.stringify({
          sub: uid,
          email,
          name: displayName,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 3600
        }))
        const signature = btoa('demo-signature')
        return `${header}.${payload}.${signature}`
      }
    }
  }

  const signInWithGoogle = async () => {
    try {
      // Simulate Google OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Create a user with Google-like info
      const user = createUser(
        `user${Date.now()}@gmail.com`,
        'Google User'
      )
      
      setCurrentUser(user)
      const initialUserData = createUserData(user)
      setUserData(initialUserData)
      
      // Persist session
      localStorage.setItem('contentscope_session', JSON.stringify({
        user,
        userData: initialUserData
      }))
      
    } catch (error) {
      console.error('Google sign in error:', error)
      throw new Error('Failed to sign in with Google. Please try again.')
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check if user exists in our demo database
      const userData = userDatabase.get(email)
      if (!userData) {
        throw new Error('No account found with this email.')
      }
      
      if (userData.password !== password) {
        throw new Error('Incorrect password.')
      }
      
      const user = createUser(email, userData.displayName)
      setCurrentUser(user)
      
      const initialUserData = createUserData(user)
      setUserData(initialUserData)
      
      // Persist session
      localStorage.setItem('contentscope_session', JSON.stringify({
        user,
        userData: initialUserData
      }))
      
    } catch (error: any) {
      console.error('Email sign in error:', error)
      throw error
    }
  }

  const signUpWithEmail = async (email: string, password: string, displayName: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check if user already exists
      if (userDatabase.has(email)) {
        throw new Error('An account with this email already exists.')
      }
      
      if (password.length < 6) {
        throw new Error('Password should be at least 6 characters.')
      }
      
      // Store user in demo database
      userDatabase.set(email, { email, password, displayName })
      
      const user = createUser(email, displayName)
      setCurrentUser(user)
      
      const initialUserData = createUserData(user)
      setUserData(initialUserData)
      
      // Persist session
      localStorage.setItem('contentscope_session', JSON.stringify({
        user,
        userData: initialUserData
      }))
      
    } catch (error: any) {
      console.error('Email sign up error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      setCurrentUser(null)
      setUserData(null)
      localStorage.removeItem('contentscope_session')
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  const refreshUserData = async () => {
    if (!currentUser) return
    
    try {
      const session = localStorage.getItem('contentscope_session')
      if (session) {
        const { userData } = JSON.parse(session)
        setUserData(userData)
      }
    } catch (error) {
      console.error('Failed to refresh user data:', error)
    }
  }

  const updateUserProgress = async (data: Partial<UserStats>) => {
    if (!currentUser || !userData) return

    try {
      const updatedData = { ...userData, ...data }
      setUserData(updatedData)
      
      // Update persisted session
      const session = localStorage.getItem('contentscope_session')
      if (session) {
        const sessionData = JSON.parse(session)
        sessionData.userData = updatedData
        localStorage.setItem('contentscope_session', JSON.stringify(sessionData))
      }
    } catch (error) {
      console.error('Failed to update user progress:', error)
    }
  }

  const incrementAnalysisCount = async (score: number) => {
    if (!currentUser || !userData) return

    try {
      const newTotalAnalyses = userData.totalAnalyses + 1
      const newTotalScore = (userData.averageScore * userData.totalAnalyses) + score
      const newAverageScore = Math.round(newTotalScore / newTotalAnalyses)
      
      await updateUserProgress({
        totalAnalyses: newTotalAnalyses,
        averageScore: newAverageScore
      })
    } catch (error) {
      console.error('Failed to increment analysis count:', error)
    }
  }

  const updateStreak = async () => {
    if (!currentUser || !userData) return

    const today = new Date().toISOString().split('T')[0]
    const lastActive = userData.lastActivityDate
    
    let newStreakDays = userData.currentStreak

    if (lastActive !== today) {
      const lastActiveDate = new Date(lastActive)
      const todayDate = new Date(today)
      const daysDiff = Math.floor((todayDate.getTime() - lastActiveDate.getTime()) / (1000 * 60 * 60 * 24))
      
      if (daysDiff === 1) {
        newStreakDays += 1
      } else if (daysDiff > 1) {
        newStreakDays = 1
      }

      try {
        await updateUserProgress({
          currentStreak: newStreakDays,
          longestStreak: Math.max(userData.longestStreak, newStreakDays),
          lastActivityDate: today
        })
      } catch (error) {
        console.error('Failed to update streak:', error)
      }
    }
  }

  useEffect(() => {
    // Restore session on app load
    try {
      const session = localStorage.getItem('contentscope_session')
      if (session) {
        const { user, userData } = JSON.parse(session)
        setCurrentUser(user)
        setUserData(userData)
      }
    } catch (error) {
      console.error('Failed to restore session:', error)
      localStorage.removeItem('contentscope_session')
    }
    
    setLoading(false)
  }, [])

  const value: AuthContextType = {
    currentUser,
    userData,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    logout,
    updateUserProgress,
    incrementAnalysisCount,
    updateStreak,
    refreshUserData
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}