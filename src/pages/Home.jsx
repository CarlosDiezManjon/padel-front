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
      setPistas(data.pistas)
    }
  }, [data])

  useEffect(() => {
    getRequest('/parrilla/' + fecha)
  }, [fecha])

  const handleItemClick = (index, pistaId) => {
    const reserva = pistas.find((pista) => pista.id === pistaId).parrilla[index]
    reserva.pista_id = pistaId
    addReservaSelected(reserva)
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
    </Box>
  )
}
