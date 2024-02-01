import { Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonCustom from '../components/ButtonCustom'
import useGetRequest from '../services/get.service'
import usePostRequest from '../services/post.service'
import useStore from '../store/GeneralStore'
import { dateUTCToLocalDateOnly, dateUTCToLocalTime } from '../utils/utils'

export default function Reserva() {
  const [saldo, setSaldo] = useState(0)
  const [total, setTotal] = useState(0)
  const user = useStore((state) => state.user)
  const reservasSelected = useStore((state) => state.reservasSelected)
  const clearReservasSelected = useStore((state) => state.clearReservasSelected)
  const clearReservasToCancel = useStore((state) => state.clearReservasToCancel)
  const { getRequest, data } = useGetRequest()
  const { postRequest, data: dataPost } = usePostRequest()
  const navigate = useNavigate()

  useEffect(() => {
    getRequest('/saldo')
  }, [])

  const handleConfirmar = () => {
    let reservaToServer = [...reservasSelected]
    reservaToServer.forEach((reserva) => {
      delete reserva.pista.parrilla
    })
    let importeTotal = reservaToServer.reduce(
      (acc, reserva) => acc + parseFloat(reserva.pista.precio),
      0,
    )
    postRequest('/reservas', { reservas: reservaToServer, importeTotal: importeTotal })
  }

  useEffect(() => {
    if (dataPost) {
      clearReservasToCancel()
      clearReservasSelected()
      navigate(-1)
    }
  }, [dataPost])

  useEffect(() => {
    if (data) {
      setSaldo(parseFloat(data.saldo))
      setTotal(reservasSelected.reduce((acc, reserva) => acc + parseFloat(reserva.pista.precio), 0))
    }
  }, [data])

  return (
    <div className="w-full p-2">
      {reservasSelected.length != 0 ? (
        <>
          <h5 className="font-bold text-2xl mb-4 text-white text-center">
            Aquí tienes tu reserva {user.nombre}
          </h5>
          <ul className="max-h-reserva min-h-reserva overflow-auto">
            {reservasSelected
              .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
              .map((reserva, index) => (
                <div
                  className="w-full flex flex-col bg-white rounded-md mt-2 p-2 text-lg"
                  key={reserva.startTime + '-' + index}
                >
                  <div className="w-full flex justify-between mb-4">
                    <p className="flex ">
                      <p className="font-bold mr-1">Fecha</p>
                      {dateUTCToLocalDateOnly(reserva.startTime)}
                    </p>
                    <p className="flex ">
                      {dateUTCToLocalTime(reserva.startTime)} -{' '}
                      {dateUTCToLocalTime(reserva.endTime)}
                    </p>
                  </div>
                  <div className="w-full flex justify-between">
                    <p className="flex ">
                      <p className="font-bold mr-1">Lugar</p>
                      {reserva.pista.nombre}
                    </p>
                    <p className="flex ">{reserva.pista.precio} €</p>
                  </div>
                </div>
              ))}
          </ul>

          <p className="my-2 text-right text-white pr-1 text-lg">Importe total: {total} €</p>
          <p className="my-2 text-right text-white pr-1 text-lg">Saldo actual: {saldo} €</p>

          {total <= saldo && (
            <p className="my-2 text-right text-white pr-1 text-lg">
              Saldo tras reserva: {saldo - total} €
            </p>
          )}

          {total > saldo && (
            <div className="w-full flex justify-end my-2">
              <p className="my-2 text-red-600">Saldo insuficiente</p>
              <ButtonCustom
                onClick={() => setSaldo(saldo + 100)}
                tipo="text-white"
                sx="max-w-48 ml-2"
              >
                Añadir saldo
              </ButtonCustom>
            </div>
          )}

          <div className="flex justify-end mt-4">
            <ButtonCustom onClick={() => navigate(-1)} sx="mr-4" tipo="red">
              Cancelar
            </ButtonCustom>
            <ButtonCustom
              disabled={total > saldo || reservasSelected.length == 0}
              onClick={handleConfirmar}
            >
              Confirmar
            </ButtonCustom>
          </div>
        </>
      ) : (
        <h5 className="font-bold text-2xl mb-4 text-main-500 text-center">
          No hay reservas {user.nombre}
        </h5>
      )}
    </div>
  )
}
