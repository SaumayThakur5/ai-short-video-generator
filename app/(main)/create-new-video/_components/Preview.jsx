import React from 'react'
import Image from 'next/image'
// Import your options from the correct location
// Replace this with the actual path to your options
import { options } from './VideoStyle'; // Adjust this path as needed

function Preview({formData}) {
    const selectVideoStyle = formData && options.find((item => item?.name == formData?.videoStyle));
    
    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            {selectVideoStyle?.image && (
                <div className="relative w-full max-w-[280px] aspect-[9/16] mx-auto overflow-hidden rounded-lg bg-black">
                    <Image 
                        src={selectVideoStyle.image}
                        fill
                        className='object-contain'
                        alt={selectVideoStyle.name || 'Video style preview'}
                    />
                    {/* Caption overlay */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center px-2 z-10">
                        <h2 className={`${formData?.caption?.style || 'text-white text-2xl'} drop-shadow-lg`}>
                            {formData?.caption?.name || 'No caption selected'}
                        </h2>
                    </div>
                </div>
            )}
            {!selectVideoStyle?.image && (
                <div className="w-full max-w-[280px] aspect-[9/16] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mx-auto">
                    <div className="text-center">
                        <p className="text-gray-500">No preview available</p>
                        {formData?.caption?.name && (
                            <h2 className={formData.caption.style || 'text-gray-700 text-2xl'}>
                                {formData.caption.name}
                            </h2>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Preview