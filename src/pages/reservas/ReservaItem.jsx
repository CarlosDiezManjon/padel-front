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
        tipo_actividad: reserva.pista.actividad_id,
      })
    }
  }, [usuarioSelected])

  useEffect(() => {
    if (data) {
      if (data.tarifa) {
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
          <p className="font-bold mr-2">Fecha</p>
          <p>{dateUTCToLocalDateOnly(reservaSelected.startTime)}</p>
        </div>
        <p className="flex ">
          {dateUTCToLocalTime(reservaSelected.startTime)} -{' '}
          {dateUTCToLocalTime(reservaSelected.endTime)}
        </p>
      </div>
      <div className="w-full flex justify-between mb-4">
        <p className="font-bold">{reserva.pista.actividad}</p>
      </div>
      <div className="w-full flex justify-between">
        <div className="flex ">
          <p className="font-bold mr-2">Lugar</p>
          {reservaSelected.pista.nombre}
        </div>
        <p className="flex ">{reservaSelected.tarifa.precio} €</p>
      </div>
    </div>
  )
}
