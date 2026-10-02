import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'


export default function Profile() {
  const {state , dispatch } = useContext(AppContext);
  const currentUser = state.users[state.currentUserId];
  const [activeTab , setActiveTab] = useState("favorites");
  const favorites = currentUser?.likes ?? [];
  const trips = Object.keys(currentUser?.trips ?? {});
  return (
    <>
    <div className='w-[70%] h-10 bg-base-300 mx-auto mt-5 rounded-3xl flex max-w-60'>
      <button onClick={()=>setActiveTab('favorites')} className={`cursor-pointer hover:opacity-95 rounded-2xl  h-full w-1/2  font-pop${activeTab==="favorites" ? ' bg-primary text-primary-content'  : 'bg-base-100 text-base-content' }`}>Favorites</button>
      <button onClick={()=>setActiveTab('trip')} className={`cursor-pointer hover:opacity-95  rounded-2xl  h-full w-1/2  font-pop ${activeTab==="trip" ? 'text-primary-content bg-primary'  : 'bg-base-100 text-base-content' }`}>My trip</button>
    </div>
        {
          activeTab === 'favorites' ? 
            <div>vahid yazdani</div>
            :
            <div>reza yazdani</div>
        }
    </>
  )
}
