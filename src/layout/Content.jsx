import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Content() {
  return (
    <Box
      sx={{
        width: '100%',
        p: 1,
        pt: 8,
        pb: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
      id="content"
    >
      <Outlet />
    </Box>
  )
}
