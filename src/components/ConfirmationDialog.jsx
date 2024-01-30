import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import useStore from '../store/GeneralStore'
import ButtonCustom from './ButtonCustom'

const ConfirmationDialog = () => {
  const confirmationDialogContent = useStore((state) => state.confirmationDialogContent)
  return (
    // <Dialog open={confirmationDialogContent != null} onClose={confirmationDialogContent?.onCancel}>
    //   <DialogTitle>{confirmationDialogContent?.title}</DialogTitle>
    //   <DialogContent>{confirmationDialogContent?.message}</DialogContent>
    //   <DialogActions>
    //     <Button onClick={confirmationDialogContent?.onCancel} color="inherit" variant="text">
    //       Cancelar
    //     </Button>
    //     <Button onClick={confirmationDialogContent?.onSuccess} color="primary" variant="outlined">
    //       Confirmar
    //     </Button>
    //   </DialogActions>
    // </Dialog>
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${confirmationDialogContent != null ? '' : 'hidden'}`}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {confirmationDialogContent?.title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{confirmationDialogContent?.message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" px-4 py-3 sm:px-6 flex">
            <ButtonCustom onClick={confirmationDialogContent?.onCancel} tipo="white-red" sx="mr-2">
              Cancelar
            </ButtonCustom>
            <ButtonCustom onClick={confirmationDialogContent?.onSuccess}>Confirmar</ButtonCustom>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationDialog
