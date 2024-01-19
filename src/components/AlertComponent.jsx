import React from 'react'
import Alert from '@mui/material/Alert'
import useStore from '../store/GeneralStore'
import Snackbar from '@mui/material/Snackbar'

export default function AlertComponent() {
  const messageRequest = useStore((state) => state.messageRequest)
  const setMessageRequest = useStore((state) => state.setMessageRequest)
  return (
    <Snackbar
      sx={{ top: '70px', width: '100%' }}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={() => setMessageRequest(null)}
      autoHideDuration={2000}
      open={messageRequest != null}
      //   message={messageRequest}
    >
      <Alert severity="success" variant="filled" sx={{ width: '70%' }}>
        {messageRequest}
      </Alert>
    </Snackbar>
  )
}
