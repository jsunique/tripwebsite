import { useState } from "react"
import Navbar from "./components/Navbar"


function App() {
  const [them , setThem] = useState('light')
  function changeTheme(){
    setThem(current => current === "dark" ? 'light' : 'dark')
  }
  return (
    <div data-theme={them} className="bg-base-100 h-screen">
      <Navbar them={them} changeTheme={changeTheme} />
    </div>
  )
}

export default App
