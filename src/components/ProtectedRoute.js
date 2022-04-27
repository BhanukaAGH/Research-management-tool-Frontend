import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth)
  if (!user) {
    return <Navigate to={'/login'} />
  }
  return children
}

export default ProtectedRoute
