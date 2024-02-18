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
      <ul className="w-full max-h-listado text-primary dark:text-text mt-2">
        {filteredPistas.map((pista, index) => (
          <React.Fragment key={index}>
            <li
              className="w-full flex h-20 cursor-pointer items-center pl-2 pr-2 transition duration-300 hover:bg-light dark:hover:text-background rounded-md my-1"
              onClick={() => navigate('/gestion/pistas/' + pista.id)}
            >
              <div className="flex flex-col w-7/12">
                <h1 className="text-lg ">{pista.nombre}</h1>
                <h1 className="text-md opacity-50">{pista.ubicacion}</h1>
              </div>

              <h1 className="text-lg w-5/12">{pista.actividad_nombre}</h1>

              <div className="flex flex-col w-3/12 items-end justify-end content-end">
                <BadgeCustom
                  sx="w-20"
                  tipo={pista.activo ? 'green' : 'red'}
                  label={pista.activo ? 'Activa' : 'Inactiva'}
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

export default GestionPistas
