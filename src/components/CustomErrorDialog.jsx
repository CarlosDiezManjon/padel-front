import React, { useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'
import useStore from '../store/GeneralStore'

const CustomErrorDialog = ({ open, onClose, title, message }) => {
  const setToken = useStore((state) => state.setToken)
  const setUser = useStore((state) => state.setUser)
  const navigate = useNavigate()
  const handleLogout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    navigate('/')
  }
  useEffect(() => {
    if (message == 'Sesión caducada') handleLogout()
  }, [message])

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {title ? title : 'Error'}
        <IconButton style={{ position: 'absolute', right: '8px', top: '8px' }} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CustomErrorDialog
