import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'
import useAuthStore from '../store/useAuthStore'

const HomePage = () => {
  const [roomId, setRoomId] = useState('')
  const user = useAuthStore(state => state.user)
  const logout = useAuthStore(state => state.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleCreateRoom = () => {
    const newRoomId = uuidv4()
    navigate(`/room/${newRoomId}`)
  }

  const handleJoinRoom = (e) => {
    e.preventDefault()
    if (roomId.trim()) {
      navigate(`/room/${roomId.trim()}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-400">VideoChat</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <span className="text-gray-300 text-sm">{user?.username}</span>
          </div>
          <button
            onClick={handleLogout}
            className="border border-gray-700 hover:border-red-500 hover:text-red-400 text-gray-400 text-sm px-4 py-2 rounded-xl transition-all"
          >
            Sign out
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-3xl mx-auto mt-16 px-4 text-center">
        <h2 className="text-5xl font-bold mb-4">
          Video calls made
          <span className="text-blue-400"> simple</span>
        </h2>
        <p className="text-gray-400 text-lg mb-12">
          Create a room or join an existing one. No downloads required.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-3xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Create Room Card */}
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl hover:border-blue-500 transition-all">
          <div className="w-12 h-12 bg-blue-600 bg-opacity-20 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.361a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">New Meeting</h3>
          <p className="text-gray-400 text-sm mb-6">
            Start a new video call and share the room ID with others to invite them.
          </p>
          <button
            onClick={handleCreateRoom}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold p-3 rounded-xl transition-all"
          >
            Create Room
          </button>
        </div>

        {/* Join Room Card */}
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl hover:border-green-500 transition-all">
          <div className="w-12 h-12 bg-green-600 bg-opacity-20 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Join Meeting</h3>
          <p className="text-gray-400 text-sm mb-6">
            Enter a room ID to join an existing video call instantly.
          </p>
          <form onSubmit={handleJoinRoom} className="flex flex-col gap-3">
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter Room ID"
              className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-600"
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold p-3 rounded-xl transition-all"
            >
              Join Room
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default HomePage