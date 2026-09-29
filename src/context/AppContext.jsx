import { createContext, useReducer , useEffect } from "react";
const initialState = {
  currentUserId : null,
  users:{}
};
function appReducer(state,action) {
  if (action.type === "TOGGLE_TRIP_COUNTRY") {
    const userId = state.currentUserId;
    if (!userId) {
      return state;
    }
    const currentUser = state.users[userId];
    if (!currentUser) {
      return state;
    }
    const countryName = action.payload;
    const currentTrip = currentUser.trip ?? {
      countries: [],
      companions: [],
      budget: 0,
      expenses: [],
      activities: [],
    };
    const alreadyAdded = currentTrip.countries.includes(countryName);
    const updatedCountries = alreadyAdded ? currentTrip.countries.filter(
      (name) => name !== countryName
    )  :
    [...currentTrip.countries, countryName];
    return {
      ...state,
      users:{
        ...state.users,
        [userId] : {
          ...currentUser,
          trip:{
            ...currentTrip,
            countries:updatedCountries,
          }
        }
      }
    }
    
  }
  if (action.type === "LOGIN") {
    const userId = action.payload.trim().toLowerCase();
    if (!userId) {
      return state;
    }
    const existingUser = state.users[userId];
    const user = existingUser ??{
      likes : [],
      trip : null,
    }

    return{
      ...state,
      currentUserId:userId,
        users: {
          ...state.users,
          [userId] :user,
        }
    };
  }
  if (action.type === "LOGOUT") {
    return {
      ...state,
      currentUserId:null,
    }
  }
  return state;
}



function getInitialState(){
  const savedState = localStorage.getItem("travel-app-state");
  if (savedState) {
    return JSON.parse(savedState)
  }
  else{
    return initialState
  }
}

export  const AppContext = createContext(null);
export default function AppProvider({children}){
  const [state , dispatch] = useReducer(appReducer , initialState ,getInitialState);
  useEffect(()=>{
  const savedAsText = JSON.stringify(state);
  localStorage.setItem("travel-app-state",savedAsText)
},[state])
  return(
    <AppContext.Provider value={{state , dispatch}}>
      {children}
    </AppContext.Provider>
  )
}