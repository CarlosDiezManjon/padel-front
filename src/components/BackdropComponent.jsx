import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

export default function BackdropComponent({ open, size, thickness }) {
  return (
    <Backdrop
      sx={{
        color: 'white',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        position: 'fixed',
      }}
      color="primary"
      width="50%"
      open={open}
      transitionDuration={{ appear: 1000, enter: 1000, exit: 1000 }}
    >
      <CircularProgress
        variant="indeterminate"
        disableShrink
        color="inherit"
        size={size ? size : 40}
        thickness={thickness ? thickness : 15}
      />
    </Backdrop>
  )
}
