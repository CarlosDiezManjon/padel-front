import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ButtonCustom from '../../components/ButtonCustom'
import InputCustom from '../../components/InputCustom'
import useDeleteRequest from '../../services/delete.service'
import useGetRequest from '../../services/get.service'
import usePostRequest from '../../services/post.service'
import usePutRequest from '../../services/put.service'
import useStore from '../../store/GeneralStore'
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
          <InputCustom
            name="nombre"
            label="Nombre"
            value={pista.nombre}
            onChange={handleInputChange}
            tipo="negro"
          />
          <InputCustom
            name="ubicacion"
            label="Ubicación"
            value={pista.ubicacion}
            onChange={handleInputChange}
            tipo="negro"
          />
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <InputCustom
              name="duracion_reserva"
              type="number"
              label="Duración Reserva(min)"
              value={pista.duracion_reserva}
              onChange={handleInputChange}
              tipo="negro"
            />
            <InputCustom
              name="precio"
              label="Precio(€)"
              type="number"
              value={pista.precio}
              onChange={handleInputChange}
              tipo="negro"
              labelSx="ml-2"
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
            {/* <TextField
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
            /> */}
            <InputCustom
              name="hora_inicio"
              label="Hora Inicio"
              type="time"
              value={pista.hora_inicio}
              onChange={handleInputChange}
              tipo="negro"
            />
            <InputCustom
              name="hora_fin"
              label="Hora Fin"
              type="time"
              value={pista.hora_fin}
              onChange={handleInputChange}
              tipo="negro"
              labelSx="ml-2"
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              position: 'fixed',
              bottom: '70px',
              maxWidth: '900px',
              pl: 2,
              right: { xs: 10, sm: 'calc(50vw - 450px)' },
            }}
          >
            <ButtonCustom
              onClick={togglePistaActive}
              sx="mx-1"
              tipo={pista.activo ? 'white-red' : 'white-green'}
            >
              {pista.activo ? 'Desactivar' : 'Activar'}
            </ButtonCustom>
            <ButtonCustom onClick={handleSave} sx="mx-1" tipo="green">
              Guardar
            </ButtonCustom>
          </Box>
        </>
      )}
    </Box>
  )
}

export default GestionPistaIndividual
