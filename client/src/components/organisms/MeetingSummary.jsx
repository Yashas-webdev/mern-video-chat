import { useState } from 'react'

const MeetingSummary = ({transcript, onClose}) =>{
    const [summary, setSummary] = useState('')
    const [isGenerating, setIsGenerating] = useState(fasle)
}


const generateSummary = async() => {
    if(transcript.length === 0) return 
    setIsGenerating(true)
}