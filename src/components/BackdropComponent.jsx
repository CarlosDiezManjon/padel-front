import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'
import useStore from '../store/GeneralStore'

export default function BackdropComponent() {
  const isLoading = useStore((state) => state.isLoading)
  return (
    <Backdrop
      sx={{
        color: 'white',
        zIndex: 30,
        position: 'fixed',
      }}
      color="primary"
      width="50%"
      open={isLoading}
    >
      <CircularProgress
        variant="indeterminate"
        disableShrink
        color="inherit"
        size={40}
        thickness={15}
      />
    </Backdrop>
  )
}
