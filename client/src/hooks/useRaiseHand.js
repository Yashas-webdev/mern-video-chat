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

    
}