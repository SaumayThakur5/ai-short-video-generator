import React from 'react'
import { Button } from '@/components/ui/button';
import Authentication from './Authentication';
function Hero() {
  return (
    <div className='p-10 flex flex-col items-center justify-center mt-10'>
        <h2 className="font-bold text-5xl text-center">AI Short Video Generator</h2>
        <p className= "mt-4 text-2xl text-center text-gray-500">Generate short, captivating videos using AI, perfect for social media and creative projects in minutes.</p>
        <div className= "flex mt-7 gap-8">
        <Button size="lg" className="bg-black text-white"> Explore </Button>
        <Authentication>
        <Button size="lg" className="bg-white text-black hover:bg-gray-200">Get Started</Button>
        </Authentication>
           
        </div>
    </div>
  )
}

export default Hero