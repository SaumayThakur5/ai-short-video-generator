"use client"
import React from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import Image from 'next/image';
import { useAuthContext } from '@/app/provider'

function AppHeader() {
  const { user } = useAuthContext();

  return (
    <div className='p-3 flex justify-between items-center'>
      <SidebarTrigger />
      {user?.photoURL && user.photoURL.trim() !== "" ? (
        <Image
          src={user.photoURL}
          alt='user'
          width={40}
          height={40}
          className='rounded-full'
        />
      ) : (
        <div className='w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center'>
          <span className='text-white text-sm'>{user?.displayName?.[0] || 'U'}</span>
        </div>
      )}
    </div>
  )
}

export default AppHeader
