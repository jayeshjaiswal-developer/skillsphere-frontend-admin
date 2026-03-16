"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


export default function Login() {
    return (
        <div className='h-screen' style={{ backgroundColor: 'rgba(188,233,253,255)' }}>
            <div className='w-[420px]  bg-white fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] pb-[30px]'>
                <form onSubmit={(event)=>{event.preventDefault()}} className="flex flex-col gap-[20px] p-[20px]">
                    <Image src='/images/hz-skillsphere-logo.png' alt='skillsphere-hz-logo' width={200} height={100} />
                    <h1>Sign in to continue</h1>
                    <input className='border border-2 w-full h-[40px] p-[10px] outline-none' placeholder='Username' type='text' />
                    <input className='border border-2 w-full h-[40px] p-[10px] outline-none' placeholder='Password' type='password' />
                    <Link href={"/dashboard"}><button className='text-white text-[20px] w-full p-[10px]' style={{ backgroundColor: 'rgba(116,86,234,255)' }}>Submit</button></Link>
                    <div className='flex justify-between'>

                        <div className='flex gap-[10px]'>
                            <input type='checkbox' className={`checked:relative checked:before:text-[rgba(116,86,234,255)] checked:before:block checked:before:text-center  w-[20px] h-[20px] appearance-none checked:before:content-['✔']`} style={{ border: '1px solid rgba(116,86,234,255)' }} />
                            <h1 className='text-gray-500'>Keep me signed in</h1>
                        </div>
                        <h1 className='text-blue-500'>Forgot password?</h1>
                    </div>
                </form>
            </div>
        </div>
    )
}
