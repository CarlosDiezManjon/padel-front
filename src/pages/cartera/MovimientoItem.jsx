import React from 'react'
import {
  dateUTCToLocalDateOnly,
  dateUTCToLocalDateTime,
  dateUTCToLocalTime,
} from '../../utils/utils'

export default function MovimientoItem({ movimiento }) {
  return (
    <div
      className={
        'flex flex-col justify-between w-full text-black text-lg sm:!text-lg font-medium bg-light rounded-md mb-2 p-2'
      }
    >
      <div className="flex mb-1 justify-between">
        <h1>{dateUTCToLocalDateTime(movimiento.fecha)}</h1>
        <h1
          className={
            'text-right text-xl ' + (movimiento.tipo == 'Gasto' ? 'text-red-500' : 'text-green-700')
          }
        >
          {(movimiento.tipo == 'Gasto' ? '-' : '+') + movimiento.importe} €
        </h1>
      </div>
      <div className="flex justify-between mb-1">
        <h1>{movimiento.motivo}</h1>
        <h1 className="text-xl">{movimiento.saldo} €</h1>
      </div>
      <div className="flex justify-between">
        <h1>{movimiento.nombre_pista}</h1>
        <h1>
          {dateUTCToLocalDateOnly(movimiento.fecha_inicio_reserva)}{' '}
          <span className="font-semibold">
            {dateUTCToLocalTime(movimiento.fecha_inicio_reserva) +
              ' - ' +
              dateUTCToLocalTime(movimiento.fecha_fin_reserva)}
          </span>
        </h1>
      </div>
    </div>
  )
}
