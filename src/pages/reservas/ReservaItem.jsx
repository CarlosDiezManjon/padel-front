import React, { useEffect, useState } from 'react'
import { dateUTCToLocalDateOnly, dateUTCToLocalTime } from '../../utils/utils'
import useGetRequest from '../../services/get.service'
import useStore from '../../store/GeneralStore'

export default function ReservaItem({ reservaSelected, usuarioSelected }) {
  const { getRequest, data } = useGetRequest()
  const [reserva, setReserva] = useState(reservaSelected)
  const user = useStore((state) => state.user)

  const editReservaSelected = useStore((state) => state.editReservaSelected)

  useEffect(() => {
    if (usuarioSelected != null && user.tipo == 0) {
      getRequest('/tarifa-actual', {
        fecha: reserva.startTime,
        tipo_usuario: usuarioSelected.tipo,
      })
    }
  }, [usuarioSelected])

  useEffect(() => {
    if (data) {
      if (data.tarifa) {
        console.log(data)
        editReservaSelected(reserva, {
          ...reserva,
          tarifa: data.tarifa,
        })
      }
    }
  }, [data])

  return (
    <div className="w-full flex flex-col bg-white rounded-md mb-2 p-2 text-lg">
      <div className="w-full flex justify-between mb-4">
        <div className="flex ">
          <p className="font-bold mr-1">Fecha</p>
          {dateUTCToLocalDateOnly(reservaSelected.startTime)}
        </div>
        <p className="flex ">
          {dateUTCToLocalTime(reservaSelected.startTime)} -{' '}
          {dateUTCToLocalTime(reservaSelected.endTime)}
        </p>
      </div>
      <div className="w-full flex justify-between">
        <div className="flex ">
          <p className="font-bold mr-1">Lugar</p>
          {reservaSelected.pista.nombre}
        </div>
        <p className="flex ">{reservaSelected.tarifa.precio} €</p>
      </div>
    </div>
  )
}