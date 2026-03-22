import { useEffect, useRef, useState,useCallback } from "react";

const ICE_SERVERS = {
    iceSevers:[
        {urls:'stun:stun.l.google.com:19302'}, //(session traversal utilities for NAT) is a service that tells ylur browser  you pulic IP address
        {urls:'stun:stun1.l.google.com:19302'}
    ]
}

const useWebRTC = (socket, roomId, username) =>{
    const localStreamRef = useRef(null)
    const peerConnectionsRef = useRef({})
    const localVideoRef = useRef(null)
    const [remoteStreams, setRemoteStreams] = useState([])
    const [isMuted, setIsMuted] = useState(false)
    const [isVideOff, setIsVideoOff] = useState(flase)

    const getLocalStream = useCallback(async()=>{
        try{
            const stream = await navigator.mediaDevices.getUserMedia({  //This is the browser's built-in API to request camera and microphone access. It's not React or Socket.io — it's built into every modern browser.

                video : true,
                audio: true
            })

            localStreamRef.current = stream
            if(localVideoRef.current){
                localVideoRef.current.srcObject = stream
            }
            return stream
        }catch(error){
            console.error('Error getting local stream:',error)
        }
        
    },[])
}