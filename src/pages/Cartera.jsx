import React, { useEffect, useState } from 'react'
import SkeletonCustom from '../components/SkeletonCustom'
import useGetRequest from '../services/get.service'
import useStore from '../store/GeneralStore'
import { dateUTCToLocalDateOnly, dateUTCToLocalDateTime, dateUTCToLocalTime } from '../utils/utils'
import MovimientoItem from './cartera/MovimientoItem'

export default function Cartera() {
  const { getRequest: getRequestSaldo, data: dataSaldo } = useGetRequest()
  const { getRequest: getRequestMovimientos, data: dataMovimientos } = useGetRequest()
  const [movimientos, setMovimientos] = useState(null)
  const [saldo, setSaldo] = useState(0)
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

  useEffect(() => {
    if (dataSaldo) {
      setSaldo(dataSaldo.saldo)
    }
  }, [dataSaldo])

  return (
    <div className="flex flex-col items-center w-full pt-1 h-full">
      <div className="flex justify-center rounded w-full p-2 text-text">
        <div className="flex flex-col w-8/12 items-center">
          <h1 className="font-regular text-2xl mb-4 ">Saldo disponible</h1>
          <h1 className="font-regular text-2xl ">{saldo} €</h1>
        </div>
        {/* <div className="flex flex-col w-4/12">
          <ButtonCustom tipo="text-white" sx="!w-32">
            Añadir saldo
          </ButtonCustom>
        </div> */}
      </div>
      <div className="w-full items-center flex flex-col mt-2">
        <div className="rounded rounded-b-none w-full  items-start flex flex-col mb-2 p-2">
          <h1 className="font-bold text-2xl  text-text">Movimientos</h1>
        </div>
        <div className="flex flex-col w-full max-h-movimientos min-h-movimientos overflow-auto p-2 rounded-md">
          {isLoading ? (
            <>
              <SkeletonCustom />
              <SkeletonCustom />
              <SkeletonCustom />
              <SkeletonCustom />
            </>
          ) : movimientos != null && movimientos.length == 0 ? (
            <h1 className="text-white">No hay movimientos</h1>
          ) : (
            <>
              {movimientos != null &&
                movimientos.map((movimiento) => (
                  <MovimientoItem key={movimiento.id} movimiento={movimiento} />
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
