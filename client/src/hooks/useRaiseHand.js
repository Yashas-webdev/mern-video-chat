import {useSate, useEffect} from 'react'

const useRaiseHand = (socket,roomId,username) =>{
    const [handQueue,setHandQueue] = useState([])   //to stores the array of all users who have rasied their hands.
    const [isHandRaised,setIsHandRaised] = useState(false)  // Tracks if the CURRENT user has their hand raise. Used to show the correct button state- raised or lowered
    const [canSpeak,setCanSpeak] = useState(false)  // When the host allows you to speak this beomes true- triggers a notificatin popup saying"You can speak now!"

    useEffect(()=>{
        if(!socket) return

        socket.on('hand-queue-updated',(queue)=>{
            setHandQueue(queue)

        })

        socket.on('you-can-speak',()=>{
            setCanSpeak(true)
            setIsHandRaised(false)
            setTimeout(()=>setCanSpeak(false),5000)
        })
        
        return () =>{
            socket.off('hand-queue-updated')
            socket.off('you-can-speak')
        }
    },[socket])

    const raisehand = () =>{
        if(!socket || isHandRaised) return
        socket.emit('raise-hand',{roomId, username})
        setIsHandRaised(true)
    }

    const lowerhand = () =>{
        if(!socket || !isHandRaised) return
        socket.emit('lower-hand',{roomId})
        setIsHandRaised(false)
    }

    const allowToSpeak = (targetSocketId) =>{
        if(!socket) return
        socket.emit('allow-to-speak',{roomId,targetSocketId})
    }

    return {
        handQueue,
        isHandRaised,
        canSpeak,
        raisehand,
        lowerhand,
        allowToSpeak
    }
}

export default useRaiseHand