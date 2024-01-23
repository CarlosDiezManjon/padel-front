import { Box, Button, IconButton, MenuItem, Select } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useGetRequest from '../services/get.service'
import { datetimeToStringDate } from '../utils/utils'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Parrilla from '../components/Parrilla'
import useStore from '../store/GeneralStore'

const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

export default function Home() {
  const navigate = useNavigate()
  const [pistas, setPistas] = React.useState([])
  const [fecha, setFecha] = React.useState(new Date().toISOString().slice(0, 10))
  const [options, setOptions] = React.useState([])
  const addReservaSelected = useStore((state) => state.addReservaSelected)
  const reservasSelected = useStore((state) => state.reservasSelected)
  const removeReservaSelected = useStore((state) => state.removeReservaSelected)
  const clearReservasSelected = useStore((state) => state.clearReservasSelected)

  const { getRequest, data } = useGetRequest()

  React.useEffect(() => {
    const getNextSevenDays = () => {
      const options = []
      const currentDate = new Date(fecha)
      for (let i = 0; i < 7; i++) {
        const nextDate = new Date(currentDate)
        nextDate.setDate(currentDate.getDate() + i)
        const dayOfWeek = daysOfWeek[nextDate.getDay()]

        options.push({
          date: nextDate.toISOString().slice(0, 10),
          dayOfWeek: dayOfWeek,
        })
      }
      return options
    }

    setOptions(getNextSevenDays())
    getRequest('/parrilla/' + fecha)
  }, [])

  React.useEffect(() => {
    if (data) {
      clearReservasSelected()
      setPistas(data.pistas)
    }
  }, [data])

  useEffect(() => {
    getRequest('/parrilla/' + fecha)
  }, [fecha])

  const handleItemClick = (index, pista) => {
    const reserva = pistas.find((p) => p.id === pista.id).parrilla[index]
    if (reserva.reserva !== null) return
    reserva.pista_id = pista.id
    reserva.pista = pista
    const indexReserva = reservasSelected.findIndex(
      (r) => r.startTime === reserva.startTime && r.pista_id === reserva.pista_id
    )
    if (indexReserva === -1) {
      addReservaSelected(reserva)
    } else {
      removeReservaSelected(reserva)
    }
  }

  const handleChangeFecha = (event) => {
    setFecha(event.target.value)
  }

  const handleSetNextFecha = () => {
    const currentIndex = options.findIndex((option) => option.date === fecha)
    if (currentIndex !== -1 && currentIndex < options.length - 1) {
      const nextFecha = options[currentIndex + 1].date
      setFecha(nextFecha)
    }
  }

  const handleSetPreviousFecha = () => {
    const currentIndex = options.findIndex((option) => option.date === fecha)
    if (currentIndex !== -1 && currentIndex > 0) {
      const previousFecha = options[currentIndex - 1].date
      setFecha(previousFecha)
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <IconButton onClick={handleSetPreviousFecha}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Select
          size="small"
          sx={{ width: '60%' }}
          labelId="fecha"
          id="fecha"
          name="fecha"
          value={fecha}
          onChange={handleChangeFecha}
        >
          {options.map((option) => (
            <MenuItem key={option.date} value={option.date}>
              {option.dayOfWeek + ' ' + datetimeToStringDate(option.date)}
            </MenuItem>
          ))}
        </Select>
        <IconButton onClick={handleSetNextFecha}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      <Box
        sx={{ display: 'flex', width: '100%', justifyContent: 'center', mt: 1 }}
        id="container-parrillas"
      >
        {pistas.map((pista) => (
          <Parrilla
            pista={pista}
            handleItemClick={handleItemClick}
            key={pista.id}
            reservasSelected={reservasSelected}
          />
        ))}
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'end', position: 'fixed', bottom: 70, right: 10 }}
      >
        {reservasSelected.length !== 0 && (
          <Button variant="contained" onClick={() => navigate('/reserva')}>
            Reservar
          </Button>
        )}
      </Box>
    </Box>
  )
}
