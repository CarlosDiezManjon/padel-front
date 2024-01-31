import { Box, Collapse, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useStore from '../store/GeneralStore'
import { dateUTCToLocalTime } from '../utils/utils'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import styled from '@emotion/styled'

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
    if ((user.tipo === 2 && slot.reserva !== null) || slot.propia === true) {
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
      return 'text-white bg-main-400'
    } else if (slot.reserva == null) {
      return 'text-black bg-gray-200'
    } else if (slot.toCancel) {
      return 'text-white bg-red-700'
    } else {
      return 'text-white bg-red-400'
    }
  }

  const getSlotContent = (slot) => {
    if (slot.reserva !== null && slot.reserva?.username !== undefined) {
      return slot.reserva?.username
    } else if (slot.reserva !== null && slot.reserva?.username === undefined) {
      return 'Reservado'
    } else {
      return dateUTCToLocalTime(slot.startTime) + ' - ' + dateUTCToLocalTime(slot.endTime)
    }
  }

  return (
    <div className="flex flex-col items-center w-full max-w-64">
      <Box
        className="rounded cursor-pointer text-white  bg-main-800 w-full"
        sx={{
          display: 'flex',
          p: 0.5,
          pl: 2,
          pr: 1,
          m: 0.25,

          alignContent: 'center',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Typography variant="h6" align="center" sx={{}}>
          {pista.nombre}
        </Typography>
        <ExpandMore expand={expanded} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          {slots.map((slot, index) => (
            <Box
              className={
                getStyleSlot(slot) +
                ' w-full m-0.5 p-1 rounded' +
                (slot.past ? ' opacity-60 text-neutral-400 !cursor-default' : '')
              }
              sx={{
                cursor:
                  slot.reserva == null || user.tipo == 2 || slot.propia ? 'pointer' : 'default',
              }}
              key={index}
              onClick={() => handleItemClick(slot)}
            >
              <Typography variant="body1" align="center" color={slot.propia ? 'white' : 'inherit'}>
                {getSlotContent(slot)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Collapse>
    </div>
  )
}
