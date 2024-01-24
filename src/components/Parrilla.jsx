import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useStore from '../store/GeneralStore'
import { dateUTCToLocalTime } from '../utils/utils'

export default function Parrilla({ pista }) {
  const reservasSelected = useStore((state) => state.reservasSelected)
  const removeReservaSelected = useStore((state) => state.removeReservaSelected)
  const addReservaSelected = useStore((state) => state.addReservaSelected)
  const [slots, setSlots] = useState(pista.parrilla)

  useEffect(() => {
    setSlots(pista.parrilla)
  }, [pista])

  useEffect(() => {
    let copy = [...slots]
    copy.forEach((slot) => {
      slot.selected = false
    })
    reservasSelected.forEach((reserva) => {
      const index = slots.findIndex(
        (slot) => slot.startTime === reserva.startTime && slot.pista_id === reserva.pista_id
      )
      if (index !== -1) {
        copy[index].selected = true
      }
    })
    setSlots(copy)
  }, [reservasSelected])

  const handleItemClick = (slot) => {
    if (slot.reserva !== null) return
    slot.pista_id = pista.id
    slot.pista = pista
    const indexReserva = reservasSelected.findIndex(
      (r) => r.startTime === slot.startTime && r.pista_id === slot.pista_id
    )
    if (indexReserva === -1) {
      addReservaSelected(slot)
    } else {
      removeReservaSelected(slot)
    }
  }

  const getBackgroundColor = (item) => {
    if (item.selected) {
      return '#35b73b'
    } else if (item.reserva == null) {
      return 'lightgrey'
    } else {
      return '#fd4646'
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%' }}>
      <Typography
        variant="h6"
        align="center"
        sx={{
          borderRadius: '5px',
          bgcolor: '#1976d2',
          p: 0.5,
          m: 0.25,
          width: '95%',
          alignContent: 'center',
          color: 'white',
        }}
      >
        {pista.nombre}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        {slots.map((slot, index) => (
          <Box
            sx={{
              borderRadius: '5px',
              bgcolor: getBackgroundColor(slot),
              p: 0.5,
              m: 0.25,
              width: '95%',
            }}
            key={index}
            onClick={() => handleItemClick(slot)}
          >
            <Typography variant="body1" align="center">
              {dateUTCToLocalTime(slot.startTime) + ' - ' + dateUTCToLocalTime(slot.endTime)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
