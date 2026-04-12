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

return (
    <div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4'>
        <div className='flex justify-between items-center px-6py-4 border-b border-gray-700'>
            <h2 className='text-white font-bold text-lg'>🤖 AI Meeting summary</h2> 
            <button onClick={onclose} className='text-gray-400 hover:text-white transition-colors'>
                <svg className='w-5 h-5 fill="none" stroke="currentColor" veiwBox="0 0 24 24'>
                    <path strokeLinecap='round strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12'/>
                </svg>
            </button>
        </div>
    </div>
)