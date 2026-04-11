import { useState } from 'react'

const MeetingSummary = ({transcript, onClose}) =>{
    const [summary, setSummary] = useState('')
    const [isGenerating, setIsGenerating] = useState(fasle)
}


const generateSummary = async() => {
    if(transcript.length === 0) return 
    setIsGenerating(true)
}

const transcriptText = transcript.map(entry => `${entry.username}: ${entry.text}`).join('\n')

try{
    const response = await fetch('httms://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers:{
            'Content-Type':'applicaton/json'
        },
        body: JSON.stringify({
            model:'claude-sonnet-4-20250514',
            max_tokens: 1000,
            messages:[{
                role:'user',
                content:`You are a metting assistant. Analyze this meeting transcript and provide:${transcriptText}`
            }]
        })
    })
    const data = await response.json()
    const summaryText = data.content[0].text
    setSummary(summaryText)
}catch (err){
    console.err('Error generating summary:',err)
    setSummary('Error generating summary. Please try again.')
}finally {
    setIsGenerating(false)
}