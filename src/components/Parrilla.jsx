import { Box, Collapse, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useStore from '../store/GeneralStore'
import { dateUTCToLocalTime } from '../utils/utils'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { ExpandMore } from '@mui/icons-material'

export default function Parrilla({ pista, index }) {
  const reservasSelected = useStore((state) => state.reservasSelected)
  const removeReservaSelected = useStore((state) => state.removeReservaSelected)
  const addReservaSelected = useStore((state) => state.addReservaSelected)
  const [slots, setSlots] = useState(pista.parrilla)
  const [expanded, setExpanded] = useState(index < 2 ? true : false)

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
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          borderRadius: '5px',
          bgcolor: '#1976d2',
          p: 0.5,
          pl: 2,
          pr: 1,
          m: 0.25,
          width: '95%',
          alignContent: 'center',
          color: 'white',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <Typography variant="h6" align="center" sx={{}}>
          {pista.nombre}
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          {slots.map((slot, index) => (
            <Box
              sx={{
                borderRadius: '5px',
                bgcolor: getBackgroundColor(slot),
                p: 0.5,
                m: 0.25,
                width: '95%',
                cursor: slot.reserva == null ? 'pointer' : 'default',
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
      </Collapse>
    </Box>
  )
}
