import React from 'react'
import Alert from '@mui/material/Alert'
import useStore from '../store/GeneralStore'
import Snackbar from '@mui/material/Snackbar'
import { Slide } from '@mui/material'

function SlideTransition(props) {
  return <Slide {...props} direction="up" />
}

export default function AlertComponent() {
  const messageRequest = useStore((state) => state.messageRequest)
  const setMessageRequest = useStore((state) => state.setMessageRequest)
  return (
    <Snackbar
      sx={{ bottom: '70px', width: '100%' }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={() => setMessageRequest(null)}
      autoHideDuration={2500}
      TransitionComponent={SlideTransition}
      open={messageRequest != null}
      //   message={messageRequest}
    >
      <Alert severity="success" variant="filled" sx={{ width: '80%' }}>
        {messageRequest}
      </Alert>
    </Snackbar>
  )
}
