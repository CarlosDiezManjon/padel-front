import { Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonCustom from '../components/ButtonCustom'
import useGetRequest from '../services/get.service'
import usePostRequest from '../services/post.service'
import useStore from '../store/GeneralStore'
import { dateUTCToLocalDateOnly, dateUTCToLocalTime } from '../utils/utils'
import usePutRequest from '../services/put.service'

export default function Cancelacion() {
  const [saldo, setSaldo] = useState(0)
  const [total, setTotal] = useState(0)
  const user = useStore((state) => state.user)
  const reservasToCancel = useStore((state) => state.reservasToCancel)
  const clearReservasSelected = useStore((state) => state.clearReservasSelected)
  const clearReservasToCancel = useStore((state) => state.clearReservasToCancel)
  const { getRequest, data } = useGetRequest()
  const { putRequest, data: dataPost } = usePutRequest()
  const navigate = useNavigate()

  useEffect(() => {
    getRequest('/saldo')
    console.log(reservasToCancel)
  }, [])

  const handleCancelar = () => {
    let reservaToServer = [...reservasToCancel]
    reservaToServer.forEach((reserva) => {
      delete reserva.pista.parrilla
    })
    let importeTotal = reservaToServer.reduce(
      (acc, reserva) => acc + parseFloat(reserva.reserva.importe),
      0,
    )
    putRequest('/cancel-reservas', { reservas: reservaToServer, importeTotal: importeTotal })
  }

  useEffect(() => {
    if (dataPost) {
      clearReservasSelected()
      clearReservasToCancel()
      navigate(-1)
    }
  }, [dataPost])

  useEffect(() => {
    if (data) {
      setSaldo(parseFloat(data.saldo))
      setTotal(
        reservasToCancel.reduce((acc, reserva) => acc + parseFloat(reserva.reserva.importe), 0),
      )
    }
  }, [data])

  return (
    <div className="w-full p-2">
      {reservasToCancel.length != 0 ? (
        <>
          {user.tipo == 0 ? (
            <h5 className="font-bold text-2xl mb-4 text-white text-center">
              Cancelación administrador
            </h5>
          ) : (
            <h5 className="font-bold text-2xl mb-4 text-white text-center">
              Se van a cancelar las siguientes reservas {user.nombre}
            </h5>
          )}

          <ul className="max-h-reserva min-h-reserva overflow-auto ">
            {reservasToCancel
              .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
              .map((reserva, index) => (
                <div
                  className="w-full flex flex-col bg-white rounded-md mt-2 p-2 text-lg"
                  key={reserva.startTime + '-' + index}
                >
                  <div className="w-full p-2 flex justify-between">
                    <p className="flex w-6/12">
                      <p className="font-bold mr-1">Fecha</p>
                      {dateUTCToLocalDateOnly(reserva.startTime)}
                    </p>
                    <p className="flex w-5/12">
                      {dateUTCToLocalTime(reserva.startTime)} -{' '}
                      {dateUTCToLocalTime(reserva.endTime)}
                    </p>
                  </div>
                  <div className="w-full p-2 flex justify-between">
                    <p className="flex w-6/12">
                      <p className="font-bold mr-1">Lugar</p>
                      {reserva.pista.nombre}
                    </p>
                    {user.tipo == 0 ? (
                      <p className="flex w-6/12">
                        <p className="font-bold mr-1">Usuario</p>
                        {reserva.reserva.nombre_usuario}
                      </p>
                    ) : (
                      <p className="flex w-6/12">
                        <p className="font-bold mr-1">Precio</p>
                        {reserva.reserva.importe} €
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </ul>

          <p className="my-2 text-right text-white pr-1 text-lg">Importe a devolver: {total} €</p>
          {user.tipo != 0 ? (
            <>
              <p className="my-2 text-right text-white pr-1 text-lg">Saldo actual: {saldo} €</p>
              <p className="my-2 text-right text-white pr-1 text-lg">
                Saldo tras cancelación: {saldo + total} €
              </p>
            </>
          ) : (
            <div className="h-16"></div>
          )}

          <div className="flex justify-end mt-3">
            <ButtonCustom onClick={() => navigate(-1)} sx="mr-4" tipo="red">
              Cancelar
            </ButtonCustom>
            <ButtonCustom disabled={reservasToCancel.length == 0} onClick={handleCancelar}>
              Confirmar cancelación
            </ButtonCustom>
          </div>
        </>
      ) : (
        <h5 className="font-bold text-2xl mb-4 text-main-500 text-center">
          No hay reservas para cancelar {user.nombre}
        </h5>
      )}
    </div>
  )
}
