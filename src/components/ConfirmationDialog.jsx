import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import useStore from '../store/GeneralStore'

const ConfirmationDialog = () => {
  const confirmationDialogContent = useStore((state) => state.confirmationDialogContent)
  return (
    <Dialog open={confirmationDialogContent != null} onClose={confirmationDialogContent?.onCancel}>
      <DialogTitle>{confirmationDialogContent?.title}</DialogTitle>
      <DialogContent>{confirmationDialogContent?.message}</DialogContent>
      <DialogActions>
        <Button onClick={confirmationDialogContent?.onCancel} color="inherit" variant="text">
          Cancelar
        </Button>
        <Button onClick={confirmationDialogContent?.onSuccess} color="primary" variant="outlined">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
