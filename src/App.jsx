import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppProvider from './context/AppProvider'
import AllRoutes from './AllRoutes'

function App() {


  return (
    <>
   <AppProvider>
      <AllRoutes/>
   </AppProvider>
         
   
    </>
  )
}

export default App
