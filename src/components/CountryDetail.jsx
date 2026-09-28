import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import countries from '../data/countries.json'
import {Heart , Plane} from 'lucide-react'

export default function CountryDetail() {
  const [position , setPosition] = useState([]);
  const [liked , setLiked] = useState(false);
  const [trip , setTrip] = useState(false);
  const {countryName} = useParams();
  const [loading , setLoading] = useState(true);
  const singleCountry = countries.find((country)=>{
    return country.name === countryName;
  });
  const countryPosition = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(singleCountry.name)}&format=jsonv2&limit=1`;
  const sendRequest = async()=>{
    const request = await fetch(countryPosition);
    const response = await request.json();
    setPosition([response[0].lon , response[0].lat])
  }
  useEffect(()=>{
    sendRequest();
  },[])
  return (
    <>
    <p className='text-center mt-10 w-full bg-primary text-primary-content font-header text-3xl'>{countryName}</p>
    {
      loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="loading loading-spinner text-primary" />
        </div>
      )
    }
  <div className={` flex flex-col w-full max-w-150 mx-auto ${loading ? 'hidden' : 'flex'} `}>
    <img onLoad={()=>setLoading(false)} src={singleCountry.image} className='w-full  max-h-80  mt-5 object-cover' alt="" />
    <div className='w-full max-w-150 mx-auto flex  h-auto items-center gap-3'>
      <Heart className={`text-primary  cursor-pointer  transition-all duration-300
        ${liked ? 'fill-primary text-primary ' : ''}`} onClick={()=>setLiked(!liked)} size={30} />
      <Plane className={`text-primary  cursor-pointer  transition-all duration-300
      ${trip ? 'fill-primary text-primary ' : ''}`} onClick={()=>setTrip(!trip)} size={30} />
      <h2 className='min-w-0 flex-1 px-3  font-pop font-semibold text-xl'>{singleCountry.landmark}</h2>
    </div>
    </div>
    </>
  )
}
