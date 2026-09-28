import React, { useState } from 'react'
import Globe from './Globe'
import {ListFilter, Search} from 'lucide-react'
import countries from '../data/countries.json'

export default function Section() {
  const [input , setInput] = useState("");
  const [openModal , setOpenModal] = useState(false);
  const filteredList = countries.filter((country)=>{
    const countryName = country.name.toLowerCase();
    return countryName.includes(input.toLowerCase())
  })
  console.log(input);
  return (
    <>
      <div className='flex flex-col  md:flex-row md:gap-25 md:mt-10'>
        <div className='flex-col justify-center md:items-center md:flex-1'>
          <div className='flex items-center justify-center gap-1'>
              <div className='bg-base-200 w-[80%] h-10 rounded-[20px] flex justify-center items-center font-pop mb-10 mt-10 border border-primary max-w-60'>
                <input onFocus={()=>setOpenModal(true)} value={input} onChange={(e)=>setInput(e.target.value)} type="text" placeholder='where?' className='outline-none w-full h-full  overflow-hidden px-5' />
                <Search size={30} className='mr-5' />
              </div>
          </div>
            {
                  openModal ? 
                  filteredList.map((country)=>(
                    <div>{country.name}</div>
                  ))
                  : <h1>reza yazdani</h1>
            }
          <h1 className='font-header text-[27px] text-center'>See the world from near</h1>
          <p className='text-center mt-3 font-pop font-normal md:font-medium px-3'>choose country in the map and see<br /> the unique palce of each country to travel</p>
          <p className='pt-14 text-center font-pop font-normal md:font-medium px-3 text-accent'>
            if you want to see a country detail<br /> choose a box or choos from a cards below
          </p>
        </div>
        <Globe />
      </div>
    </>
  )
}
