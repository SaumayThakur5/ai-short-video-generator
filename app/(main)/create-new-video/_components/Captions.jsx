import React, {useState} from 'react'
const options= [
    {
        name: 'Youtuber',
        style: 'text-yellow-400 text-3xl'
    },
     {
        name: 'Superme',
        style: 'text-white text-3xl'
    },
     {
        name: 'Neon',
        style: 'text-green-500 text-3xl'
    },
     {
        name: 'Glitch',
        style: 'text-pink-500 text-3xl'
    }, 
    {
        name: 'Fire',
        style: 'text-red-500 text-3xl'
    }

]

function Captions({onHandleInputChange}) {
    const[selectedCaptionStyle, setSelectedCaptionStyle]= useState();
  return (
    <div className='mt-5'>
        <h2>Captions</h2>
        <p className='text-sm text-gray-400'>Select caption style</p>
         <div className='grid grid-cols-2 gap-3'>
            {options.map((option,index) =>(
              <div key={index} 
              onClick={() => {
                setSelectedCaptionStyle(option.name);
                onHandleInputChange('caption', option);
              }}
              className={`hover:border border-gray-300 cursor-pointer bg-slate-900
              ${selectedCaptionStyle == option.name && 'border'}`}>
                <h2 className={option.style}>{option.name}</h2>

             </div>

            ))}
        </div>
    </div>
  )
}

export default Captions