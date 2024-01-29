import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useStore from '../store/GeneralStore'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'

export default function CustomErrorDialog({ open, onClose, title, message }) {
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
    <Transition.Root show={false} as={Fragment}>
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
          <div className="fixed inset-0 bg-gray bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen h-screen overflow-y-auto flex items-center justify-center">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative transform overflow-hidden rounded-lg bg-white text-left 
              shadow-2xl  transition-all sm:my-8 sm:w-full sm:max-w-lg"
              >
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div
                      className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full
                     bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                    >
                      <ReportProblemIcon className="text-red-500" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray">
                        Error
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{message}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold
                     text-gray shadow-sm ring-1 ring-inset ring-neutral-600 hover:bg-gray-100 sm:mt-0 sm:w-auto"
                    onClick={onClose}
                    ref={cancelButtonRef}
                  >
                    Close
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
