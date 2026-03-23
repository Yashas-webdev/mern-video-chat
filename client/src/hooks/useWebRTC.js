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

    const createPeerConnection = useCallback((socketId)=>{
        const pc = new RTCPeerConnection(ICE_SERVERS)  // Creates a brand new WebRTC connection using the browser's built-in `RTCPeerConnection` API. We pass our STUN servers config so WebRTC knows how to find public IP addresses.
    

    pc.onicecandidate = (event) => { //This is an event handler that fires automatically every time WebRTC finds a new network path (ICE candidate) to reach the other person.

        if(event.candidate && socket){
            socket.emit('ice-candidate',{
                candidate:event.candidate,
                to:socketId
            })
        }
    }

    pc.ontrack = (event) => {
        setRemoteStreams(prev => {
            const exists = prev.find(s => s.socketId === socketId)
            if(exists) return prev
            return [...prev, {socketId, stream:event.streams[0]}]
        })
    }

    if(localStreamRef.current){
        localStreamRef.current.getTracks().forEach(track => {
            pc.addTrack(track, localStreamRef.current)
        })
    }

    peerConnectionsRef.current[socketId] = pc
    return pc
    },[socket])


    useEffect(()=>{
        if(!socket || !roomId) return 

        const initializeRoom = async() => {
            await getLocalStream()
            socket.emit('join-room',{roomId, username})
        }
        initializeRoom()
    })

    socket.on('users-in-room', async(users) =>{
        for(const user of users) {
            const pc = createPeerConnection(user.socketId)
            const offer = await pc.createOffer()
            await pc.setLocalDescription(offer)
            socket.emit('offer',{offer, to:user.socketId})
        }

    })

    socket.on('user-joined',async({socketId})=>{
        createPeerConnection(socketId)
    })
}