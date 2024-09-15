import React from 'react'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div className=' w-full h-full '>
      <div className=' min-w-full min-h-full'>  <Outlet></Outlet> </div>
    </div>
  )
}

export default App