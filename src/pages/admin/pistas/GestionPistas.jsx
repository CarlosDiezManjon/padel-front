import { Badge, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BadgeCustom from '../../../components/BadgeCustom'
import ButtonCustom from '../../../components/ButtonCustom'
import InputCustom from '../../../components/InputCustom'
import useGetRequest from '../../../services/get.service'
import SelectCustom from '../../../components/SelectCustom'

const GestionPistas = () => {
  const [pistas, setPistas] = useState([])
  const [actividades, setActividades] = useState([])
  const [actividadSelected, setActividadSelected] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const { getRequest: getPistas, data: dataPistas } = useGetRequest()
  const { getRequest: getActividades, data: dataActividades } = useGetRequest()

  useEffect(() => {
    getPistas('/pistas')
    getActividades('/actividades')
  }, [])

  useEffect(() => {
    if (dataPistas) {
      setPistas(dataPistas.pistas)
    }
  }, [dataPistas])

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
    navigate('/gestion/pistas/nueva')
  }

  let filteredPistas = pistas.filter((pista) =>
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

  if (actividadSelected !== 0) {
    filteredPistas = filteredPistas.filter((pista) => pista.actividad_id === actividadSelected)
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
        {filteredPistas.map((pista) => (
          <React.Fragment key={pista.id}>
            <ListItem>
              <ListItemButton
                sx={{ borderRadius: '5px' }}
                onClick={() => navigate('/gestion/pistas/' + pista.id)}
              >
                {/* <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar> */}
                <ListItemText
                  primary={pista.actividad_nombre + ' - ' + pista.nombre}
                  secondary={<span className="text-white">{pista.ubicacion}</span>}
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
                        tipo={pista.activo ? 'verde' : 'rojo'}
                        label={pista.activo ? 'Activa' : 'Inactiva'}
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

export default GestionPistas
