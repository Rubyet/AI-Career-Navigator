import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import JobSearch from './pages/JobSearch'
import ApplicationTracker from './pages/ApplicationTracker'
import StudyArea from './pages/StudyArea'
import Profile from './pages/Profile'
import Login from './pages/Login'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="jobs" element={<JobSearch />} />
        <Route path="applications" element={<ApplicationTracker />} />
        <Route path="study" element={<StudyArea />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App
