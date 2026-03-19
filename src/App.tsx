import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SunsetPage from './pages/SunsetPage'
import AboutPage from './pages/AboutPage'
import MembershipPage from './pages/MembershipPage'
import ClassesPage from './pages/ClassesPage'
import ClassSchedule from './components/Calendar/ClassSchedule'
import ClassDetail from './pages/ClassDetail'
import AnnouncementBanner from './components/AnnouncementBanner'
import ScrollToTop from './components/ScrollToTop'
import GradientsPage from './pages/GradientsPage'
import HomepagesPage from './pages/HomepagesPage'
import TextGradientsPage from './pages/TextGradientsPage'
import GrayGradientsPage from './pages/GrayGradientsPage'
import FPResourcesPage from './pages/FPResourcesPage'

function App() {
  return (
    <BrowserRouter basename="/">
      <ScrollToTop />
      <AnnouncementBanner />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/sunset" element={<SunsetPage />} />
        <Route path="/kmc-schedule" element={<ClassSchedule />} />
        <Route path="/classes/:className" element={<ClassDetail />} />
        <Route path="/gradients" element={<GradientsPage />} />
        <Route path="/homepages" element={<HomepagesPage />} />
        <Route path="/text-gradients" element={<TextGradientsPage />} />
        <Route path="/gray-gradients" element={<GrayGradientsPage />} />
        <Route path="/fp-resources" element={<FPResourcesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
