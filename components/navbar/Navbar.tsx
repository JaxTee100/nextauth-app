'use client'
import { SessionProvider } from 'next-auth/react'
import Userbutton from '../Userbutton'

const Navbar = () => {
  return (
    <div className='flex justify-between px-8 py-4'>
        <div>
            <h1 className='lg:text-3xl text-center'>عون للتأمين</h1>
            <p className='text-xs text-center'>Affordable Health Insurance</p>
        </div>
        <div>
        <SessionProvider>
            <Userbutton />
        </SessionProvider>
        </div>
    </div>
  )
}

export default Navbar