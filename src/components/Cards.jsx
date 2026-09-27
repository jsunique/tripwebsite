import React, { useEffect, useState } from 'react'
import {Link} from 'react-router'
import countries from '../data/countries.json'

export default function Cards() {
  
  return (
    <>
    <div className='flex items-center justify-center gap-2 pt-2 bg-base-100'>
      <div className='h-px w-[10%] bg-accent '></div>
      <p className='text-center mt-10 font-pop font-medium text- pb-10 md:text-3xl '>Where you want to discovery</p>
      <div className='h-px w-[10%] bg-accent '></div>
    </div>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-base-100 gap-y-15  pb-80'>
      {
        countries.map((country)=>(
          <div key={country.code }className='relative flex  flex-col w-[90%] mx-auto h-50  max-w-90  bg-base-100'>
            <img src={country.image} className='absolute w-full h-full rounded-2xl transition-transform duration-500 ease-out hover:scale-105'  alt={country.name} />
            <p className='flex justify-center items-center absolute bottom-2 h-8 font-pop text-primary-content left-1/2 -translate-x-1/2 bg-primary w-full text-center overflow-hidden font-normal'>{country.name}</p>
            <p className='absolute text-primary-content p-2 rounded-2xl left-1/2 -translate-x-1/2  bg-primary/60 font-pop font-xs text-[12px] '>{country.landmark}</p>
          </div>
        ))
      }
    </div>
    <div className='w-full h-15  flex items-center justify-center gap-5'>
      <button className='btn btn-primary font-bold flex h-8 min-h-0 w-8 items-center justify-center p-0 leading-none'>+</button>
      <p>page</p>
      <button className='btn btn-primary font-bold flex h-8 min-h-0 w-8 items-center justify-center p-0 leading-none'>-</button>
    </div>
    </>
    )
}
