import React from 'react'
import Alert from '@mui/material/Alert'
import useStore from '../store/GeneralStore'
import Snackbar from '@mui/material/Snackbar'
import { IconButton, Slide } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'

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
      <div className="bg-main-400 text-white w-11/12 p-3 py-2 rounded-md mr-4 max-w-96 flex items-center justify-between">
        {messageRequest}
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => setMessageRequest(null)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>
    </Snackbar>
  )
}
