import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Content() {
  return (
    <Box sx={{pt:"56px"}}> <Outlet/></Box>
   
  )
}
