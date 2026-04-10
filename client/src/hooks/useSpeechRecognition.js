import { useState, useEffect, useRef} from 'react'

const useSpeechRecognition = (socket, roomId, username) =>{
    const recognitioReft = useRef(null)
    const [isListening, setIsListening] = useState(false)
    const [localTranscript, setLocalTranscript] = useState([])

    useEffect(()=>{
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        if(!SpeechRecognition){
            console.log("Speech recognition not supported in this browser");
            return
        }

        const recognition = new SpeechRecognition()
        recognition.continous = true,
        recognition.interimResults = false,
        recognition.lang = 'en-Us'

        recognition.onresult = (event) =>{
            const lastResult = event.results[event.results.length - 1]
            const text = lastResult[0].transcript.trim()
            if(text && socket){
                const entry = {
                    username, text, timestamp: Date.now()}
                    setLocalTranscript(prev => [...prev, entry])
                    socket.emit('transcript-update',{roomId, username, text})
            }
        }

        recognition.onerror = (event) => {
            console.log('Speech recognition error:',event.error)
            setIsListening(false)
        }

        recognitioReft.current = recognition

        return () => {
            recognition.stop()
        }
    },[socket,roomId,username])

    const startListening = () =>{
        if(recognitionRef.current && !isListening){
            recognitioReft.current.start()
            setIsListening(true)
        }
    }
}