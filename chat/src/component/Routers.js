import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Auth/Login'
import Register from './Auth/Register'
import Index from './Chat/index'
export default function Routers() {
  
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Index />}/>
            <Route exact path="login" element={<Login />}/>
            <Route exact path="register" element={<Register />}/>
        </Routes>
        </BrowserRouter>
    </div>
  )
}
