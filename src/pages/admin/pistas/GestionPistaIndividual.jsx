import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ButtonCustom from '../../../components/ButtonCustom'
import InputCustom from '../../../components/InputCustom'
import SelectCustom from '../../../components/SelectCustom'
import useDeleteRequest from '../../../services/delete.service'
import useGetRequest from '../../../services/get.service'
import usePostRequest from '../../../services/post.service'
import usePutRequest from '../../../services/put.service'
import useStore from '../../../store/GeneralStore'
import { UTCTimeToLocalTime, localTimeToUTCTime } from '../../../utils/utils'

const emptyPista = {
  nombre: '',
  ubicacion: '',
  duracion_reserva: 60,
  precio: 0,
  hora_inicio: '00:00',
  hora_fin: '00:00',
  actividad_id: null,
  activo: true,
}

const GestionPistaIndividual = () => {
  const { id } = useParams()
  const [pista, setPista] = useState(emptyPista)
  const [actividades, setActividades] = useState([])
  const setConfirmationDialogContent = useStore((state) => state.setConfirmationDialogContent)
  const navigate = useNavigate()
  const { deleteRequest, data: deleteData } = useDeleteRequest()
  const { getRequest: getPista, data: dataPista } = useGetRequest()
  const { getRequest: getActividades, data: dataActividades } = useGetRequest()
  const { putRequest, data: putData } = usePutRequest()
  const { postRequest, data: postData } = usePostRequest()

  useEffect(() => {
    if (id !== 'nueva') {
      getPista(`/pistas/${id}`)
    }
    getActividades('/actividades')
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
    if (dataPista) {
      let copy = { ...dataPista.pista }
      copy.hora_fin = UTCTimeToLocalTime(copy.hora_fin)
      copy.hora_inicio = UTCTimeToLocalTime(copy.hora_inicio)
      setPista(copy)
    }
  }, [dataPista])

  useEffect(() => {
    if (dataActividades) {
      setActividades(dataActividades.actividades)
    }
  }, [dataActividades])

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
    <div className="w-full">
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

          <div className="w-full flex justify-start items-center">
            <SelectCustom
              id="duracion_reserva"
              name="duracion_reserva"
              value={pista.duracion_reserva}
              label="Duración Reserva"
              tipo="verde"
              onChange={handleInputChange}
              options={[
                { value: 30, label: '30 minutos' },
                { value: 60, label: '1 Hora' },
                { value: 90, label: '1 Hora y media' },
              ]}
            />
            <SelectCustom
              id="actividad_id"
              name="actividad_id"
              value={pista.actividad_id}
              label="Actividad"
              tipo="verde"
              sx="h-10"
              labelSx="ml-2"
              onChange={handleInputChange}
              options={actividades.map((act) => ({ value: act.id, label: act.nombre }))}
            />
          </div>

          <div className="w-full flex justify-start items-center">
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
          </div>
          <div className="flex justify-end w-full fixed bottom-16 max-w-[900px] pl-2 right-2 md:right-[calc(50vw-450px)]">
            <ButtonCustom
              onClick={togglePistaActive}
              sx="mx-1 max-w-48"
              tipo={pista.activo ? 'white-red' : 'white-green'}
            >
              {pista.activo ? 'Desactivar' : 'Activar'}
            </ButtonCustom>
            <ButtonCustom onClick={handleSave} sx="mx-1 max-w-48" tipo="green">
              Guardar
            </ButtonCustom>
          </div>
        </>
      )}
    </div>
  )
}

export default GestionPistaIndividual
