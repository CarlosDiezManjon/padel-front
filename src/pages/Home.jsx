import { Box } from '@mui/material'
import React from 'react'
import HomeButton from '../components/HomeButton'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  const handleGoToPistas = () => {
    navigate('/pistas')
  }
  const handleGoToReservas = () => {
    navigate('/reservas')
  }
  const handleGoToSaldo = () => {
    navigate('/saldo')
  }
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        p: 2,
        gridGap: '2vh',
      }}
    >
      <HomeButton title={'Pistas'} onClick={handleGoToPistas} image="palaFondo.jpg" />
      <HomeButton title={'Mis reservas'} onClick={handleGoToReservas} image="calendarioFondo.jpg" />
      <HomeButton title={'Saldo'} onClick={handleGoToSaldo} image="saldoFondo.jpg" />
    </Box>
  )
}
