import React from 'react'

export default function Section() {
  return (
    <>
      <div className='flex flex-col  md:flex-row md:gap-25'>
        <div className='flex-col justify-center md:items-center md:flex-1'>
          <div className='flex items-center justify-center'>
              <div className='h-px w-[10%] bg-accent md:hidden'></div>
           <p className='text-accent text-center mt-10 font-pop font-medium text-[15px] pb-3'>The Travel Will Start Here</p>
              <div className='h-px w-[10%] bg-accent md:hidden'></div>
          </div>
          <h1 className='font-header text-[27px] text-center'>See the world from near</h1>
          <p className='text-center mt-3 font-pop font-normal md:font-medium px-3'>choose country in the map and see<br /> the unique palce of each country to travel</p>
        </div>
        <div className='flex-1 mt-10'>vahid yazdani</div>
      </div>
    </>
  )
}
