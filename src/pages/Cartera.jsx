import React, { useEffect, useState } from 'react'
import useGetRequest from '../services/get.service'
import ButtonCustom from '../components/ButtonCustom'
import AddIcon from '@mui/icons-material/Add'
import { datetimeToStringMinutes } from '../utils/utils'
import { Divider } from '@mui/material'

export default function Cartera() {
  const { getRequest: getRequestSaldo, data: dataSaldo } = useGetRequest()
  const { getRequest: getRequestMovimientos, data: dataMovimientos } = useGetRequest()
  const [movimientos, setMovimientos] = useState([])

  useEffect(() => {
    getRequestSaldo('/saldo')
    getRequestMovimientos('/movimientos')
  }, [])

  useEffect(() => {
    if (dataMovimientos) {
      setMovimientos(dataMovimientos.movimientos)
    }
  }, [dataMovimientos])

  const handleRecargar = () => {}

  return (
    <div className="flex flex-col items-center w-full pt-1 h-full">
      <div className="flex items-end rounded w-11/12 p-2 text-white">
        <div className="flex flex-col w-8/12 items-center">
          <h1 className="font-bold text-2xl mb-4 ">Saldo disponible</h1>
          <h1 className="font-bold text-2xl ">{dataSaldo?.saldo} €</h1>
        </div>
        <div className="flex flex-col w-4/12">
          <button className="rounded-lg p-2 text-white bg-transparent border border-white  ml-4 hover:bg-main-800 transition duration-300 h-10 max-w-40">
            Añadir
          </button>
        </div>
      </div>
      <div className="w-11/12 items-center flex flex-col mt-4">
        <div className="rounded rounded-b-none w-full  items-start flex flex-col mb-4 p-2">
          <h1 className="font-bold text-2xl  text-white">Movimientos</h1>
        </div>
        <div className="flex flex-col w-full max-h-movimientos min-h-movimientos overflow-auto p-2 ">
          {movimientos.map((movimiento) => (
            <React.Fragment key={movimiento.id}>
              <div className={'flex flex-row justify-between w-full text-white font-medium'}>
                <div className="flex flex-col">
                  <h1 className="text-md mb-4 ">{datetimeToStringMinutes(movimiento.fecha)}</h1>
                  <h1 className="text-md">{movimiento.motivo}</h1>
                </div>
                <div className="flex flex-col">
                  <h1
                    className={
                      ' text-md mb-4 text-right ' +
                      (movimiento.tipo == 'Gasto' ? 'text-red-500' : 'text-main-500')
                    }
                  >
                    {(movimiento.tipo == 'Gasto' ? '-' : '+') + movimiento.importe} €
                  </h1>
                  <h1 className="text-sm text-right">
                    {movimiento.nombre_pista +
                      ' ' +
                      datetimeToStringMinutes(movimiento.fecha_reserva)}
                  </h1>
                </div>
              </div>
              <Divider className="bg-main-800" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
