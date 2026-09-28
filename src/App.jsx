import { useState } from "react"
import Navbar from "./components/Navbar"
import Section from "./components/Section"
import Cards from "./components/Cards"


function App() {
  const [them , setThem] = useState('light')
  function changeTheme(){
    setThem(current => current === "dark" ? 'light' : 'dark')
  }
  return (
    <div data-theme={them} className="bg-base-100 h-screen">
      <Navbar them={them} changeTheme={changeTheme} />
      <Section />
      <Cards />
    </div>
  )
}

export default App
