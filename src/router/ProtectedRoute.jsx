import React from 'react'
import useStore from '../store/GeneralStore'
import { Navigate, useLocation } from 'react-router-dom'
import Layout from '../layout/Layout'
import Content from '../layout/Content'

export default function ProtectedRoute({ admin, children }) {
  const location = useLocation()
  const user = useStore((state) => state.user)
  if (admin && user.tipo != 0) {
    return <Navigate to="/" state={{ location }} />
  }
  return children
}
