'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Loader } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

const Userbutton = () => {

    const router = useRouter();
    const {data: session, status} = useSession();

    if(status === 'loading'){
        return (
            <Loader className='size-6 mr-4 mt-4 float-right  animate-spin' />
        )
    }
    const avatarFallback = session?.user?.name?.charAt(0).toUpperCase();

    const handleSignOut = async () =>{
        await signOut({
            redirect: false,
            
        })
        router.push('/')
    }
  return (
    <nav>
        {
            session ? (
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger className=' outline-none relative float-right p-2 md:p-4 border-2 border-red-500'>
                        <div className='flex gap-4 items-center'>
                            <span>{ session.user?.name}</span>
                            <Avatar className='flex items-center justify-center size-10 hover:opacity-75 transition'>
                                <AvatarImage 
                                    className='size-10 hover:opacity-75 transition'
                                    src={session.user?.image || undefined}
                                />
                                <AvatarFallback className='bg-sky-900 text-white  p-2'>
                                    { avatarFallback}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='center' side='bottom' className='w-50'>
                        <DropdownMenuItem className='cursor-pointer  h-10' onClick={() =>handleSignOut()}>
                            Log Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <div className='flex justify-end p-4 gap-4 font-semibold'>
                    {/* <Button className='bg-red-600'>
                        <Link href='/signin'>Sign In</Link>
                    </Button>
                    <Button>
                        <Link href='/signup'>Sign Up</Link>
                    </Button> */}
                    Already a member?<Link href='/sign-in' className='text-sky-700 hover:text-sky-400'>Login</Link>
                </div>
            )
        }
    </nav>
  )
}

export default Userbutton