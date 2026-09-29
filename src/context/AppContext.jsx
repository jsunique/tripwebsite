import { createContext, useReducer } from "react";
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
    return{
      ...state,
      currentUserId:userId,
    };
  }
  return state;
}




export  const AppContext = createContext(null);
export default function AppProvider({children}){
  const [state , dispatch] = useReducer(appReducer , initialState)
  return(
    <AppContext.Provider value={{state , dispatch}}>
      {children}
    </AppContext.Provider>
  )
}