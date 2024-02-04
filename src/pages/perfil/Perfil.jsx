import EditIcon from '@mui/icons-material/Edit'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ButtonCustom from '../../components/ButtonCustom'
import useGetRequest from '../../services/get.service'
import { dateUTCToLocalDateOnly, getUserType } from '../../utils/utils'
import BadgeCustom from '../../components/BadgeCustom'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CambioEmail from './CambioEmail'
import CambioPassword from './CambioPassword'
import useStore from '../../store/GeneralStore'

const Perfil = () => {
  const [usuario, setUsuario] = useState(null)
  const [currentTab, setCurrentTab] = useState('perfil')
  const { getRequest, data } = useGetRequest()
  const setError = useStore((state) => state.setError)

  useEffect(() => {
    getRequest('/perfil')
  }, [])

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setUsuario(data.usuario)
      }, 1000)
    }
  }, [data])

  const handleGoBack = (newEmail) => {
    setCurrentTab('perfil')
    if (newEmail !== false) {
      setError({
        message: 'Se ha enviado un email de confirmación a ' + newEmail,
        tipo: 'success',
      })
      setTimeout(() => {
        getRequest('/perfil')
      }, 3000)
    }
  }

  const handleChangeEmail = () => {
    // Add your logic to handle email change here
    setCurrentTab('email')
  }

  const handleChangePassword = () => {
    // Add your logic to handle password change here
    setCurrentTab('password')
  }

  return (
    <div className="flex flex-col items-center w-full h-full">
      {usuario ? (
        <div className="p-2 w-full text-white h-full max-w-lg">
          <div className="flex space-x-4">
            <div className="flex flex-col relative group">
              <img
                className="rounded-full h-36 w-36 cursor-pointer"
                src="https://xsgames.co/randomusers/avatar.php?g=male"
              />
              <div className="cursor-pointer flex justify-center items-center text-lg text-white opacity-0 group-hover:opacity-80 duration-100 absolute bg-neutral-700 h-36 w-36 top-0 right-0 rounded-full">
                Cambiar foto
              </div>
            </div>
            <div className="flex-1 space-y-5 py-1">
              <h6 className="mt-4 ml-1 text-3xl">{usuario.nombre + ' ' + usuario.apellidos}</h6>
              <h6 className="ml-2 text-xl">{usuario.username}</h6>
            </div>
          </div>
          <div className="flex w-full mt-4">
            <BadgeCustom
              tipo="transparente"
              sx=" !text-md"
              label={
                <>
                  {getUserType(usuario.tipo)}
                  {usuario.tipo == 1 && ' Nº ' + usuario.numero_socio}
                </>
              }
            />
          </div>

          <div className="flex w-full">
            <div className="flex flex-col w-8/12">
              <div className="flex mt-4">
                <h6 className="text-xl">Email</h6>
                <BadgeCustom
                  sx="ml-3"
                  tipo={usuario.email_verificado ? 'verde' : 'rojo'}
                  label={usuario.email_verificado ? 'Verificado' : 'Sin verificar'}
                />
              </div>

              <h6 className="text-lg mt-2">{usuario.email}</h6>
            </div>
            <div className="flex flex-col w-4/12">
              <h6 className="text-xl mt-4">Teléfono</h6>
              <h6 className="text-lg mt-2">{usuario.telefono}</h6>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col w-8/12">
              <h6 className="text-xl mt-4">Fecha alta</h6>
              <h6 className="text-lg mt-2">{dateUTCToLocalDateOnly(usuario.fecha_alta)}</h6>
            </div>
            <div className="flex flex-col w-4/12">
              <div className="flex items-center">
                <h6 className="text-xl mt-4">Saldo</h6>
                <ButtonCustom
                  onClick={handleChangePassword}
                  tipo="white-text"
                  sx="!p-0 !w-8 !h-8 !rounded-full text-2xl !border-0 !mt-4 !ml-2 hover:!bg-transparent"
                >
                  <AddCircleIcon />
                </ButtonCustom>
              </div>

              <h6 className="text-lg mt-2">{usuario.saldo + ' €'}</h6>
            </div>
          </div>
          <div className="flex flex-col mt-4">
            {currentTab === 'perfil' ? (
              <>
                <ButtonCustom onClick={handleChangeEmail} tipo="text-white" sx="mb-4 py-2">
                  Cambiar email
                </ButtonCustom>
                <ButtonCustom onClick={handleChangePassword} tipo="text-white" sx="py-2">
                  Cambiar contraseña
                </ButtonCustom>
              </>
            ) : currentTab === 'email' ? (
              <CambioEmail email={usuario.email} goBack={handleGoBack} />
            ) : (
              <CambioPassword goBack={handleGoBack} />
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-md p-4 max-w-sm w-full animate-pulse">
          <div className="flex space-x-4">
            <div className="flex flex-col">
              <div className="rounded-full bg-neutral-400 h-32 w-32"></div>
            </div>
            <div className="flex-1 space-y-12 py-1">
              <div className="h-5 bg-neutral-400 rounded mt-4"></div>
              <div className="h-2 bg-neutral-400 rounded"></div>
            </div>
          </div>
          <div>
            <div className="flex-1 space-y-12 py-1">
              <div className="h-5 bg-neutral-400 rounded mt-4"></div>
              <div className="h-4 bg-neutral-400 rounded"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Perfil
