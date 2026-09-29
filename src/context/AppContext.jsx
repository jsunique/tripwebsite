import { createContext, useReducer , useEffect } from "react";
const initialState = {
  currentUserId : null,
  users:{}
};
function appReducer(state,action) {
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