import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { UserContext } from '../MainContext'

export default function Header() {
  let {setClickedList, setSubClickedList}  = useContext(UserContext);
  
  return (
    <div className='sticky bg-white z-[99] top-0'>
        <div className='shadow-lg flex justify-between items-center px-[40px]'>
            <Link href={'/dashboard'}><Image onClick={()=>{setClickedList(''), setSubClickedList('')}} src={'/images/hz-skillsphere-logo.png'} alt='header-logo' width={220} height={100} /></Link>
            <Image src={'/images/profile-logo.png'} alt='profile-logo' width={40} height={40} />
        </div>
    </div>
  )
}
