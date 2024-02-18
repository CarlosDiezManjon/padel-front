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
          labelSx="!w-4/12 sm:!w-6/12 !ring-0 "
          sx="h-full"
        />
        <ButtonCustom onClick={handleAddActividad} sx="!w-24 ml-4 h-10">
          Nueva
        </ButtonCustom>
      </div>
      <ul className="w-full max-h-listado text-primary dark:text-text mt-2">
        {filteredActividades.map((actividad, index) => (
          <React.Fragment key={index}>
            <li
              className="w-full flex h-20 cursor-pointer items-center pl-2 pr-2  hover:bg-light dark:hover:text-background rounded-md my-1  transition duration-300"
              onClick={() => navigate('/gestion/actividades/' + actividad.id)}
            >
              <div className="flex flex-col w-9/12">
                <h1 className="text-lg ">{actividad.nombre}</h1>
                <h1 className="text-md opacity-50">{actividad.descripcion}</h1>
              </div>

              <div className="flex flex-col w-3/12 items-end justify-end content-end">
                <BadgeCustom
                  sx="w-20"
                  tipo={actividad.activo ? 'green' : 'red'}
                  label={actividad.activo ? 'Activa' : 'Inactiva'}
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

export default GestionActividades
