import { useEffect,useRef } from "react";
import {io} from 'socket.io-client'
import useAuthStore from '../store/useAuthStore'

const useSocket = () => {
    const socektRef = useRef(null)
    const {token} = useAuthStore()

    useEffect(()=>{
        if(!token) return
        socektRef.current= io('http://localhost:5000',{
            auth:{token}
        })

    socektRef.current.on('connect',()=>{
        console.log('Socket connected:',socektRef.current.id)
    })

    socektRef.current.on('connect_error',(error)=>{
        console.error('Socket connection error:',error.message)
    })

    return () => {
        if(socektRef.current){
            socektRef.current.disconnect()
            console.log('Socket disconnected')
        }
    }
    },[token])

    return socektRef.current
}

export default useSocket