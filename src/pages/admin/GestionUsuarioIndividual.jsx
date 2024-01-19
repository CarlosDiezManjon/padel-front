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
import { datetimeToStringMinutes } from '../../utils/utils'
import useStore from '../../store/GeneralStore'
import useDeleteRequest from '../../services/delete.service'
import { useNavigate, useParams } from 'react-router-dom'
import useGetRequest from '../../services/get.service'
import usePutRequest from '../../services/put.service'

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
    }
  }, [putData])

  useEffect(() => {
    if (deleteData) {
      setUsuario(deleteData.usuario)
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
            }}
          >
            <TextField
              sx={{ mr: '3%', width: '50%' }}
              margin="normal"
              name="username"
              label="Username"
              value={usuario.username}
              onChange={handleInputChange}
            />
            <TextField
              sx={{ width: '50%' }}
              margin="normal"
              name="nombre"
              label="Nombre"
              value={usuario.nombre}
              onChange={handleInputChange}
            />
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TextField
              sx={{ mr: '3%', width: '50%' }}
              margin="normal"
              name="apellidos"
              label="Apellidos"
              value={usuario.apellidos}
              onChange={handleInputChange}
            />
            <FormControl sx={{ width: '50%' }} margin="normal">
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
            </FormControl>
          </Box>

          <TextField
            sx={{ width: '100%' }}
            margin="normal"
            name="email"
            label="Email"
            value={usuario.email}
            onChange={handleInputChange}
          />

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TextField
              sx={{ mr: '3%' }}
              margin="normal"
              name="fecha_alta"
              label="Fecha alta"
              disabled
              value={datetimeToStringMinutes(usuario.fecha_alta)}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              name="fecha_baja"
              label="Fecha baja"
              disabled
              value={
                datetimeToStringMinutes(usuario.fecha_baja)
                  ? datetimeToStringMinutes(usuario.fecha_baja)
                  : 'N/A'
              }
              onChange={handleInputChange}
            />
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TextField
              sx={{ width: '50%', mr: '3%' }}
              margin="normal"
              name="saldo"
              label="Saldo"
              InputProps={{
                endAdornment: <InputAdornment position="end">€</InputAdornment>,
              }}
              value={usuario.saldo}
              onChange={handleInputChange}
            />
            <TextField
              sx={{ width: '50%' }}
              margin="normal"
              name="telefono"
              label="Teléfono"
              value={usuario.telefono}
              onChange={handleInputChange}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
              width: '100%',
              position: 'fixed',
              bottom: '70px',
              right: 10,
            }}
          >
            <Button variant="outlined" color="inherit" onClick={() => navigate(-1)} sx={{ m: 0.5 }}>
              Volver
            </Button>
            <Button
              variant="contained"
              color={usuario.activo ? 'error' : 'success'}
              onClick={toggleUserActive}
              sx={{ m: 0.5 }}
            >
              {usuario.activo ? 'Dar de baja' : 'Dar de alta'}
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave} sx={{ m: 0.5 }}>
              Guardar
            </Button>
          </Box>
        </>
      )}
    </Box>
  )
}

export default GestionUsuarioIndividual
