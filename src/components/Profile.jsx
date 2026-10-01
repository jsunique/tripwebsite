import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'


export default function Profile() {
  const {state , dispatch } = useContext(AppContext);
  const currentUser = state.users[state.currentUserId];
  return (
    <>
    <p>{state.currentUserId}</p>
    <p>{currentUser?.likes[2] ?? "there is nothing to show"}</p>
    <p>{currentUser?.trip.countries[0] ?? "thiere is no country to travel"}</p>
    </>
  )
}
