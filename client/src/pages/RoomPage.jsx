import { useParams, useNavigate } from 'react-router-dom'
import {useState} from 'react'
import useAuthStore from '../store/useAuthStore'
import useSocket from '../hooks/useSocket'
import useWebRTC from '../hooks/useWebRTC'

const RoomPage = () => {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const user = useAuthStore(state => state.user)
  const socket = useSocket()

  const {
    localVideoRef,
    remoteStreams,
    isMuted,
    isVideoOff,
    toggleMute,
    toggleVideo,
    shareScreen,
    stopScreenShare
  } = useWebRTC(socket, roomId, user?.username)
  const [isSharing, setIsSharing] = useState(false)

  const handleLeaveCall = () => {
    if (socket) socket.disconnect()
    navigate('/')
  }

  const handleScreenShare = async () => {
    if(isSharing){
        await stopScreenShare()
        setIsSharing(false)
    }else{
        await shareScreen()
        setIsSharing(true)
    }
  }

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId)
    alert('Room ID copied to clipboard!')
  }

  return (
    <div className="h-screen bg-gray-950 flex flex-col overflow-hidden">

      {/* Navbar */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex justify-between items-center">
        <h1 className=" font-bold text-lg text-blue-400">VideoChat</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={copyRoomId}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 text-xs px-3 py-2 rounded-lg transition-all"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {roomId?.substring(0, 8)}...
          </button>
          <button
            onClick={handleLeaveCall}
            className="bg-red-600 hover:bg-red-500 text-white text-sm px-4 py-2 rounded-lg transition-all font-medium"
          >
            Leave Call
          </button>
        </div>
      </div>

      {/* Video Grid */}
      <div
        className="flex-1 overflow-hidden p-4 grid gap-4"
        style={{
          gridTemplateColumns: remoteStreams.length === 0
            ? '1fr'
            : remoteStreams.length === 1
            ? 'repeat(2, 1fr)'
            : 'repeat(3, 1fr)'
        }}
      >
        {/* Local Video */}
        <div className="relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 h-full">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full max-h-full object-cover"
          />
          {isVideoOff && (
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-3xl font-bold text-white">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
          <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
            You ({user?.username})
          </div>
          {isMuted && (
            <div className="absolute top-3 right-3 bg-red-600 p-1.5 rounded-full">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
              </svg>
            </div>
          )}
        </div>

        {/* Remote Videos */}
        {remoteStreams.map(({ socketId, stream }) => (
          <div key={socketId} className="relative bg-gray-900 rounded-2xl overflow-hidden aspect-video border border-gray-800">
            <video
              autoPlay
              playsInline
              className="w-full h-full object-cover"
              ref={el => { if (el) el.srcObject = stream }}
            />
            <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
              Remote User
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-gray-900 border-t border-gray-800 px-6 py-4 flex justify-center items-center gap-4">

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className={`flex flex-col items-center gap-1 p-4 rounded-2xl transition-all ${
            isMuted
              ? 'bg-red-600 hover:bg-red-500'
              : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
          }`}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMuted
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            }
          </svg>
          <span className="text-white text-xs">{isMuted ? 'Unmute' : 'Mute'}</span>
        </button>

        {/* Camera Button */}
        <button
          onClick={toggleVideo}
          className={`flex flex-col items-center gap-1 p-4 rounded-2xl transition-all ${
            isVideoOff
              ? 'bg-red-600 hover:bg-red-500'
              : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
          }`}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isVideoOff
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.361a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.361a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
            }
          </svg>
          <span className="text-white text-xs">{isVideoOff ? 'Start Video' : 'Stop Video'}</span>
        </button>

        {/* Leave Button */}
        <button
          onClick={handleLeaveCall}
          className="flex flex-col items-center gap-1 p-4 rounded-2xl bg-red-600 hover:bg-red-500 transition-all"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
          </svg>
          <span className="text-white text-xs">Leave</span>
        </button>

        {/*Screen Share button*/}
        <button 
           onClick={handleScreenShare}
           className={`flex flex-col items-center gap-1 p-4 rounded-2xl transition-all ${
            isSharing
              ? 'bg-blue-600 hover:bg-blue-500'
              :'bg-gray-800 hover:bg-gray-700 border border-gray-700'
           }`}
        >
            <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.75 17L9 201-1 1h8l-1-1-.75-3M3 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'/>
            </svg>
            <span className='text-white text-xs'>
                {isSharing ? 'stop Share' : 'Share Screen'}
            </span>
        </button>

      </div>
    </div>
  )
}

export default RoomPage
