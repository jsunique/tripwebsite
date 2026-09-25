import { useState } from "react"
function App() {
  const [them , setThem] = useState('light')
  return (
    <div data-them={them} className="bg-base-100 h-screen">
    </div>
  )
}

export default App
