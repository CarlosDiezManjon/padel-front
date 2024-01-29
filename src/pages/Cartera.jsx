import React, { useEffect } from 'react'
import useGetRequest from '../services/get.service'
import ButtonCustom from '../components/ButtonCustom'
import AddIcon from '@mui/icons-material/Add'

export default function Cartera() {
  const { getRequest, data } = useGetRequest()

  useEffect(() => {
    getRequest('/saldo')
  }, [])

  const handleRecargar = () => {}

  return (
    <div className="flex flex-col items-center w-full pt-1">
      <div className="flex flex-col items-center rounded shadow-md shadow-main-500 w-11/12 bg-main-100 p-2">
        <h1 className="font-bold text-2xl mb-4 text-main-500">Saldo disponible</h1>
        <div className="flex justify-center w-full">
          <h1 className="font-bold text-2xl mb-4 text-main-500">{data?.saldo} €</h1>
        </div>
      </div>
      <div className="mt-4 rounded shadow-md shadow-main-500 w-11/12 bg-main-100 p-2 items-center flex flex-col">
        <h1 className="font-bold text-2xl mb-4 text-main-500">Movimientos</h1>

        <div className="flex flex-col max-h-reserva"></div>
      </div>
    </div>
  )
}
