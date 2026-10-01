import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'


export default function Profile() {
  const {state , dispatch } = useContext(AppContext);
  const currentUser = state.users[state.currentUserId];
  return (
    <>
    <div className='w-[70%] h-10 bg-base-300 mx-auto mt-5 rounded-3xl flex max-w-60'>
      <button className='rounded-2xl bg-primary h-full w-1/2 text-primary-content font-pop'>Favorites</button>
      <button className='rounded-2xl  h-full w-1/2 text-base-content font-pop'>My trip</button>
    </div>
    </>
  )
}
