import React, { useEffect, useState } from 'react'
import useGetRequest from '../services/get.service'
import ButtonCustom from '../components/ButtonCustom'
import AddIcon from '@mui/icons-material/Add'
import { datetimeToStringMinutes } from '../utils/utils'
import { Divider } from '@mui/material'
import SkeletonCustom from '../components/SkeletonCustom'
import useStore from '../store/GeneralStore'

export default function Cartera() {
  const { getRequest: getRequestSaldo, data: dataSaldo } = useGetRequest()
  const { getRequest: getRequestMovimientos, data: dataMovimientos } = useGetRequest()
  const [movimientos, setMovimientos] = useState([])
  const isLoading = useStore((state) => state.isLoading)

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
          <h1 className="font-bold text-2xl ">{dataSaldo?.saldo ? dataSaldo.saldo : 0} €</h1>
        </div>
        <div className="flex flex-col w-4/12">
          <ButtonCustom tipo="text-white" sx="!w-32">
            Añadir saldo
          </ButtonCustom>
        </div>
      </div>
      <div className="w-full items-center flex flex-col mt-4">
        <div className="rounded rounded-b-none w-full  items-start flex flex-col mb-4 p-2">
          <h1 className="font-bold text-2xl  text-white">Movimientos</h1>
        </div>
        <div className="flex flex-col w-full max-h-movimientos min-h-movimientos overflow-auto p-2 rounded-md">
          {movimientos.length == 0 || isLoading ? (
            <>
              <SkeletonCustom />
              <SkeletonCustom />
              <SkeletonCustom />
              <SkeletonCustom />
              <SkeletonCustom />
            </>
          ) : (
            <>
              {movimientos.map((movimiento) => (
                <React.Fragment key={movimiento.id}>
                  <div
                    className={
                      'flex flex-col justify-between w-full text-black text-lg font-medium bg-white rounded-md mb-2 p-2'
                    }
                  >
                    <div className="flex mb-4 justify-between">
                      <h1>{datetimeToStringMinutes(movimiento.fecha)}</h1>
                      <h1
                        className={
                          'text-right ' +
                          (movimiento.tipo == 'Gasto' ? 'text-red-500' : 'text-main-500')
                        }
                      >
                        {(movimiento.tipo == 'Gasto' ? '-' : '+') + movimiento.importe} €
                      </h1>
                    </div>
                    <div className="flex justify-between items-end">
                      <h1>{movimiento.motivo}</h1>

                      <h1 className="text-right">
                        {movimiento.nombre_pista +
                          ' ' +
                          datetimeToStringMinutes(movimiento.fecha_reserva)}
                      </h1>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
