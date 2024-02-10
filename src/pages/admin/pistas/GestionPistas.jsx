import { Badge, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BadgeCustom from '../../../components/BadgeCustom'
import ButtonCustom from '../../../components/ButtonCustom'
import InputCustom from '../../../components/InputCustom'
import useGetRequest from '../../../services/get.service'

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
    <div className="w-full">
      <div className="flex justify-between mt-2 pr-2 mb-1">
        <InputCustom
          placeholder="Filtrar"
          tipo="negro"
          value={searchTerm}
          onChange={handleSearch}
          sx="md:!w-6/12 !ring-0 h-10"
        />
        <ButtonCustom onClick={handleAddPista} sx="!w-24 ml-4 h-10">
          Nueva
        </ButtonCustom>
      </div>
      <List className="max-h-listado overflow-auto text-white">
        {filteredPistas.map((pista) => (
          <React.Fragment key={pista.id}>
            <ListItem>
              <ListItemButton
                sx={{ borderRadius: '5px' }}
                onClick={() => navigate('/gestion-pistas/' + pista.id)}
              >
                {/* <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar> */}
                <ListItemText
                  primary={pista.nombre}
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
