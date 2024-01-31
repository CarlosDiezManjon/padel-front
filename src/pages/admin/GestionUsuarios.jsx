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
import ToggleCustom from '../../components/ToggleCustom'
import BadgeCustom from '../../components/BadgeCustom'
import InputCustom from '../../components/InputCustom'

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
            .toLowerCase(),
        ) && (activo ? user.activo === activo : true),
  )

  const getInitials = (name) => {
    const splitName = name.split(' ')
    if (splitName.length === 1) {
      return { children: splitName[0][0] }
    } else {
      return { children: splitName[0][0] + splitName[1][0] }
    }
  }

  return (
    <Box sx={{ width: '100%' }} id="gestion-usuarios">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: 2,
          pr: 2,
          mb: 1,
        }}
      >
        <InputCustom
          placeholder="Filtrar"
          tipo="negro"
          value={searchTerm}
          onChange={handleSearch}
          sx="md:!w-6/12  mr-4 !ring-0"
        />
        <ToggleCustom label="Activo" checked={activo} onChange={handleSwitchChange} />
        {/* <FormControlLabel
          labelPlacement="end"
          control={
            <Switch
              checked={activo}
              onChange={handleSwitchChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
        /> */}
      </Box>
      <List className="max-h-listado overflow-auto text-white">
        {filteredUsers.map((user) => (
          <React.Fragment key={user.id}>
            <ListItem>
              <ListItemButton
                sx={{ borderRadius: '5px' }}
                onClick={() => navigate('/gestion-usuarios/' + user.id)}
              >
                <ListItemAvatar>
                  <Avatar {...getInitials(user.nombre + ' ' + user.apellidos)}>
                    <img
                      key={user.id}
                      src="https://xsgames.co/randomusers/avatar.php?g=male"
                      height={50}
                      width={50}
                    ></img>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="text-white"
                  primary={user.nombre + ' ' + user.apellidos}
                  secondary={<span className="text-white">{user.username}</span>}
                />

                <Badge
                  sx={{ mr: 2 }}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  badgeContent={
                    <>
                      <BadgeCustom
                        sx="mb-2"
                        tipo={user.activo ? 'verde' : 'rojo'}
                        label={user.activo ? 'Activo' : 'Inactivo'}
                      />
                      {user.tipo == 2 && <BadgeCustom tipo="azul" label="Admin" />}
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
