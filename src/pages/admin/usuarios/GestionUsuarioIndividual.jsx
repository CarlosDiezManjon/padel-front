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
  const [viewRecarga, setViewRecarga] = useState(false)
  const [recarga, setRecarga] = useState(0)
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

  const handleShowRecarga = () => {
    setViewRecarga(true)
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
              name="telefono"
              label="Teléfono"
              value={usuario.telefono}
              onChange={handleInputChange}
              tipo="negro"
            />
            <InputCustom
              name="saldo"
              label="Saldo"
              sufix="€"
              type="number"
              value={usuario.saldo}
              onChange={handleInputChange}
              tipo="negro"
              labelSx="ml-2"
              sx="text-right pr-8"
            />
          </Box>
          <div className="w-full flex items-center h-16">
            {usuario.tipo == 1 ? (
              <InputCustom
                name="numero_socio"
                autoComplete="false"
                label="Número socio"
                type="number"
                value={usuario.numero_socio}
                onChange={handleInputChange}
                tipo="negro"
                labelSx="!w-[48%] sm:!w-[49%]"
              />
            ) : (
              <div className="w-[48%]"></div>
            )}
            <div className="flex justify-end w-6/12">
              <ButtonCustom tipo="white" onClick={handleShowRecarga} sx="max-w-44 mr-1 h-14 ml-2">
                Recargar saldo
              </ButtonCustom>
            </div>
          </div>
          {viewRecarga && (
            <div className="w-full flex justify-end items-end">
              <InputCustom
                label="Introduzca la cantidad a recargar"
                name="recarga"
                type="number"
                step="5"
                min="0"
                placeholder="Introduce la cantidad a añadir"
                value={recarga}
                onChange={(e) => setRecarga(e.target.value)}
                sx="text-right"
                labelSx="mt-2 !w-3/12"
              />
              <ButtonCustom onClick={handleSave} sx="mx-1 max-w-48 h-10 mb-3" tipo="green">
                Recargar
              </ButtonCustom>
            </div>
          )}
          <div className="flex justify-end w-full fixed bottom-16 max-w-[900px] pl-2 right-2 md:right-[calc(50vw-450px)]">
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
          </div>
        </>
      )}
    </Box>
  )
}

export default GestionUsuarioIndividual
