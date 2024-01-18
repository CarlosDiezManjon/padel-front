import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PersonIcon from '@mui/icons-material/Person'
import {
  Avatar,
  Badge,
  Box,
  Button,
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
import AddBoxIcon from '@mui/icons-material/AddBox'

const GestionPistas = () => {
  const [pistas, setPistas] = useState([])
  const [activo, setActivo] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const { getRequest, data } = useGetRequest()

  useEffect(() => {
    getRequest('/pistas')
  }, [])

  useEffect(() => {
    if (data) {
      setPistas(data.pistas)
    }
  }, [data])

  const handleSwitchChange = (event) => {
    setActivo(event.target.checked)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleAddPista = () => {
    navigate('/gestion-pistas/nueva')
  }

  const filteredPistas = pistas.filter(
    (pista) =>
      pista.nombre
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .includes(
          searchTerm
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
        ) && (activo ? pista.activo === activo : true)
  )

  return (
    <Box sx={{ width: '100%' }} id="gestion-pistas">
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, justifyContent: 'space-between' }}>
        <TextField
          size="small"
          sx={{ width: '60%', ml: 0 }}
          label="Filtrar nombre"
          value={searchTerm}
          onChange={handleSearch}
        />
        {/* <FormControlLabel
          labelPlacement="start"
          sx={{ ml: 1 }}
          control={
            <Switch
              checked={activo}
              onChange={handleSwitchChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label="Activa"
        /> */}
        <Button onClick={handleAddPista} sx={{ ml: 1 }} color="success" variant="contained">
          Crear
        </Button>
      </Box>
      <List>
        {filteredPistas.map((pista) => (
          <React.Fragment key={pista.id}>
            <ListItem>
              <ListItemButton
                sx={{ borderRadius: '5px' }}
                onClick={() => navigate('/gestion-pistas/' + pista.id)}
              >
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={pista.nombre} secondary={pista.ubicacion} />
                <Badge
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  badgeContent={
                    <>
                      <Chip
                        size="small"
                        label={pista.activo ? 'Activo' : 'Inactivo'}
                        color={pista.activo ? 'primary' : 'error'}
                      />
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

export default GestionPistas
