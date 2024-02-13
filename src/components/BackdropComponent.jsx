import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'
import useStore from '../store/GeneralStore'

export default function BackdropComponent() {
  const isLoading = useStore((state) => state.isLoading)
  return (
    <Backdrop
      sx={{
        color: 'white',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        position: 'fixed',
      }}
      color="primary"
      width="50%"
      open={isLoading}
      transitionDuration={{ appear: 1000, enter: 1000, exit: 1000 }}
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
