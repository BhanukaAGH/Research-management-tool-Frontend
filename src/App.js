import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<div>NotFound</div>} />
      </Routes>
    </>
  )
}

export default App
