import React, { useEffect, useState } from 'react'
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  Box,
  ListItemAvatar,
  Avatar,
  ListItemButton,
  Divider,
  IconButton,
  Switch,
  FormControlLabel,
  Chip,
  Badge,
} from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import PersonIcon from '@mui/icons-material/Person'
import axios from 'axios'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import useGetRequest from '../../services/get.service'
import { useNavigate } from 'react-router-dom'
import GestionUsuarioIndividual from './GestionUsuarioIndividual'

const GestionUsuarios = () => {
  const [users, setUsers] = useState([])
  const [activo, setActivo] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const { getRequest, data, error } = useGetRequest()

  useEffect(() => {
    getRequest('/usuarios')
  }, [])

  useEffect(() => {
    if (data) {
      setUsers(data.usuarios)
    }
  }, [data])

  const handleSwitchChange = (event) => {
    setActivo(event.target.checked)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredUsers = users.filter(
    (user) =>
      (user.nombre + ' ' + user.apellidos)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .includes(
          searchTerm
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
        ) && (activo ? user.activo === activo : true)
  )

  return (
    <Box sx={{ width: '100%' }} id="gestion-usuarios">
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ p: 0 }}>
          <ArrowBackIcon />
        </IconButton>
        <TextField
          size="small"
          sx={{ width: '60%', ml: 1, mr: 2 }}
          label="Filtrar nombre"
          value={searchTerm}
          onChange={handleSearch}
        />
        <FormControlLabel
          labelPlacement="end"
          control={
            <Switch
              checked={activo}
              onChange={handleSwitchChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label="Activo"
        />
      </Box>
      <List>
        {filteredUsers.map((user) => (
          <React.Fragment key={user.id}>
            <ListItem>
              <ListItemButton
                sx={{ borderRadius: '5px' }}
                onClick={() => navigate('/gestion-usuarios/' + user.id)}
              >
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user.nombre + ' ' + user.apellidos}
                  secondary={user.username}
                />
                <Badge
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  badgeContent={
                    <>
                      <Chip
                        size="small"
                        label={user.activo ? 'Activo' : 'Inactivo'}
                        color={user.activo ? 'primary' : 'error'}
                      />
                      {user.tipo == 2 && (
                        <Chip size="small" label="Admin" color="secondary" sx={{ mt: 1 }} />
                      )}
                    </>
                  }
                ></Badge>
              </ListItemButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  )
}

export default GestionUsuarios
