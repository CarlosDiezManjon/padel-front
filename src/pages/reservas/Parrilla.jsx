import { Box, Collapse, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useStore from '../../store/GeneralStore'
import { dateUTCToLocalTime } from '../../utils/utils'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import styled from '@emotion/styled'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  padding: 0,
  color: 'inherit',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

export default function Parrilla({ pista }) {
  const user = useStore((state) => state.user)
  const reservasSelected = useStore((state) => state.reservasSelected)
  const removeReservaSelected = useStore((state) => state.removeReservaSelected)
  const addReservaSelected = useStore((state) => state.addReservaSelected)
  const reservasToCancel = useStore((state) => state.reservasToCancel)
  const removeReservaToCancel = useStore((state) => state.removeReservaToCancel)
  const addReservaToCancel = useStore((state) => state.addReservaToCancel)
  const [expanded, setExpanded] = useState(true)

  const updateSlots = (slots) => {
    let copy = [...slots]
    copy.forEach((slot) => {
      slot.selected = reservasSelected.some(
        (reserva) => slot.startTime == reserva.startTime && slot.pista.id == reserva.pista.id,
      )
      slot.toCancel = reservasToCancel.some(
        (reserva) => slot.startTime == reserva.startTime && slot.pista.id == reserva.pista.id,
      )
    })
    return copy
  }

  const [slots, setSlots] = useState(updateSlots(pista.parrilla))

  useEffect(() => {
    setSlots(updateSlots(pista.parrilla))
  }, [pista, reservasSelected, reservasToCancel])

  const handleItemClick = (slot) => {
    if (slot.past) return
    if ((user.tipo == 0 && slot.reserva !== null) || slot.propia === true) {
      const indexReserva = reservasToCancel.findIndex(
        (r) => r.startTime === slot.startTime && r.pista.id === slot.pista.id,
      )
      if (indexReserva === -1) {
        addReservaToCancel(slot)
      } else {
        removeReservaToCancel(slot)
      }
    } else {
      if (slot.reserva == null) {
        const indexReserva = reservasSelected.findIndex(
          (r) => r.startTime === slot.startTime && r.pista.id === slot.pista.id,
        )
        if (indexReserva === -1) {
          addReservaSelected(slot)
        } else {
          removeReservaSelected(slot)
        }
      }
    }
  }

  const getStyleSlot = (slot) => {
    if (slot.selected) {
      return 'text-white bg-main-500'
    } else if (slot.reserva == null) {
      return 'text-black bg-white'
    } else if (slot.toCancel) {
      return 'text-white bg-red-900'
    } else if (slot.reserva !== null && slot.reserva?.estado == 'Pendiente') {
      return 'text-red-700 bg-red-300 ring-2 ring-red-700'
    } else {
      return 'text-white bg-red-500'
    }
  }

  const getSlotContent = (slot) => {
    if (slot.reserva !== null && slot.reserva?.username !== undefined) {
      if (slot.reserva.motivo !== null && slot.reserva.motivo !== '') {
        return slot.reserva.motivo
      } else {
        return slot.reserva?.username
      }
    } else if (slot.reserva !== null && slot.reserva?.username === undefined) {
      if (slot.reserva.motivo !== null && slot.reserva.motivo !== '') {
        return slot.reserva.motivo
      } else {
        return 'Reservado'
      }
    } else {
      return dateUTCToLocalTime(slot.startTime) + ' - ' + dateUTCToLocalTime(slot.endTime)
    }
  }

  return (
    <div className="flex flex-col items-center w-full max-w-64">
      <div
        className="flex p-0.5 pl-2 pr-1 m-0.5 items-center justify-between rounded cursor-pointer text-white  bg-neutral-500 w-full"
        onClick={() => setExpanded(!expanded)}
      >
        <p className="text-lg text-center">{pista.nombre}</p>
        {expanded ? (
          <KeyboardArrowUpIcon className="!h-6 !w-6" aria-hidden="true" />
        ) : (
          <KeyboardArrowDownIcon className="!h-6 !w-6" aria-hidden="true" />
        )}
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
        <div className="flex flex-col items-center w-full">
          {slots.map((slot, index) => (
            <div
              className={
                `${getStyleSlot(slot)} w-full m-0.5 p-1 rounded select-none xs:hover:scale-105 transition-transform duration-75 focus:scale-100` +
                (slot.past ? ' opacity-60 text-neutral-400 cursor-default' : '') +
                (slot.reserva == null || user.tipo == 0 || slot.propia ? ' cursor-pointer' : '')
              }
              key={index}
              onClick={() => handleItemClick(slot)}
            >
              <p className={`text-center text-md ${slot.propia ? 'text-white' : ''}`}>
                {getSlotContent(slot)}
              </p>
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  )
}
