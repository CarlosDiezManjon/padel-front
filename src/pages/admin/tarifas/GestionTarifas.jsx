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
import useGetRequest from '../../../services/get.service'
import AddBoxIcon from '@mui/icons-material/AddBox'
import InputCustom from '../../../components/InputCustom'
import ButtonCustom from '../../../components/ButtonCustom'
import BadgeCustom from '../../../components/BadgeCustom'

const GestionTarifas = () => {
  const [tarifas, setTarifas] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const { getRequest, data } = useGetRequest()

  useEffect(() => {
    getRequest('/tarifas')
  }, [])

  useEffect(() => {
    if (data) {
      setTarifas(data.tarifas)
    }
  }, [data])

  const handleSwitchChange = (event) => {
    setActivo(event.target.checked)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleAddPista = () => {
    navigate('/gestion-tarifas/nueva')
  }

  const filteredTarifas = tarifas.filter((tarifa) =>
    tarifa.nombre
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

  const getUserType = (tipo) => {
    switch (tipo) {
      case 0:
        return 'Admin'
      case 1:
        return 'Socio'
      case 2:
        return 'No socio'
      case 3:
        return 'Cuota 0'
      default:
        return 'No socio'
    }
  }

  return (
    <Box sx={{ width: '100%' }} id="gestion-tarifas">
      <div className="flex justify-between mt-2 pr-2 mb-1">
        <InputCustom
          placeholder="Filtrar"
          tipo="negro"
          value={searchTerm}
          onChange={handleSearch}
          sx="md:!w-6/12 !ring-0 h-full"
        />
        <ButtonCustom onClick={handleAddPista} sx="!w-24 ml-4">
          Nueva
        </ButtonCustom>
      </div>
      <List className="max-h-listado overflow-auto text-white">
        {filteredTarifas.map((tarifa) => (
          <React.Fragment key={tarifa.id}>
            <ListItem>
              <ListItemButton
                sx={{ borderRadius: '5px' }}
                onClick={() => navigate('/gestion-tarifas/' + tarifa.id)}
              >
                {/* <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar> */}
                <ListItemText
                  primary={tarifa.nombre}
                  secondary={<span className="text-white">{tarifa.precio + ' €'}</span>}
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
                        tipo="blanco"
                        sx="w-20 mb-2"
                        label={getUserType(tarifa.tipo_usuario)}
                      />
                      <BadgeCustom
                        sx="w-20"
                        tipo={tarifa.activo ? 'verde' : 'rojo'}
                        label={tarifa.activo ? 'Activa' : 'Inactiva'}
                      />
                    </>
                  }
                ></Badge>
              </ListItemButton>
            </ListItem>
            <Divider className="bg-white" variant="middle" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  )
}

export default GestionTarifas
