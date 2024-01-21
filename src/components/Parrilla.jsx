import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { datetimeToStringTime } from '../utils/utils'

export default function Parrilla({ pista }) {
  const handleItemClick = (index) => {
    // Handle item click logic here
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
          py: 0.5,
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
              bgcolor: item.reserva == null ? 'lightgrey' : '#fd4646',
              p: 0.5,
              m: 0.5,
              width: '95%',
            }}
            key={index}
            onClick={() => handleItemClick(index)}
          >
            <Typography variant="body1" align="center">
              {datetimeToStringTime(item.startTime) + ' - ' + datetimeToStringTime(item.endTime)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
