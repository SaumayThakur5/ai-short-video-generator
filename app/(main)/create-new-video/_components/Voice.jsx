import React, {useState} from 'react'

const voiceOptions= [
    {
       "value": "af_sarah",
       "name": "Sarah (Female)"
    },
    {
       "value": "af_sky",
       "name": "Sky (Female)"
    },
      {
       "value": "am_adam",
       "name": "Adam (Male)"
    },
      {
       "value": "hf_alpha",
       "name": "Alpha (Female)"
    }

       
]

function Voice({onHandleInputChange}) {
    const[selectedVoice, setSelectedVoice]= useState();
  return (
    <div className= "mt-5">
        <h2> Video Voice </h2>
        <p className="text-sm text-gray-400"> Select Voice for your video</p>
        <div className='grid grid-cols-2 gap-3'>
            {voiceOptions.map((voice,index) =>(
                <h2 className={`cursor-pinter p-1 dark:bg-slate-900 dark:border-white hover:border ${voice.name==selectedVoice && 'border'}`}
                onClick={() => {setSelectedVoice(voice.name);
                    onHandleInputChange('voice', voice.value);
                }}
                key={index}>{voice.name}</h2>

            ))}
        </div>
    </div>
  )
}

export default Voice