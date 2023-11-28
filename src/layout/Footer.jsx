import { Paper } from '@mui/material'
import React from 'react'

export default function Footer() {
  return (
    <Paper sx={{marginTop: 'calc(10% + 60px)',
    position: 'fixed',
    bottom: 0,
    width: '100%'
    }} component="footer" square variant="outlined">
      
    </Paper>
  )
}
