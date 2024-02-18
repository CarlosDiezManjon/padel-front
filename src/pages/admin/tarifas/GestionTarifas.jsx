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
      <ul className="w-full max-h-listado text-primary dark:text-text  mt-2">
        {filteredTarifas.map((tarifa, index) => (
          <React.Fragment key={index}>
            <li
              className="w-full flex h-20 cursor-pointer items-center pl-2 pr-2  hover:bg-light transition duration-300 dark:hover:text-background rounded-md my-1"
              onClick={() => navigate('/gestion/tarifas/' + tarifa.id)}
            >
              <div className="flex flex-col w-7/12">
                <h1 className="text-lg ">{tarifa.nombre}</h1>
                <h1 className="text-md opacity-50">{tarifa.precio}</h1>
              </div>

              <h1 className="text-lg w-5/12">{tarifa.actividad_nombre}</h1>

              <div className="flex flex-col w-3/12 items-end justify-end content-end">
                <BadgeCustom
                  sx="w-20"
                  tipo={tarifa.activo ? 'green' : 'red'}
                  label={tarifa.activo ? 'Activa' : 'Inactiva'}
                />
              </div>
            </li>
            <Divider className="bg-light" variant="middle" />
          </React.Fragment>
        ))}
      </ul>
    </div>
  )
}

export default GestionTarifas
