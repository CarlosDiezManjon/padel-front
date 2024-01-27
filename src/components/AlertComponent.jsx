import React from 'react'
import Alert from '@mui/material/Alert'
import useStore from '../store/GeneralStore'
import Snackbar from '@mui/material/Snackbar'
import { Slide } from '@mui/material'

function SlideTransition(props) {
  return <Slide {...props} direction="left" />
}

export default function AlertComponent() {
  const messageRequest = useStore((state) => state.messageRequest)
  const setMessageRequest = useStore((state) => state.setMessageRequest)
  return (
    <Snackbar
      sx={{ bottom: '110px !important', width: '100%' }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={() => setMessageRequest(null)}
      autoHideDuration={2500}
      TransitionComponent={SlideTransition}
      open={messageRequest != null}
    >
      <div className="bg-main-500 text-white w-full p-3 rounded-md mr-4 max-w-96">
        {messageRequest}
      </div>
    </Snackbar>
  )
}
