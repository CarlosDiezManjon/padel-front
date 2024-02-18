import {
  Avatar,
  Badge,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BadgeCustom from '../../../components/BadgeCustom'
import InputCustom from '../../../components/InputCustom'
import ToggleCustom from '../../../components/ToggleCustom'
import useGetRequest from '../../../services/get.service'
import { getUserType } from '../../../utils/utils'
import ButtonCustom from '../../../components/ButtonCustom'

const GestionUsuarios = () => {
  const [users, setUsers] = useState([])
  const [activo, setActivo] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const { getRequest, data, error } = useGetRequest()

  useEffect(() => {
    getRequest('/usuarios')
  }, [])

  useEffect(() => {
    if (data) {
      setUsers(data.usuarios)
    }
  }, [data])

  const handleSwitchChange = (event) => {
    setActivo(event.target.checked)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredUsers = users.filter(
    (user) =>
      (user.nombre + ' ' + user.apellidos)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .includes(
          searchTerm
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase(),
        ) && (activo ? user.activo === activo : true),
  )

  const getInitials = (nombre, apellidos) => {
    return nombre.charAt(0) + apellidos.charAt(0)
  }

  const handleAddUsuario = () => {
    navigate('/gestion/usuarios/nuevo')
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mt-2 pr-2 mb-1">
        <InputCustom
          placeholder="Filtrar"
          tipo="negro"
          value={searchTerm}
          onChange={handleSearch}
          labelSx="!w-5/12 sm:!w-6/12 !ring-0 "
          sx="h-full"
        />
        <ToggleCustom label="Activo" checked={activo} onChange={handleSwitchChange} sx="ml-1 h-6" />
        <ButtonCustom onClick={handleAddUsuario} sx="!w-3/12 ml-1 sm:!w-24">
          Nuevo
        </ButtonCustom>
      </div>
      <ul className="w-full max-h-listado text-primary dark:text-text mt-2">
        {filteredUsers.map((user, index) => (
          <>
            <li
              key={index}
              className="w-full flex h-20 cursor-pointer items-center pl-6 pr-2  hover:bg-light dark:hover:text-background rounded-md my-1 transition duration-300"
              onClick={() => navigate('/gestion/usuarios/' + user.id)}
            >
              <div className="rounded-full bg-primary text-background h-10 w-10 flex justify-center items-center dark:text-text">
                {getInitials(user.nombre, user.apellidos)}
              </div>
              <div className="flex flex-col ml-6 w-7/12">
                <h1 className="text-lg ">{user.nombre + ' ' + user.apellidos}</h1>
                <h1 className="text-md opacity-50">{user.username}</h1>
              </div>

              <div className="flex flex-col w-3/12 items-end justify-end content-end">
                <BadgeCustom sx="w-20" label={getUserType(user.tipo)} />
                <BadgeCustom
                  sx="mt-2 w-20"
                  tipo={user.activo ? 'green' : 'red'}
                  label={user.activo ? 'Activo' : 'Inactivo'}
                />
              </div>
            </li>
            <Divider className="bg-light" variant="middle" />
          </>
        ))}
      </ul>
      {/* {filteredUsers.map((user) => (
        <React.Fragment key={user.id}>
          <ListItem>
            <ListItemButton
              sx={{ borderRadius: '5px' }}
              onClick={() => navigate('/gestion/usuarios/' + user.id)}
            >
              <ListItemAvatar>
                <Avatar {...getInitials(user.nombre + ' ' + user.apellidos)}></Avatar>
              </ListItemAvatar>
              <ListItemText
                className="text-white"
                primary={user.nombre + ' ' + user.apellidos}
                secondary={<span className="text-white">{user.username}</span>}
              />

              <Badge
                sx={{ mr: 2 }}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                badgeContent={
                  <>
                    <BadgeCustom tipo="blanco" sx="w-20" label={getUserType(user.tipo)} />
                    <BadgeCustom
                      sx="mt-2 w-20"
                      tipo={user.activo ? 'verde' : 'rojo'}
                      label={user.activo ? 'Activo' : 'Inactivo'}
                    />
                  </>
                }
              ></Badge>
            </ListItemButton>
          </ListItem>
          <Divider className="bg-white" variant="middle" />
        </React.Fragment>
      ))} */}
    </div>
  )
}

export default GestionUsuarios
