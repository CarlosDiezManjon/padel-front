import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonCustom from '../components/ButtonCustom'
import useGetRequest from '../services/get.service'
import usePostRequest from '../services/post.service'
import useStore from '../store/GeneralStore'
import { dateUTCToLocalDate, dateUTCToLocalTime } from '../utils/utils'

export default function Reserva() {
  const [saldo, setSaldo] = useState(0)
  const [total, setTotal] = useState(0)
  const user = useStore((state) => state.user)
  const reservasSelected = useStore((state) => state.reservasSelected)
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
    postRequest('/reservas', { reservas: reservaToServer })
  }

  useEffect(() => {
    if (dataPost) {
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
    <div className="w-full p-4">
      <h5 className="font-bold text-xl mb-4">Aquí tienes tu reserva {user.nombre}</h5>
      <ul>
        {reservasSelected
          .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
          .map((reserva, index) => (
            <li key={reserva.startTime + '-' + index} className="pl-1 mb-2">
              {reserva.pista.nombre} : {dateUTCToLocalDate(reserva.startTime)} -
              {dateUTCToLocalTime(reserva.endTime)} {reserva.pista.precio} €
            </li>
          ))}
      </ul>

      <p className="my-2 text-right text-gray-600">Importe total: {total} €</p>
      <p className="my-2 text-right text-gray-600">Saldo: {saldo} €</p>

      {total <= saldo && (
        <p className="my-2 text-right text-gray-600">Saldo tras reserva: {saldo - total} €</p>
      )}

      {total > saldo && (
        <div className="w-full flex justify-between my-2">
          <p className="my-2 text-red-600">No tienes saldo suficiente</p>
          <button
            className="w-2/5 px-2 py-1 border border-blue-500 text-blue-500 rounded"
            onClick={() => setSaldo(100)}
          >
            Añadir saldo
          </button>
        </div>
      )}

      <div className="flex justify-end">
        <ButtonCustom onClick={() => navigate(-1)} sx="mr-4" type="red">
          Cancelar
        </ButtonCustom>
        <ButtonCustom disabled={total > saldo} onClick={handleConfirmar}>
          Confirmar
        </ButtonCustom>
      </div>
    </div>
  )
}
