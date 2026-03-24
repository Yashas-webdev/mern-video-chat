import { useeParams , useNavigate, useParams} from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import useSocket from '../hooks/useSocket'
import useWebRTC from '../hooks/useWebRTC'

const RoomPage = () => {
    const {roomId} = useParams
    const nvigate = useNavigate
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
}

