import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Content from './Content'

export default function Layout() {
  return (
    <>
    <Header/>
    <Content/>
    
    <Footer/>
    </>
  )
}
