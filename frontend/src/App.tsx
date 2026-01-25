import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import ContentInput from './pages/ContentInput'
import AnalysisDashboard from './pages/AnalysisDashboard'
import PlatformAdaptation from './pages/PlatformAdaptation'
import LearningInsights from './pages/LearningInsights'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/analyze" element={<ContentInput />} />
        <Route path="/dashboard" element={<AnalysisDashboard />} />
        <Route path="/adapt" element={<PlatformAdaptation />} />
        <Route path="/learn" element={<LearningInsights />} />
      </Routes>
    </Layout>
  )
}

export default App