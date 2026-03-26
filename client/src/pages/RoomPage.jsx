import { useeParams , useNavigate, useParams} from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import useSocket from '../hooks/useSocket'
import useWebRTC from '../hooks/useWebRTC'

const RoomPage = () => {
    const {roomId} = useParams
    const navigate = useNavigate
    const {user} = useAuthStore()
    const socket = useSocket()

    const {
        localVideoRef,
        remoteStreams,
        isMuted,
        isVideoOff,
        toggleMute,
        toggleVideo
    } = useWebRTC(socket, roomId, user?.username)

    const handleLeaveCall = () => {
        if(socket) {
            socket.disconnect()
        }
        navigate('/')
    }

    return(
        <div className="min-h-screen bg-gray-900 flex flex-col">
            <div className='bg-gray-800 px-6 py-3 flex justify-between items-center border-b border-gray-700'>
                <h1 className='text-white font-bold text-lg'>VideoChat</h1>
                <div className='flex items-center gap-3'>
                    <span className='text-gray-400 text-sm'>Room: {roomId}</span>
                    <button
                    onClick={handleLeaveCall}
                    className='bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition-colors'>
                        LeaveCall
                    </button>
                </div>
            </div>
       

        <div className='flex-1 p-4 grid gap-4'
        style={{
            gridTemplateColumns: remoteStreams.length === 0
            ? '1fr'
            : remoteStreams.length === 1
            ? 'repeate(2,1fr)'
            :'repeate(3,1fr)'
        }}></div>

        </div>
    )
}

