"use client"
import React from 'react'
import Image from 'next/image';
import Authentication from './Authentication';
import {useAuthContext} from '../provider';
import {Button} from '../../components/ui/Button';
import Link from 'next/link';

function Header() {
  const {user}= useAuthContext();
  return (
    <div className="flex justify-between items-center">
  <div className="flex items-center gap-3">
        <Image 
        src='/logo.svg'
        alt="logo"
        width={50}
        height={50} 
        />
        <h2 className="text-2xl font-bold">Video Gen</h2>

       </div>
       <div>
        {!user ? <Authentication>
        <button>Get Started</button>
        </Authentication>
        : <div className='flex items-center gap-3'>
          <Link href={'./dashboard'}>
          <Button>Dashboard </Button>
          </Link>
         {user?.photoURL && (
  <Image
    src={user.photoURL}
    alt="userImage"
    width={40}
    height={40}
    className="rounded-full"
  />
)}

        </div>}
        </div>
    </div>
  )
}

export default Header;