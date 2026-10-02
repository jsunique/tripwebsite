import React, { useContext, useState } from 'react'
import { useParams } from 'react-router'
import { AppContext } from '../context/AppContext'

export default function TripDetail() {
  const {countryName} = useParams();
  const {state , dispatch} = useContext(AppContext);
  const currentUser = state.users[state.currentUserId];
  const [showingInput , setShowingInput] = useState(false);
  const [inputC , setInputC] = useState("");
  const trip = currentUser?.trips?.[countryName];
  const addCompanion = ()=>{
    if (inputC.trim() === "") {
      return
    }
    else{
      dispatch({type:'ADD_COMPANION',payload:{countryName,companionName:inputC}});
      setShowingInput(false);
    };
    setInputC("");
  }
  return (
    <>
    <div className='w-full h-13 flex justify-center items-center bg-primary-content mt-5'>
    <p className='font-header text-2xl'>{countryName}</p>
    </div>
    <div className='grid grid-cols-1 sm:grid-cols-3 items-center'>
      <div className='w-[80%] h-20 bg-base-200 mx-auto rounded-3xl mt-5 flex flex-col px-5 py-3  md:w-60'>
        <p className='text-primary font-pop px-5 text-xl'>Budget:</p>
        <p className='text-primary font-pop px-5 text-2xl'>{trip.budget}</p>
      </div>
      <div className='w-[80%] h-20 bg-base-200 mx-auto rounded-3xl mt-5 flex flex-col px-5 py-3 md:flex-1 md:w-60'>
        <p className='text-primary font-pop px-5 text-xl'>Spent:</p>
        <p className='text-primary font-pop px-5 text-2xl'>{trip.budget}</p>
      </div>
      <div className='w-[80%] h-20 bg-base-200 mx-auto rounded-3xl mt-5 flex flex-col px-5 py-3  md:flex-1 md:w-60'>
        <p className='text-primary font-pop px-5 text-xl'>Remainig:</p>
        <p className='text-primary font-pop px-5 text-2xl'>{trip.budget}</p>
      </div>
    </div>
    <div className='bg-base-200 mx-auto rounded-3xl mt-5 w-[80%] h-auto'>
      <div className='flex justify-between px-5 items-center py-1'>
        <p className='text-primary text-xl'>Companions</p>
        <button onClick={()=>setShowingInput(true)} className='btn btn-primary w-10 h-10 text-xl mt-2'>+</button>
      </div>
      <div className='w-[80%] h-px bg-primary mx-auto mt-3'></div>
              {
         !showingInput && trip.companions.length === 0 &&(
            <p className='text-primary mt-5 text-center pb-5'>No Companions added Yet</p>
          )
        }
        {
          trip.companions.map((name , index)=>(
            <>
            <div key={`${index}-${name}`} className='flex justify-between sm:justify-evenly px-5 pb-3 mt-5 items-center'>
              <p>{name}</p>
              <button onClick={()=> dispatch({type:"REMOVE_COMPANION",payload:{countryName,index}})} className='btn bg-red-400 text-primary-content max-w-20 w-[30%] h-8'>remove</button>
            </div>
            <div className='w-[80%] h-px bg-primary mx-auto'></div>
            </>
          ))
        }



{
  showingInput && (
        <div className='flex flex-col items-center px-3 gap-5 pb-5 mt-5'>
          <input type="text" placeholder='who you want to go with?' className='w-[90%] px-3 outline-none border border-base-content rounded-2xl h-10 max-w-70' value={inputC} onChange={(e)=>setInputC(e.target.value)} />
        <div className='flex justify-evenly'>
          <button onClick={addCompanion} className='btn btn-primary max-w-20 w-[40%] h-10'>accept</button>
          <button onClick={()=>setShowingInput(false)} className='btn bg-red-400 text-primary-content max-w-20 w-[40%] h-10'>cancel</button>
          </div>
        </div>
  )
}





    </div>
      <div className='bg-base-200 mx-auto rounded-3xl mt-5 w-[80%] h-auto'>
      <div className='flex justify-between px-5 items-center py-1'>
        <p className='text-primary text-xl'>Activities</p>
        <button className='btn btn-primary w-10 h-10 text-xl mt-2'>+</button>
      </div>
      <div className='w-[80%] h-px bg-primary mx-auto mt-3'></div>
       {
          trip.activities.length === 0 &&(
            <p className='text-primary mt-5 text-center pb-5'>No Activities added Yet</p>
          )
        }
    </div>
        <div className='bg-base-200 mx-auto rounded-3xl mt-5 w-[80%] h-auto'>
      <div className='flex justify-between px-5 items-center py-1 bg-200'>
        <p className='text-primary text-xl'>Expenses</p>
        <button className='btn btn-primary w-10 h-10 text-xl mt-2'>+</button>
      </div>
      <div className='w-[80%] h-px bg-primary mx-auto mt-3'></div>
      {
          trip.expenses.length === 0 &&(
            <p className='text-primary mt-5 text-center pb-5'>No Expenses added Yet</p>
          )
        }
    </div>

    </>
  )
}
