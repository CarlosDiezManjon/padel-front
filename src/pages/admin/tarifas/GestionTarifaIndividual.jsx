import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ButtonCustom from '../../../components/ButtonCustom'
import InputCustom from '../../../components/InputCustom'
import useDeleteRequest from '../../../services/delete.service'
import useGetRequest from '../../../services/get.service'
import usePostRequest from '../../../services/post.service'
import usePutRequest from '../../../services/put.service'
import useStore from '../../../store/GeneralStore'
import { UTCTimeToLocalTime, localTimeToUTCTime } from '../../../utils/utils'
import SelectCustom from '../../../components/SelectCustom'

const emptyTarifa = {
  nombre: '',
  tipo_dia: 'TODO',
  precio: 0,
  hora_inicio: '00:00',
  hora_fin: '00:00',
  activo: true,
}

const GestionTarifaIndividual = () => {
  const { id } = useParams()
  const [tarifa, setTarifa] = useState(emptyTarifa)
  const setConfirmationDialogContent = useStore((state) => state.setConfirmationDialogContent)
  const navigate = useNavigate()
  const { deleteRequest, data: deleteData } = useDeleteRequest()
  const { getRequest, data: getData } = useGetRequest()
  const { putRequest, data: putData } = usePutRequest()
  const { postRequest, data: postData } = usePostRequest()

  useEffect(() => {
    if (id !== 'nueva') {
      getRequest(`/tarifas/${id}`)
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
      let copy = { ...getData.tarifa }
      copy.hora_fin = UTCTimeToLocalTime(copy.hora_fin)
      copy.hora_inicio = UTCTimeToLocalTime(copy.hora_inicio)
      setTarifa(copy)
    }
  }, [getData])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setTarifa((prevTarifa) => ({
      ...prevTarifa,
      [name]: value,
    }))
  }
  const toggleTarifaActive = () => {
    setConfirmationDialogContent({
      title: tarifa.activo ? 'Desactivar' : 'Activar',
      message: tarifa.activo
        ? '¿Está seguro de que desea desactivar la tarifa?'
        : '¿Está seguro de que desea activar la tarifa?',
      onSuccess: () => {
        tarifa.activo
          ? deleteRequest('/tarifas', tarifa.id)
          : putRequest('/activar-tarifa/' + tarifa.id)
        setConfirmationDialogContent(null)
      },
      onCancel: () => setConfirmationDialogContent(null),
    })
  }

  const handleSave = () => {
    let copy = { ...tarifa }
    copy.hora_fin = localTimeToUTCTime(tarifa.hora_fin)
    copy.hora_inicio = localTimeToUTCTime(tarifa.hora_inicio)
    if (id === 'nueva') {
      postRequest('/tarifas', copy)
    } else {
      putRequest('/tarifas/' + tarifa.id, copy)
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      {tarifa && (
        <>
          <InputCustom
            name="nombre"
            label="Nombre"
            value={tarifa.nombre}
            onChange={handleInputChange}
            tipo="negro"
          />

          <div className="w-full flex justify-start items-center">
            <SelectCustom
              id="tio_dia"
              name="tio_dia"
              value={tarifa.tipo_dia}
              label="Días"
              tipo="verde"
              onChange={handleInputChange}
              options={[
                { value: 'SEMANA', label: 'Lunes a Viernes' },
                { value: 'FINDE', label: 'Fin de semana' },
                { value: 'TODO', label: 'Lunes a Domingo' },
              ]}
            />
            <InputCustom
              name="precio"
              label="Precio (€)"
              type="number"
              value={tarifa.precio}
              onChange={handleInputChange}
              tipo="negro"
              labelSx="ml-2"
            />
          </div>

          <div className="w-full flex justify-start items-center">
            <InputCustom
              name="hora_inicio"
              label="Hora Inicio"
              type="time"
              value={tarifa.hora_inicio}
              onChange={handleInputChange}
              tipo="negro"
            />
            <InputCustom
              name="hora_fin"
              label="Hora Fin"
              type="time"
              value={tarifa.hora_fin}
              onChange={handleInputChange}
              tipo="negro"
              labelSx="ml-2"
            />
          </div>
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
              onClick={toggleTarifaActive}
              sx="mx-1"
              tipo={tarifa.activo ? 'white-red' : 'white-green'}
            >
              {tarifa.activo ? 'Desactivar' : 'Activar'}
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

export default GestionTarifaIndividual
