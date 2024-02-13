import { Badge, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BadgeCustom from '../../../components/BadgeCustom'
import ButtonCustom from '../../../components/ButtonCustom'
import InputCustom from '../../../components/InputCustom'
import useGetRequest from '../../../services/get.service'
import SelectCustom from '../../../components/SelectCustom'

const GestionTarifas = () => {
  const [tarifas, setTarifas] = useState([])
  const [actividades, setActividades] = useState([])
  const [actividadSelected, setActividadSelected] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const { getRequest: getTarifas, data: dataTarifas } = useGetRequest()
  const { getRequest: getActividades, data: dataActividades } = useGetRequest()

  useEffect(() => {
    getTarifas('/tarifas')
    getActividades('/actividades')
  }, [])

  useEffect(() => {
    if (dataTarifas) {
      setTarifas(dataTarifas.tarifas)
    }
  }, [dataTarifas])

  useEffect(() => {
    if (dataActividades) {
      let copy = [...dataActividades.actividades]
      copy.unshift({ id: 0, nombre: 'Todas' })
      setActividades(copy)
    }
  }, [dataActividades])

  const handleSearchActividad = (event) => {
    setActividadSelected(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleAddPista = () => {
    navigate('/gestion/tarifas/nueva')
  }

  let filteredTarifas = tarifas.filter((tarifa) =>
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

  if (actividadSelected !== 0) {
    filteredTarifas = filteredTarifas.filter((tarifa) => tarifa.actividad_id === actividadSelected)
  }

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
    <div className="w-full">
      <div className="flex justify-between mt-2 pr-2 mb-1">
        <InputCustom
          placeholder="Filtrar"
          tipo="negro"
          value={searchTerm}
          onChange={handleSearch}
          labelSx="!w-4/12 sm:!w-6/12 !ring-0 "
          sx="h-full"
        />
        <SelectCustom
          value={actividadSelected}
          tipo="verde"
          sx="h-11"
          labelSx="ml-2 !w-4/12"
          onChange={handleSearchActividad}
          options={actividades.map((act) => ({ value: act.id, label: act.nombre }))}
        />
        <ButtonCustom onClick={handleAddPista} sx="!w-3/12 ml-1 sm:!w-24">
          Nueva
        </ButtonCustom>
      </div>
      <List className="max-h-listado overflow-auto text-white">
        {filteredTarifas.map((tarifa) => (
          <React.Fragment key={tarifa.id}>
            <ListItem>
              <ListItemButton
                sx={{ borderRadius: '5px' }}
                onClick={() => navigate('/gestion/tarifas/' + tarifa.id)}
              >
                {/* <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar> */}
                <ListItemText
                  primary={tarifa.actividad_nombre + ' - ' + tarifa.nombre}
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
    </div>
  )
}

export default GestionTarifas
