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
import InputCustom from '../../components/InputCustom'
import ButtonCustom from '../../components/ButtonCustom'
import BadgeCustom from '../../components/BadgeCustom'

const GestionPistas = () => {
  const [pistas, setPistas] = useState([])
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

  const filteredPistas = pistas.filter((pista) =>
    pista.nombre
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .includes(
        searchTerm
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase(),
      ),
  )

  return (
    <Box sx={{ width: '100%' }} id="gestion-pistas">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mt: 2,
          justifyContent: 'space-between',
          pr: 4,
        }}
      >
        <InputCustom
          placeholder="Filtrar"
          tipo="negro"
          value={searchTerm}
          onChange={handleSearch}
          sx="md:!w-6/12  mr-4"
        />
        <ButtonCustom onClick={handleAddPista} sx="!w-fit !py-2">
          Nueva
        </ButtonCustom>
      </Box>
      <List>
        {filteredPistas.map((pista) => (
          <React.Fragment key={pista.id}>
            <ListItem sx="pr-2">
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
                  sx={{ mr: 2 }}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  badgeContent={
                    <>
                      <BadgeCustom
                        tipo={pista.activo ? 'verde' : 'rojo'}
                        label={pista.activo ? 'Activa' : 'Inactiva'}
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
