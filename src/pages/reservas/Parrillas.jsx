import { Box, IconButton, MenuItem, Select, Zoom } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useGetRequest from '../../services/get.service'
import { datetimeToStringDate } from '../../utils/utils'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Parrilla from './Parrilla'
import useStore from '../../store/GeneralStore'
import ButtonCustom from '../../components/ButtonCustom'
import CloseIcon from '@mui/icons-material/Close'
import SelectCustom from '../../components/SelectCustom'

const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

export default function Parrillas() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pistas, setPistas] = useState([])
  const [options, setOptions] = useState([])
  const reservasSelected = useStore((state) => state.reservasSelected)
  const reservasToCancel = useStore((state) => state.reservasToCancel)
  const clearReservasSelected = useStore((state) => state.clearReservasSelected)
  const clearReservasToCancel = useStore((state) => state.clearReservasToCancel)
  const lastDate = useStore((state) => state.lastDate)
  const setLastDate = useStore((state) => state.setLastDate)

  const { getRequest, data } = useGetRequest()

  useEffect(() => {
    const getNextSevenDays = () => {
      const options = []
      const currentDate = new Date(lastDate)
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
  }, [])

  useEffect(() => {
    if (data) {
      setPistas(data.pistas)
    }
  }, [data])

  useEffect(() => {
    getRequest('/parrilla/' + id + '/' + lastDate)
  }, [lastDate])

  const handleChangeFecha = (event) => {
    setLastDate(event.target.value)
  }

  const handleSetNextFecha = () => {
    const currentIndex = options.findIndex((option) => option.date === lastDate)
    if (currentIndex !== -1 && currentIndex < options.length - 1) {
      const nextFecha = options[currentIndex + 1].date
      setLastDate(nextFecha)
    }
  }

  const handleSetPreviousFecha = () => {
    const currentIndex = options.findIndex((option) => option.date === lastDate)
    if (currentIndex !== -1 && currentIndex > 0) {
      const previousFecha = options[currentIndex - 1].date
      setLastDate(previousFecha)
    }
  }

  return (
    <div className="w-full mt-2">
      <div className="flex justify-center w-full items-center text-text">
        <IconButton onClick={handleSetPreviousFecha}>
          <ArrowBackIosNewIcon className="text-primary dark:text-text" />
        </IconButton>
        {/* <Select
          className="bg-white"
          size="small"
          sx={{ width: '60%', maxWidth: 300 }}
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
        </Select> */}

        <SelectCustom
          id="fecha"
          name="fecha"
          value={lastDate}
          label=""
          labelSx=" w-52 max-w-72"
          sx="!flex justify-center md:!text-lg"
          onChange={handleChangeFecha}
          options={options.map((option) => ({
            value: option.date,
            label: option.dayOfWeek + ' ' + datetimeToStringDate(option.date),
          }))}
        />

        <IconButton onClick={handleSetNextFecha}>
          <ArrowForwardIosIcon className="text-primary dark:text-text" />
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
          bottom: { xs: '10%', sm: 'calc(20vh - 120px)' },
          right: { xs: '7%', sm: 'calc(40vw - 120px)' },
        }}
      >
        <Zoom in={reservasToCancel.length !== 0}>
          <div className="relative">
            <ButtonCustom
              tipo="outlined"
              onClick={() => navigate('/cancelacion')}
              sx="min-w-40 min-h-10 !shadow-none"
            >
              Cancelar reserva
              {reservasToCancel.length > 1 ? (
                <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-primary bg-light rounded-full">
                  {reservasToCancel.length}
                </span>
              ) : (
                ' '
              )}
            </ButtonCustom>
            <div
              onClick={clearReservasToCancel}
              className="rounded-full absolute -top-3 -right-3 h-6 w-6 xs:hover:scale-125 transition-transform duration-100 cursor-pointer text-background dark:text-text bg-neutral-500 flex justify-center items-center align-middle z-30"
            >
              <CloseIcon className="!h-5 !w-5" />
            </div>
          </div>
        </Zoom>
        <Zoom in={reservasSelected.length !== 0}>
          <div className="relative ml-3">
            <ButtonCustom onClick={() => navigate('/reserva')} sx="min-w-40 min-h-10 !shadow-none ">
              Reservar
              {reservasSelected.length > 1 ? (
                <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-primary bg-background dark:bg-text rounded-full">
                  {reservasSelected.length}
                </span>
              ) : (
                ' '
              )}
            </ButtonCustom>
            <div
              onClick={clearReservasSelected}
              className="rounded-full absolute -top-3 -right-3 h-6 w-6 xs:hover:scale-125 transition-transform duration-100 cursor-pointer text-background dark:text-text bg-neutral-500 flex justify-center items-center align-middle z-30"
            >
              <CloseIcon className="!h-5 !w-5" />
            </div>
          </div>
        </Zoom>
      </Box>
    </div>
  )
}
