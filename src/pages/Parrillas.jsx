import { Box, IconButton, MenuItem, Select, Zoom } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useGetRequest from '../services/get.service'
import { datetimeToStringDate } from '../utils/utils'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Parrilla from '../components/Parrilla'
import useStore from '../store/GeneralStore'
import ButtonCustom from '../components/ButtonCustom'

const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

export default function Parrillas() {
  const navigate = useNavigate()
  const [pistas, setPistas] = React.useState([])
  const [fecha, setFecha] = React.useState(new Date().toISOString().slice(0, 10))
  const [options, setOptions] = React.useState([])
  const reservasSelected = useStore((state) => state.reservasSelected)
  const reservasToCancel = useStore((state) => state.reservasToCancel)
  const reloadReservasSelected = useStore((state) => state.reloadReservasSelected)
  const reloadReservasToCancel = useStore((state) => state.reloadReservasToCancel)

  const clearReservasSelected = useStore((state) => state.clearReservasSelected)
  const clearReservasToCancel = useStore((state) => state.clearReservasToCancel)

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
      <div className="flex justify-center w-full text-white">
        <IconButton onClick={handleSetPreviousFecha}>
          <ArrowBackIosNewIcon className="text-white" />
        </IconButton>
        <Select
          className="bg-white"
          size="small"
          sx={{ width: '60%', maxWidth: 300 }}
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
          <ArrowForwardIosIcon className="text-white" />
        </IconButton>
      </div>
      <Box
        sx={{
          display: 'grid',
          width: '100%',
          mt: 1,
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 1,
          justifyContent: 'center',
          justifyItems: 'center',
        }}
        id="container-parrillas"
      >
        {pistas.map((pista) => (
          <Parrilla pista={pista} key={pista.id} />
        ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          position: 'fixed',
          bottom: 80,
          right: { xs: 10, sm: 'calc(50vw - 120px)' },
        }}
      >
        <Zoom in={reservasToCancel.length !== 0}>
          <ButtonCustom
            tipo="red"
            onClick={() => navigate('/cancelacion')}
            sx="mr-2 min-w-48 !shadow-none"
          >
            Cancelar reserva
            {reservasToCancel.length > 1 ? (
              <span class="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-red-500 bg-white rounded-full">
                {reservasToCancel.length}
              </span>
            ) : (
              ' '
            )}
          </ButtonCustom>
        </Zoom>
        <Zoom in={reservasSelected.length !== 0}>
          <ButtonCustom onClick={() => navigate('/reserva')} sx="min-w-40 min-h-10 !shadow-none">
            Reservar
            {reservasSelected.length > 1 ? (
              <span class="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-main-500 bg-white rounded-full">
                {reservasSelected.length}
              </span>
            ) : (
              ' '
            )}
          </ButtonCustom>
        </Zoom>
      </Box>
    </Box>
  )
}
