import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useStore from '../store/GeneralStore'

export default function ProtectedRoute({ admin, children }) {
  const location = useLocation()
  const user = useStore((state) => state.user)
  if (admin && user.tipo != 0) {
    return <Navigate to="/" state={{ location }} />
  }
  return children
}
