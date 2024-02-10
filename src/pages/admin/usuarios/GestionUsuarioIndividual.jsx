import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ButtonCustom from '../../../components/ButtonCustom'
import InputCustom from '../../../components/InputCustom'
import RecargaSaldoComponent from '../../../components/RecargarSaldoComponent'
import SelectCustom from '../../../components/SelectCustom'
import useDeleteRequest from '../../../services/delete.service'
import useGetRequest from '../../../services/get.service'
import usePutRequest from '../../../services/put.service'
import useStore from '../../../store/GeneralStore'
import { datetimeToStringMinutes } from '../../../utils/utils'

const GestionUsuarioIndividual = () => {
  const { id } = useParams()
  const [usuario, setUsuario] = useState(null)
  const [openRecarga, setOpenRecarga] = useState(false)

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
    <div className="w-full">
      {usuario && (
        <>
          <div className="w-full flex justify-start items-center">
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
          </div>
          <div className="w-full flex justify-start items-center">
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
          </div>
          <div className="w-full flex justify-start items-center">
            <InputCustom
              name="email"
              label="Email"
              value={usuario.email}
              onChange={handleInputChange}
              tipo="negro"
            />
          </div>

          <div className="w-full flex justify-start items-center">
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
          </div>
          <div className="w-full flex justify-start items-center">
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
              disabled
              type="number"
              value={usuario.saldo}
              onChange={handleInputChange}
              tipo="negro"
              labelSx="ml-2"
              sx="text-right pr-8"
            />
          </div>
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
              <ButtonCustom
                tipo="white"
                onClick={() => setOpenRecarga(true)}
                sx="max-w-44 mr-1 h-10 mt-3 ml-2"
              >
                Recargar saldo
              </ButtonCustom>
            </div>
          </div>

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
          <RecargaSaldoComponent
            open={openRecarga}
            onCancel={() => setOpenRecarga(false)}
            onSuccess={(usuarioUpdated) => {
              setUsuario(usuarioUpdated)
              setOpenRecarga(false)
            }}
            usuario={usuario}
          />
        </>
      )}
    </div>
  )
}

export default GestionUsuarioIndividual
