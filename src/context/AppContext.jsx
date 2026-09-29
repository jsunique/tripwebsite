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




export  const AppContext = createContext(null);
export default function AppProvider({children}){
  const [state , dispatch] = useReducer(appReducer , initialState)
  return(
    <AppContext.Provider value={{state , dispatch}}>
      {children}
    </AppContext.Provider>
  )
}