import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { UTCDateTimeToLocalDateTime } from '../utils/utils'
import useStore from '../store/GeneralStore'

export default function Parrilla({ pista, handleItemClick, reservasSelected }) {
  useEffect(() => {
    console.log(reservasSelected)
  }, [reservasSelected])

  const isSelected = (item) => {
    return reservasSelected.find(
      (reserva) => reserva.startTime === item.startTime && reserva.pista_id === pista.id
    )
  }

  const getBackgroundColor = (item) => {
    if (item.reserva == null) {
      return 'lightgrey'
    } else if (isSelected(item)) {
      return '#1976d2'
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
          p: 1,
          py: 0,
          m: 0.5,
          width: '95%',
          alignContent: 'center',
          color: 'white',
        }}
      >
        {pista.nombre}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {pista.parrilla.map((item, index) => (
          <Box
            sx={{
              borderRadius: '5px',
              bgcolor: getBackgroundColor(item),
              p: 0.5,
              m: 0.25,
              width: '95%',
            }}
            key={index}
            onClick={() => handleItemClick(index, pista.id)}
          >
            <Typography variant="body1" align="center">
              {UTCDateTimeToLocalDateTime(item.startTime) +
                ' - ' +
                UTCDateTimeToLocalDateTime(item.endTime)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
