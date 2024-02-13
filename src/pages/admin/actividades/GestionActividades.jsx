import { Badge, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BadgeCustom from '../../../components/BadgeCustom'
import ButtonCustom from '../../../components/ButtonCustom'
import InputCustom from '../../../components/InputCustom'
import useGetRequest from '../../../services/get.service'

const GestionActividades = () => {
  const [actividades, setActividades] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const { getRequest, data } = useGetRequest()

  useEffect(() => {
    getRequest('/actividades')
  }, [])

  useEffect(() => {
    if (data) {
      setActividades(data.actividades)
    }
  }, [data])

  const handleSwitchChange = (event) => {
    setActivo(event.target.checked)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleAddActividad = () => {
    navigate('/gestion/actividades/nueva')
  }

  const filteredActividades = actividades.filter((actividad) =>
    actividad.nombre
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
    <div className="w-full">
      <div className="flex justify-between mt-2 pr-2 mb-1">
        <InputCustom
          placeholder="Filtrar"
          tipo="negro"
          value={searchTerm}
          onChange={handleSearch}
          sx="md:!w-6/12 !ring-0 h-10"
        />
        <ButtonCustom onClick={handleAddActividad} sx="!w-24 ml-4 h-10">
          Nueva
        </ButtonCustom>
      </div>
      <List className="max-h-listado overflow-auto text-white">
        {filteredActividades.map((actividad) => (
          <React.Fragment key={actividad.id}>
            <ListItem>
              <ListItemButton
                sx={{ borderRadius: '5px' }}
                onClick={() => navigate('/gestion/actividades/' + actividad.id)}
              >
                {/* <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar> */}
                <ListItemText
                  primary={actividad.nombre}
                  secondary={<span className="text-white">{actividad.ubicacion}</span>}
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
                        tipo={actividad.activo ? 'verde' : 'rojo'}
                        label={actividad.activo ? 'Activa' : 'Inactiva'}
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
    </div>
  )
}

export default GestionActividades
