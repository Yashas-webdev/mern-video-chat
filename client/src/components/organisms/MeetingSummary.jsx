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


    <div className='flex-1 overflow-y-auto px-6 py-4'>
        {transcript.length === 0 ? (
            <p className='text-gray-400 text-sm text-center py-8'>
                No transcript available. Start speaking to record the meeting.
            </p>
        ): (
            <div className='space-y-2 mb-4'>
                <h3 className='text-gray-300 text-sm font-medium mb-3'>
                    Transcipt ({transcript.lenth} entries)
                </h3>
                {transcript.map((entry,index)=>(
                    <div key={index} className='flex gap-2'>
                        <span className='text-blue-400 text-xs font-medium min-w-20'>
                            {entry.username}
                        </span>
                        <span className='text-gray-300 text-xs'>{entry.text}</span>
                        </div>
                ))}
                </div>
        )}

        <div className='px-6 py-4 border-t border-gray-700 flex-gap-3'>
            <button
              onClick={generateSummary}
              disabled={isGenerating || transcript.length === 0}
              className='flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold p-3 rounded-xl transition-all flex items-center justify-center gap-2'>
                {isGenerating ? (
                    <>
                       <svg className='animate-spin h-4 2-4' viewBox='0 0 24 24' fill='none'>
                        <circle className='opacity-25' cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className='opacity-25' fill='currentColor' d="M412a8 8 0 018-8v8z"/>
                       </svg>
                       Gnerating...
                    </>
                ): '🤖 Genearting AI Summary'}
              </button>
              {summary && (
                <button 
                   onClick={()=>navigator.clipboard.writeText(summary)}
                   className='bg-gray-700 hover:bg-gray-600 text-white px-4 rounded-xl transition-all'>
                    Copy
                   </button>
              )}
         </div>
     </div>
    </div>

)

export default MeetingSummary