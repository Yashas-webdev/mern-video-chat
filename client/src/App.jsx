import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import RoomPage from './pages/RoomPage'
import ProtectedRoute from './components/atoms/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute><HomePage/></ProtectedRoute>
          } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/room/:roomId" element={
          <ProtectedRoute>
            <RoomPage/>
          </ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App