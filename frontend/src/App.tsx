import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import LandingPage from './pages/LandingPage'
import ContentInput from './pages/ContentInput'
import AnalysisDashboard from './pages/AnalysisDashboard'
import PlatformAdaptation from './pages/PlatformAdaptation'
import LearningInsights from './pages/LearningInsights'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/analyze" element={<ContentInput />} />
                <Route path="/dashboard" element={<AnalysisDashboard />} />
                <Route path="/adapt" element={<PlatformAdaptation />} />
                <Route path="/learn" element={<LearningInsights />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  )
}

export default App