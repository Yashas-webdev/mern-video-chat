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
        }}>

            <div className='relative bg-gray-800 rounded-xl overflow-hidden aspect-video'>
                <video 
                   ref={localVideoRef}
                   autoPlay
                   muted
                   playsInline
                   className='w-full h-full object-cover'
                   />
                   <div className='absolute bottom-2 left-2b-black bg-opacity-50 text-white text-xs px-2 py-1 rounded'>
                    You ({user?.username})
                   </div>
            </div>



        
        {remoteStreams.map(({socketId, stream})=>(
            <div key={socketId} className='relative bg-gray-800 rounded-xl overflow-hidden aspect-video'>
                <video 
                   autoPlay
                   playsInline
                   className='w-full h-full object-cover'
                   ref={el => {
                    if(el) el.srccObject = stream
                   }}
                   />
                   <div className='absolute bottom-2 left-2 bg-black bg-opacity-50 text=xs px-2 py-1 rounded'>
                    Remote User
                   </div>
                   </div>
        ))}
        </div>

             <div className='bg-green-800 px-6 py-4 flex justify-center items-center gap-6 border-gray-700'>
                <button
                    onClick={toggleMute}
                    className={`p-4 rounded-full text-white font-semibold transition-colors ${
                        isMuted
                        ? 'bg-red-600 hover:bg-red-700'
                        :'bg-gray-600 hover:bg-gray-500'
                    }`}
                    >
                        {isMuted ? 'Unmute' : 'Mute'}
                    </button>

                <button
                  onClick={toggleVideo}
                  className={`p-4 rounded-full text-white font-semibold transition-colors ${
                    isVideoOff
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                >
                    {isVideoOff ? 'Start Video' : 'Stop Video'}
                </button>

                <button
                 onClick={handleLeaveCall}
                 className='p-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors'
                >
                   Leave
                </button>
             </div>
        </div>
    )
}

export default RoomPage

