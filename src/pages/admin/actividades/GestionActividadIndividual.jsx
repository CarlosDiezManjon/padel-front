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

const emptyActividad = {
  nombre: '',
  descripcion: '',
  activo: true,
}

const GestionActividadIndividual = () => {
  const { id } = useParams()
  const [actividad, setActividad] = useState(emptyActividad)
  const setConfirmationDialogContent = useStore((state) => state.setConfirmationDialogContent)
  const navigate = useNavigate()
  const { deleteRequest, data: deleteData } = useDeleteRequest()
  const { getRequest, data: getData } = useGetRequest()
  const { putRequest, data: putData } = usePutRequest()
  const { postRequest, data: postData } = usePostRequest()

  useEffect(() => {
    if (id !== 'nueva') {
      getRequest(`/actividades/${id}`)
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
      let copy = { ...getData.actividad }
      copy.hora_fin = UTCTimeToLocalTime(copy.hora_fin)
      copy.hora_inicio = UTCTimeToLocalTime(copy.hora_inicio)
      setActividad(copy)
    }
  }, [getData])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setActividad((prevActividad) => ({
      ...prevActividad,
      [name]: value,
    }))
  }
  const toggleActividadActive = () => {
    setConfirmationDialogContent({
      title: actividad.activo ? 'Desactivar' : 'Activar',
      message: actividad.activo
        ? '¿Está seguro de que desea desactivar la actividad?'
        : '¿Está seguro de que desea activar la actividad?',
      onSuccess: () => {
        actividad.activo
          ? deleteRequest('/actividades', actividad.id)
          : putRequest('/activar-actividad/' + actividad.id)
        setConfirmationDialogContent(null)
      },
      onCancel: () => setConfirmationDialogContent(null),
    })
  }

  const handleSave = () => {
    if (id === 'nueva') {
      postRequest('/actividades', actividad)
    } else {
      putRequest('/actividades/' + actividad.id, actividad)
    }
  }

  return (
    <div className="w-full">
      {actividad && (
        <>
          <InputCustom
            name="nombre"
            label="Nombre"
            value={actividad.nombre}
            onChange={handleInputChange}
            tipo="negro"
          />
          <InputCustom
            name="descripcion"
            label="Descripción"
            value={actividad.descripcion}
            onChange={handleInputChange}
            tipo="negro"
          />

          <div className="flex justify-end w-full fixed bottom-16 max-w-[900px] pl-2 right-2 md:right-[calc(50vw-450px)]">
            <ButtonCustom
              onClick={toggleActividadActive}
              sx="mx-1 max-w-48"
              tipo={actividad.activo ? 'white-red' : 'white-green'}
            >
              {actividad.activo ? 'Desactivar' : 'Activar'}
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

export default GestionActividadIndividual
