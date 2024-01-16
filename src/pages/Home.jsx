import { Box } from '@mui/material'
import React from 'react'
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
  return <Box>Home </Box>
}
