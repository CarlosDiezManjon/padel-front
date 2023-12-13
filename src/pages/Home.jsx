import { Box, Card } from '@mui/material'
import React from 'react'
import HomeButton from '../components/HomeButton'
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SearchIcon from '@mui/icons-material/Search';
import { ButtonCard } from '../components/StyledComponents';
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const navigate = useNavigate()

  const handleGoToPistas = () =>{
    navigate("/pistas")
  }
  const handleGoToReservas = () =>{
    navigate("/reservas")
  }
  const handleGoToSaldo = () =>{
    navigate("/saldo")
  }
  return (
    <Box sx={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", p: 2}}>
        <HomeButton title={"Buscar Pistas"} onClick={handleGoToPistas} image="/palaFondo.jpg"/>
        <HomeButton title={"Mis reservas"} onClick={handleGoToReservas} image="calendarioFondo.jpg"/>
        <HomeButton title={"Saldo"} onClick={handleGoToSaldo} image="saldoFondo.jpg"/>

    </Box>
  )
}
