import React from 'react'
import {Plane , SunMedium , Moon ,UserRoundArrowLeft} from 'lucide-react'

export default function Navbar({them , changeTheme}) {
  return (
    <>
      <div className='flex justify-between md:justify-center md:gap-15 md:text-xl items-center px-3 pt-3'>
        <div className='flex flex-row gap-1 items-center'>
          <Plane className='text-primary' />
          <p className='text-primary font-header'>Travel</p>
        </div>
        <button onClick={()=>changeTheme()} className='flex btn rounded-2xl text-primary'>
        {
          them === 'dark' ? 
          <>
          <p>Light Mode</p><SunMedium />
          </>
          :
          <>
          <p>Night Mode</p><Moon />
          </>
        } 
        </button>
        <button  className='flex btn rounded-2xl text-primary'>
        <UserRoundArrowLeft />
        </button>
      </div>
      <div className='w-[80%] md:w-[50%] h-px bg-primary mx-auto mt-3'></div>
    </>
  )
}