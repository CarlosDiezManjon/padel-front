import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PersonIcon from '@mui/icons-material/Person'
import {
  Avatar,
  Badge,
  Box,
  Chip,
  Divider,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Switch,
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useGetRequest from '../../services/get.service'

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
        <TextField
          size="small"
          sx={{ width: '60%', ml: 0, mr: 2 }}
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
