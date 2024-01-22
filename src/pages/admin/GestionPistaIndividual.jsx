import React, { useEffect, useState } from 'react'
import { TextField, Button, Box, InputAdornment, FormControl } from '@mui/material'
import useStore from '../../store/GeneralStore'
import useDeleteRequest from '../../services/delete.service'
import { useNavigate, useParams } from 'react-router-dom'
import useGetRequest from '../../services/get.service'
import usePutRequest from '../../services/put.service'
import usePostRequest from '../../services/post.service'
import { UTCTimeToLocalTime, localTimeToUTCTime } from '../../utils/utils'

const emptyPista = {
  nombre: '',
  ubicacion: '',
  duracion_reserva: 0,
  precio: 0,
  hora_inicio: '00:00',
  hora_fin: '00:00',
  activo: true,
}

const GestionPistaIndividual = () => {
  const { id } = useParams()
  const [pista, setPista] = useState(emptyPista)
  const setConfirmationDialogContent = useStore((state) => state.setConfirmationDialogContent)
  const navigate = useNavigate()
  const { deleteRequest, data: deleteData } = useDeleteRequest()
  const { getRequest, data: getData } = useGetRequest()
  const { putRequest, data: putData } = usePutRequest()
  const { postRequest, data: postData } = usePostRequest()

  useEffect(() => {
    if (id === 'nueva') {
    } else {
      getRequest(`/pistas/${id}`)
    }
  }, [])

  useEffect(() => {
    if (putData) {
      navigate(-1)
    }
  }, [putData])

  useEffect(() => {
    if (postData) {
      navigate(-1)
    }
  }, [postData])

  useEffect(() => {
    if (deleteData) {
      navigate(-1)
    }
  }, [deleteData])

  useEffect(() => {
    if (getData) {
      let copy = { ...getData.pista }
      copy.hora_fin = UTCTimeToLocalTime(copy.hora_fin)
      copy.hora_inicio = UTCTimeToLocalTime(copy.hora_inicio)
      setPista(copy)
    }
  }, [getData])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setPista((prevPista) => ({
      ...prevPista,
      [name]: value,
    }))
  }
  const togglePistaActive = () => {
    setConfirmationDialogContent({
      title: pista.activo ? 'Desactivar' : 'Activar',
      message: pista.activo
        ? '¿Está seguro de que desea desactivar la pista?'
        : '¿Está seguro de que desea activar la pista?',
      onSuccess: () => {
        pista.activo ? deleteRequest('/pistas', pista.id) : putRequest('/activar-pista/' + pista.id)
        setConfirmationDialogContent(null)
      },
      onCancel: () => setConfirmationDialogContent(null),
    })
  }

  const handleSave = () => {
    let copy = { ...pista }
    copy.hora_fin = localTimeToUTCTime(pista.hora_fin)
    copy.hora_inicio = localTimeToUTCTime(pista.hora_inicio)
    if (id === 'nueva') {
      postRequest('/pistas', copy)
    } else {
      putRequest('/pistas/' + pista.id, copy)
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      {pista && (
        <>
          <TextField
            sx={{ width: '100%' }}
            margin="normal"
            name="nombre"
            label="Nombre"
            value={pista.nombre}
            onChange={handleInputChange}
          />
          <TextField
            sx={{ width: '100%' }}
            margin="normal"
            name="ubicacion"
            label="Ubicación"
            value={pista.ubicacion}
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
              sx={{ mr: '3%', width: '50%' }}
              type="number"
              margin="normal"
              name="duracion_reserva"
              label="Duración Reserva"
              value={pista.duracion_reserva}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: <InputAdornment position="end">h</InputAdornment>,
              }}
            />
            <TextField
              sx={{ width: '50%' }}
              type="number"
              margin="normal"
              name="precio"
              label="Precio"
              InputProps={{
                endAdornment: <InputAdornment position="end">€</InputAdornment>,
              }}
              value={pista.precio}
              onChange={handleInputChange}
            />
          </Box>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
            }}
          >
            <TextField
              sx={{ mr: '3%', width: '50%' }}
              margin="normal"
              name="hora_inicio"
              label="Hora Inicio"
              type="time"
              value={pista.hora_inicio}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
            <TextField
              sx={{ width: '50%' }}
              margin="normal"
              name="hora_fin"
              label="Hora Fin"
              type="time"
              value={pista.hora_fin}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
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
            {id !== 'nueva' && (
              <Button
                variant="contained"
                color={pista.activo ? 'error' : 'success'}
                onClick={togglePistaActive}
                sx={{ m: 0.5 }}
              >
                {pista.activo ? 'Desactivar' : 'Activar'}
              </Button>
            )}

            <Button variant="contained" color="primary" onClick={handleSave} sx={{ m: 0.5 }}>
              Guardar
            </Button>
          </Box>
        </>
      )}
    </Box>
  )
}

export default GestionPistaIndividual
