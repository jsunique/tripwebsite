import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import countries from '../data/countries.json'
import {Heart} from 'lucide-react'

export default function CountryDetail() {
  const [liked , setLiked] = useState(false);
  const {countryName} = useParams();
  const [loading , setLoading] = useState(true);
  const singleCountry = countries.find((country)=>{
    return country.name === countryName;
  })
  return (
    <>
    <p className='text-center mt-10 w-full bg-primary text-primary-content font-header text-5xl'>{countryName}</p>
    {
      loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="loading loading-spinner text-primary" />
        </div>
      )
    }
  <div className={`flex flex-col w-full max-w-150 mx-auto ${loading ? 'hidden' : 'flex'} `}>
    <img onLoad={()=>setLoading(false)} src={singleCountry.image} className='w-full  max-h-80  mt-5 object-cover' alt="" />
    <div className='flex w-full h-auto mt-2 px-1 justify-between'>
      <Heart className={`text-primary scale-125 cursor-pointer  transition-all duration-300
        ${liked ? 'fill-primary text-primary ' : ''}`} onClick={()=>setLiked(!liked)} size={35} />
    </div>
    </div>
    </>
  )
}
