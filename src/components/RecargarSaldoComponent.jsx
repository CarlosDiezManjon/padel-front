import React, { useEffect, useState } from 'react'
import ButtonCustom from './ButtonCustom'
import InputCustom from './InputCustom'
import usePutRequest from '../services/put.service'

const RecargaSaldoComponent = ({ usuario, open, onCancel, onSuccess }) => {
  const [recarga, setRecarga] = useState('')
  const { putRequest, data } = usePutRequest()

  const handleSave = () => {
    putRequest('/saldo', { usuario_id: usuario.id, importe: recarga })
  }

  useEffect(() => {
    if (data) {
      onSuccess(data.usuarioUpdated)
    }
  }, [data])
  return (
    <div className={`fixed z-10 inset-0 overflow-y-auto ${open ? '' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-2xl leading-10 font-medium text-gray-900">
                  Recarga de saldo usuario {usuario.nombre}
                </h3>
                <div className="mt-2 flex items-center w-full justify-center">
                  <p className="text-md text-black">Cantidad a recargar</p>
                  <InputCustom
                    tipo="border-black"
                    name="recarga"
                    type="number"
                    step="5"
                    sufix="€"
                    min="0"
                    value={recarga}
                    onChange={(e) => setRecarga(e.target.value)}
                    sx="text-right pr-8"
                    labelSx=" !w-5/12 ml-3 items-center flex"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" px-4 py-4 sm:px-6 flex">
            <ButtonCustom onClick={onCancel} tipo="red" sx="mr-2">
              Cancelar
            </ButtonCustom>
            <ButtonCustom onClick={handleSave} disabled={recarga == '' || recarga == 0}>
              Confirmar
            </ButtonCustom>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecargaSaldoComponent