import React from 'react'
import VideoList from './_components/VideoList'

function Dashboard() {
  return (
    <div className='font-bold text-3xl'>
      My Videos
      <VideoList />
    </div>
  )
}

export default Dashboard