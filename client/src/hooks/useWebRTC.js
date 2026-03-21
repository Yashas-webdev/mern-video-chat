import { useEffect, useRef, useState,useCallback } from "react";

const ICE_SERVERS = {
    iceSevers:[
        {urls:'stun:stun.l.google.com:19302'},
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
}