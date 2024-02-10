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
  actividad_id: null,
  activo: true,
}

const GestionTarifaIndividual = () => {
  const { id } = useParams()
  const [tarifa, setTarifa] = useState(emptyTarifa)
  const [actividades, setActividades] = useState([])
  const setConfirmationDialogContent = useStore((state) => state.setConfirmationDialogContent)
  const navigate = useNavigate()
  const { deleteRequest, data: deleteData } = useDeleteRequest()
  const { getRequest: getTarifa, data: dataTarifa } = useGetRequest()
  const { getRequest: getActividades, data: dataActividades } = useGetRequest()

  const { putRequest, data: putData } = usePutRequest()
  const { postRequest, data: postData } = usePostRequest()

  useEffect(() => {
    if (id !== 'nueva') {
      getTarifa(`/tarifas/${id}`)
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
    if (dataTarifa) {
      let copy = { ...dataTarifa.tarifa }
      copy.hora_fin = UTCTimeToLocalTime(copy.hora_fin)
      copy.hora_inicio = UTCTimeToLocalTime(copy.hora_inicio)
      setTarifa(copy)
    }
  }, [dataTarifa])

  useEffect(() => {
    if (dataActividades) {
      setActividades(dataActividades.actividades)
    }
  }, [dataActividades])

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
    <div className="w-full">
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
              id="tipo_dia"
              name="tipo_dia"
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
            <SelectCustom
              id="actividad_id"
              name="actividad_id"
              value={tarifa.actividad_id}
              label="Actividad"
              tipo="verde"
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
          <div className="w-full flex">
            <InputCustom
              name="precio"
              sx="text-right pr-8"
              label="Precio"
              sufix="€"
              type="number"
              value={tarifa.precio}
              onChange={handleInputChange}
              tipo="negro"
              labelSx="!w-[49%] sm:!w-[49.5%]"
            />
          </div>

          <div className="flex justify-end w-full fixed bottom-16 max-w-[900px] pl-2 right-2 md:right-[calc(50vw-450px)]">
            <ButtonCustom
              onClick={toggleTarifaActive}
              sx="mx-1 max-w-48"
              tipo={tarifa.activo ? 'white-red' : 'white-green'}
            >
              {tarifa.activo ? 'Desactivar' : 'Activar'}
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

export default GestionTarifaIndividual
