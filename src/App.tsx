import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SunsetPage from './pages/SunsetPage'
import AboutPage from './pages/AboutPage'
import MembershipPage from './pages/MembershipPage'
import ClassesPage from './pages/ClassesPage'
import ClassSchedule from './components/Calendar/ClassSchedule'
import ClassDetail from './pages/ClassDetail'

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/sunset" element={<SunsetPage />} />
        <Route path="/kmc-schedule" element={<ClassSchedule />} />
        <Route path="/classes/:className" element={<ClassDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
