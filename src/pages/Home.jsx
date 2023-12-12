import { Box, Card } from '@mui/material'
import React from 'react'
import HomeButton from '../components/HomeButton'
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SearchIcon from '@mui/icons-material/Search';
import { ButtonCard } from '../components/StyledComponents';

export default function Home() {
  const handleGoToPistas = () =>{

  }
  const handleGoToReservas = () =>{

  }
  const handleGoToSaldo = () =>{

  }
  return (
    <Box sx={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", p: 2}}>
        <HomeButton title={"Buscar Pistas"} onClick={handleGoToPistas} image="/src/assets/palaFondo.jpg"/>
        <HomeButton title={"Mis reservas"} onClick={handleGoToReservas} image="/src/assets/calendarioFondo.jpg"/>
        <HomeButton title={"Saldo"} onClick={handleGoToSaldo} image="/src/assets/saldoFondo.jpg"/>

    </Box>
  )
}
