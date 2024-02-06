import { Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonCustom from '../../components/ButtonCustom'
import useGetRequest from '../../services/get.service'
import usePostRequest from '../../services/post.service'
import useStore from '../../store/GeneralStore'
import { dateUTCToLocalDateOnly, dateUTCToLocalTime } from '../../utils/utils'
import InputCustom from '../../components/InputCustom'

export default function Reserva() {
  const [saldo, setSaldo] = useState(0)
  const [total, setTotal] = useState(0)
  const [motivo, setMotivo] = useState('')
  const [errorMotivo, setErrorMotivo] = useState(null)
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

  const handleChangeMotivo = (e) => {
    setMotivo(e.target.value)
    if (e.target.value == '') {
      setErrorMotivo('El motivo es obligatorio')
    } else {
      setErrorMotivo(null)
    }
  }

  const handleConfirmar = () => {
    if (user.tipo == 0) {
      if (motivo == '') {
        setErrorMotivo('El motivo es obligatorio')
        return
      } else {
        setErrorMotivo(null)
      }
    }
    let reservaToServer = [...reservasSelected]
    reservaToServer.forEach((reserva) => {
      delete reserva.pista.parrilla
    })
    let importeTotal = reservaToServer.reduce(
      (acc, reserva) => acc + parseFloat(reserva.tarifa.precio),
      0,
    )
    postRequest('/reservas', {
      reservas: reservaToServer,
      importeTotal: importeTotal,
      motivo: motivo,
    })
  }

  useEffect(() => {
    if (dataPost) {
      clearReservasToCancel()
      clearReservasSelected()
      navigate(-1)
      setMotivo('')
    }
  }, [dataPost])

  useEffect(() => {
    if (data) {
      setSaldo(parseFloat(data.saldo))
      setTotal(
        reservasSelected.reduce((acc, reserva) => acc + parseFloat(reserva.tarifa.precio), 0),
      )
    }
  }, [data])

  return (
    <div className="w-full p-2 py-0">
      {reservasSelected.length != 0 ? (
        <>
          {user.tipo == 0 ? (
            <div className="flex flex-col text-white mb-2 justify-center items-center">
              <h5 className="font-medium text-2xl mb-1 text-white text-center">
                Reserva Administrador
              </h5>
              <div
                class="inline-flex rounded-md shadow-sm transition duration-300 ease-in-out"
                role="group"
              >
                <button
                  type="button"
                  class="inline-flex items-center px-4 py-1 text-md font-medium transition duration-300 ease-in-out text-white bg-transparent border border-white rounded-s-lg hover:bg-white hover:text-black focus:bg-white focus:text-black"
                >
                  Cierre pista
                </button>
                <button
                  type="button"
                  class="inline-flex items-center px-4 py-1 text-md font-medium transition duration-300 ease-in-out text-white bg-transparent border border-white rounded-e-lg  hover:bg-white hover:text-black focus:bg-white focus:text-black"
                >
                  Reserva cliente
                </button>
              </div>
              {/* <InputCustom
                placeholder="Motivo cierre pista"
                labelSx="w-9/12"
                value={motivo}
                error={errorMotivo}
                onChange={handleChangeMotivo}
              /> */}
            </div>
          ) : (
            <h5 className="font-medium text-2xl mb-4 text-white text-center">
              Aquí tienes tu reserva {user.nombre}
            </h5>
          )}

          <ul className="max-h-reserva min-h-reserva overflow-auto">
            {reservasSelected
              .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
              .map((reserva, index) => (
                <div
                  className="w-full flex flex-col bg-white rounded-md mb-2 p-2 text-lg"
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
                    <p className="flex ">{reserva.tarifa.precio} €</p>
                  </div>
                </div>
              ))}
          </ul>

          <p className="my-1 text-right text-white pr-1 text-lg">Importe total: {total} €</p>
          <p className="my-1 text-right text-white pr-1 text-lg">Saldo actual: {saldo} €</p>

          {total <= saldo && (
            <p className="my-1 text-right text-white pr-1 text-lg">
              Saldo tras reserva: {saldo - total} €
            </p>
          )}

          {total > saldo && (
            <div className="w-full flex justify-end my-1">
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

          <div className="flex justify-end mt-3">
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
        <h5 className="font-bold text-2xl mb-4 text-white text-center">
          No hay reservas {user.nombre}
        </h5>
      )}
    </div>
  )
}
