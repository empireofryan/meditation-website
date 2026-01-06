import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SunsetPage from './pages/SunsetPage'
import ClassSchedule from './components/Calendar/ClassSchedule'
import ClassDetail from './pages/ClassDetail'

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sunset" element={<SunsetPage />} />
        <Route path="/kmc-schedule" element={<ClassSchedule />} />
        <Route path="/classes/:className" element={<ClassDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
