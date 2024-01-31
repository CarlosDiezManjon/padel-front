import React, { useEffect } from 'react'
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import useStore from '../../store/GeneralStore'
import { Navigate, useNavigate } from 'react-router-dom'
import PeopleIcon from '@mui/icons-material/People'
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek'
import ReceiptIcon from '@mui/icons-material/Receipt'

const Administracion = () => {
  const user = useStore((state) => state.user)
  const navigate = useNavigate()

  if (!user?.tipo == 2) {
    return <Navigate to="/" replace />
  }

  return (
    <Box sx={{ width: '100%', color: 'white' }}>
      <List sx={{ width: '100%', color: 'white' }}>
        <ListItem sx={{ borderRadius: '5px', width: '100%' }}>
          <ListItemButton
            sx={{ borderRadius: '5px' }}
            onClick={() => navigate('/gestion-usuarios')}
          >
            <ListItemIcon>
              <PeopleIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Gestionar usuarios" />
          </ListItemButton>
        </ListItem>
        <Divider className="bg-white" variant="middle" />
        <ListItem>
          <ListItemButton onClick={() => navigate('/gestion-pistas')}>
            <ListItemIcon>
              <CalendarViewWeekIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Gestionar pistas" />
          </ListItemButton>
        </ListItem>
        <Divider className="bg-white" variant="middle" />
        <ListItem>
          <ListItemButton onClick={() => navigate('/gestion-reservas')}>
            <ListItemIcon>
              <ReceiptIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Gestionar reservas" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}

export default Administracion
