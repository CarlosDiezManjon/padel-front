import React, { useEffect, useState } from 'react'
import {
  TextField,
  Button,
  Card,
  CardContent,
  Box,
  InputAdornment,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from '@mui/material'
import { datetimeToStringMinutes } from '../../../utils/utils'
import useStore from '../../../store/GeneralStore'
import useDeleteRequest from '../../../services/delete.service'
import { useNavigate, useParams } from 'react-router-dom'
import useGetRequest from '../../../services/get.service'
import usePutRequest from '../../../services/put.service'
import ButtonCustom from '../../../components/ButtonCustom'
import InputCustom from '../../../components/InputCustom'
import SelectCustom from '../../../components/SelectCustom'

const GestionUsuarioIndividual = () => {
  const { id } = useParams()
  const [usuario, setUsuario] = useState(null)
  const setConfirmationDialogContent = useStore((state) => state.setConfirmationDialogContent)
  const navigate = useNavigate()

  const { deleteRequest, data: deleteData } = useDeleteRequest()
  const { getRequest, data: getData } = useGetRequest()
  const { putRequest, data: putData } = usePutRequest()

  useEffect(() => {
    getRequest(`/usuarios/${id}`)
  }, [])

  useEffect(() => {
    if (putData) {
      setUsuario(putData.usuario)
      navigate(-1)
    }
  }, [putData])

  useEffect(() => {
    if (deleteData) {
      setUsuario(deleteData.usuario)
      navigate(-1)
    }
  }, [deleteData])

  useEffect(() => {
    if (getData) {
      setUsuario(getData.usuario)
    }
  }, [getData])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }))
  }
  const toggleUserActive = () => {
    setConfirmationDialogContent({
      title: usuario.activo ? 'Dar de baja' : 'Dar de alta',
      message: usuario.activo
        ? '¿Está seguro de que desea dar de baja al usuario?'
        : '¿Está seguro de que desea dar de alta al usuario?',
      onSuccess: () => {
        //TODO: Lógica para dar de baja o alta al usuario
        usuario.activo
          ? deleteRequest('/usuarios', usuario.id)
          : putRequest('/activar-usuario/' + usuario.id)
        setConfirmationDialogContent(null)
      },
      onCancel: () => setConfirmationDialogContent(null),
    })
  }

  const handleSave = () => {
    putRequest('/usuarios/' + usuario.id, usuario)
  }

  return (
    <Box sx={{ width: '100%' }}>
      {usuario && (
        <>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pr: 1,
            }}
          >
            <InputCustom
              name="username"
              label="Username"
              value={usuario.username}
              onChange={handleInputChange}
              tipo="negro"
            />
            <InputCustom
              name="nombre"
              label="Nombre"
              value={usuario.nombre}
              onChange={handleInputChange}
              labelSx="ml-2"
              tipo="negro"
            />
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pr: 1,
            }}
          >
            <InputCustom
              name="apellidos"
              label="Apellidos"
              value={usuario.apellidos}
              onChange={handleInputChange}
              tipo="negro"
            />
            <SelectCustom
              id="tipo"
              name="tipo"
              value={usuario.tipo}
              label="Tipo usuario"
              tipo="verde"
              labelSx="ml-2"
              onChange={handleInputChange}
              options={[
                { value: 0, label: 'Administrador' },
                { value: 1, label: 'Socio' },
                { value: 2, label: 'No socio' },
                { value: 3, label: 'Cuota 0' },
              ]}
            />

            {/* <FormControl sx={{ width: '50%' }} margin="normal">
              <InputLabel id="tipo">Tipo usuario</InputLabel>
              <Select
                labelId="tipo"
                id="tipo"
                name="tipo"
                value={usuario.tipo}
                label="Tipo usuario"
                onChange={handleInputChange}
              >
                <MenuItem value={1}>Usuario</MenuItem>
                <MenuItem value={2}>Administrador</MenuItem>
              </Select>
            </FormControl> */}
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pr: 1,
            }}
          >
            <InputCustom
              name="email"
              label="Email"
              value={usuario.email}
              onChange={handleInputChange}
              tipo="negro"
            />
          </Box>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pr: 1,
            }}
          >
            <InputCustom
              name="fecha_alta"
              label="Fecha alta"
              disabled
              value={datetimeToStringMinutes(usuario.fecha_alta)}
              onChange={handleInputChange}
              tipo="negro"
            />

            <InputCustom
              name="fecha_baja"
              label="Fecha baja"
              disabled
              value={
                datetimeToStringMinutes(usuario.fecha_baja)
                  ? datetimeToStringMinutes(usuario.fecha_baja)
                  : 'N/A'
              }
              onChange={handleInputChange}
              tipo="negro"
              labelSx="ml-2"
            />
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pr: 1,
            }}
          >
            <InputCustom
              name="saldo"
              label="Saldo (€)"
              type="number"
              value={usuario.saldo}
              onChange={handleInputChange}
              tipo="negro"
            />
            <InputCustom
              name="telefono"
              label="Teléfono"
              value={usuario.telefono}
              onChange={handleInputChange}
              tipo="negro"
              labelSx="ml-2"
            />
          </Box>
          {usuario.tipo == 1 && (
            <InputCustom
              name="numero_socio"
              autoComplete="false"
              label="Número socio"
              type="number"
              value={usuario.numero_socio}
              onChange={handleInputChange}
              tipo="negro"
              labelSx="!w-[49%]"
            />
          )}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              position: 'fixed',
              bottom: '90px',
              maxWidth: '900px',
              pl: 2,
              right: { xs: 10, sm: 'calc(50vw - 670px)' },
            }}
          >
            <ButtonCustom
              onClick={toggleUserActive}
              sx="mx-1 max-w-48"
              tipo={usuario.activo ? 'white-red' : 'white-green'}
            >
              {usuario.activo ? 'Dar de baja' : 'Dar de alta'}
            </ButtonCustom>
            <ButtonCustom onClick={handleSave} sx="mx-1 max-w-48" tipo="green">
              Guardar
            </ButtonCustom>
          </Box>
        </>
      )}
    </Box>
  )
}

export default GestionUsuarioIndividual
