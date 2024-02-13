import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Content from './Content'
import './Layout.css'
import CustomErrorDialog from '../components/CustomErrorDialog'
import BackdropComponent from '../components/BackdropComponent'
import ConfirmationDialog from '../components/ConfirmationDialog'
import AlertComponent from '../components/AlertComponent'
import useStore from '../store/GeneralStore'
import { Navigate, useLocation } from 'react-router-dom'

export default function Layout() {
  const location = useLocation()
  const token = useStore((state) => state.user)
  if (token == null) {
    return <Navigate to="/login" state={{ location }} />
  }
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  )
}
