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
  const [userSelected, setUserSelected] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const { getRequest, data, error } = useGetRequest()

  useEffect(() => {
    getRequest('/usuarios')
  }, [])

  useEffect(() => {
    if (data) {
      console.log(data)
      setUsers(data.usuarios)
    }
  }, [data])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredUsers = users.filter((user) =>
    (user.nombre + ' ' + user.apellidos)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .includes(
        searchTerm
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
      )
  )

  return (
    <Box sx={{ width: '100%' }} id="gestion-usuarios">
      {userSelected ? (
        <GestionUsuarioIndividual user={userSelected} setUserSelected={setUserSelected} />
      ) : (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
            <TextField
              size="small"
              sx={{ width: '100%', ml: 2 }}
              label="Filtrar nombre"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Box>
          <List>
            {filteredUsers.map((user) => (
              <>
                <ListItem key={user.id}>
                  <ListItemButton
                    sx={{ borderRadius: '5px' }}
                    onClick={() => setUserSelected(user)}
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
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </>
      )}
    </Box>
  )
}

export default GestionUsuarios
