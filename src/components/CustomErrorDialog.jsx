import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useStore from '../store/GeneralStore'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead'
import ButtonCustom from './ButtonCustom'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

export default function CustomErrorDialog({ open, onClose, title, message, tipo = 'error' }) {
  const cancelButtonRef = useRef(null)
  const clearState = useStore((state) => state.clearState)
  const navigate = useNavigate()
  const handleLogout = () => {
    clearState()
    localStorage.removeItem('token')
    navigate('/')
  }
  useEffect(() => {
    if (message == 'Sesión caducada') handleLogout()
  }, [message])

  const getTitle = () => {
    switch (tipo) {
      case 'error':
        return 'Error'
      case 'registro':
        return 'Registro exitoso'
      case 'email':
        return 'Email cambiado'
      case 'password':
        return 'Contraseña cambiada'
      default:
        return 'Error'
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-0"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-0"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen h-screen overflow-y-auto flex items-center justify-center">
          <div className="flex min-h-full justify-center text-center items-center p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-0"
              enterFrom="opacity-0 translate-y-4 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-0"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-4 scale-95"
            >
              <Dialog.Panel
                className="relative transform overflow-hidden rounded-lg bg-white text-left 
          shadow-2xl  transition-all my-8  max-w-xs sm:max-w-lg"
              >
                <div className="px-4 pb-4 pt-5 p-6">
                  <div className="flex items-start">
                    {tipo == 'error' ? (
                      <div
                        className="mx-auto flex  flex-shrink-0 items-center justify-center rounded-full
                      bg-red-100 h-12 w-12"
                      >
                        <ReportProblemIcon className="text-red-500" />
                      </div>
                    ) : (
                      <div
                        className="mx-auto flex  flex-shrink-0 items-center justify-center rounded-full
                            bg-green-100 h-12 w-12"
                      >
                        {tipo == 'email' ? (
                          <MarkEmailReadIcon className="text-green-500" />
                        ) : (
                          <ThumbUpIcon className="text-green-500" />
                        )}
                      </div>
                    )}
                    {/* <div
                      className="mx-auto flex  flex-shrink-0 items-center justify-center rounded-full
                 bg-red-100 h-12 w-12"
                    >
                      <ReportProblemIcon className="text-red-500" />
                    </div> */}
                    <div className="ml-4 mt-0 text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray">
                        {getTitle(tipo)}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{message}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-3 flex flex-row-reverse px-6">
                  <ButtonCustom tipo="text-black" onClick={onClose} ref={cancelButtonRef} t>
                    Cerrar
                  </ButtonCustom>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
