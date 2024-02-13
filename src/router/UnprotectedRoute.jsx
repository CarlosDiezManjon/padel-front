import React from 'react'
import useStore from '../store/GeneralStore'
import { Navigate } from 'react-router-dom'

export default function UnprotectedRoute({ children }) {
  const token = useStore((state) => state.token)
  return token != null ? <Navigate to="/" /> : children
}
