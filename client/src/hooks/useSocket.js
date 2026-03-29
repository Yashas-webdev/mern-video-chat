import { useEffect, useRef, useState } from "react"
import { io } from 'socket.io-client'
import useAuthStore from '../store/useAuthStore'

const useSocket = () => {
  const [socket, setSocket] = useState(null)
  const token = useAuthStore(state => state.token)

  useEffect(() => {
    if (!token) return

    const newSocket = io('http://localhost:5000', {
      auth: { token }
    })

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id)
    })

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message)
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
      console.log('Socket disconnected')
    }
  }, [token])

  return socket
}

export default useSocket