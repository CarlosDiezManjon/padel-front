import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useStore from '../store/GeneralStore'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead'

export default function CustomErrorDialog({ open, onClose, title, message, tipo = 'error' }) {
  const cancelButtonRef = useRef(null)

  const setToken = useStore((state) => state.setToken)
  const setUser = useStore((state) => state.setUser)
  const navigate = useNavigate()
  const handleLogout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    navigate('/')
  }
  useEffect(() => {
    if (message == 'Sesión caducada') handleLogout()
  }, [message])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-500 bg-opacity-60 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen h-screen overflow-y-auto flex items-center justify-center">
          <div className="flex min-h-full justify-center text-center items-center p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-4 scale-95"
            >
              <Dialog.Panel
                className="relative transform overflow-hidden rounded-lg bg-white text-left 
          shadow-2xl  transition-all my-8 w-full max-w-lg"
              >
                <div className="bg-white px-4 pb-4 pt-5 p-6">
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
                        <MarkEmailReadIcon className="text-green-500" />
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
                        {tipo == 'error' ? 'Error' : 'Registro exitoso'}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{message}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-3 flex flex-row-reverse px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold
                 text-gray shadow-sm ring-1 ring-inset ring-neutral-600 hover:bg-gray-100 mt-0"
                    onClick={onClose}
                    ref={cancelButtonRef}
                  >
                    Cerrar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
