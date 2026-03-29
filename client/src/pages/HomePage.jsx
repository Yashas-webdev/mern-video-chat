import { useState } from "react";  
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4} from 'uuid'
import  useAuthStore from '../store/useAuthStore'

const HomePage = () => {
    const [roomId, setRoomId] = useState('')
    const {user, logout} = useAuthStore
    const navigate = useNavigate()

    const handleCreateRoom = () => {
        const newRoomId = uuidv4()
        navigate(`/room/${newRoomId}`)
    }

    const handleJoinRoom = () => {
        e.preventDefault()
        if (roomId.trim()){
            navigate(`/room/${roomId.trim()}`)
        }
    }

    return (
    <div className="min-h-screen bg-gray-900 text-white">

        {/* Navbar */}
      <nav className="bg-gray-800 px-6 py-4 flex justify-between items-center border-b border-gray-700">
        <h1 className="text-xl font-bold text-blue-400">VideoChat</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-300 text-sm">
            Welcome, {console.log('user object', user)}
          </span>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto mt-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-2">
          Start or Join a Video Call
        </h2>
        <p className="text-gray-400 text-center mb-12">
          Create a new room or join an existing one
        </p>

        {/* Create Room */}
        <div className="bg-gray-800 p-8 rounded-xl mb-6">
          <h3 className="text-xl font-semibold mb-2">Create a New Room</h3>
          <p className="text-gray-400 text-sm mb-4">
            Start a new video call and invite others
          </p>
          <button
            onClick={handleCreateRoom}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition-colors"
          >
            Create Room
          </button>
        </div>

        {/* Join Room */}
        <div className="bg-gray-800 p-8 rounded-xl">
          <h3 className="text-xl font-semibold mb-2">Join Existing Room</h3>
          <p className="text-gray-400 text-sm mb-4">
            Enter a room ID to join an existing call
          </p>
          <form onSubmit={handleJoinRoom} className="flex gap-3">
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter Room ID"
              className="flex-1 bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Join
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default HomePage
