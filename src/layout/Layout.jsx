import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Content from './Content'
import './Layout.css'
import { Box } from '@mui/material'

export default function Layout() {
  return (
    <Box sx={{ width: '100%' }} id="main-container">
      <Header />
      <Content />
      <Footer />
    </Box>
  )
}
