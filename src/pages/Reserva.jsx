import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Fab,
  List,
  ListItem,
  ListItemText,
  Typography,
  Zoom,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import useStore from '../store/GeneralStore'
import { dateUTCToLocalDate, dateUTCToLocalTime } from '../utils/utils'
import useGetRequest from '../services/get.service'
import usePostRequest from '../services/post.service'

export default function Reserva() {
  const [saldo, setSaldo] = useState(0)
  const [total, setTotal] = useState(0)
  const reservasSelected = useStore((state) => state.reservasSelected)
  const { getRequest, data } = useGetRequest()
  const { postRequest, data: dataPost } = usePostRequest()

  useEffect(() => {
    getRequest('/saldo')
  }, [])

  const handleConfirmar = () => {
    let reservaToServer = [...reservasSelected]
    reservaToServer.forEach((reserva) => {
      delete reserva.pista.parrilla
    })
    postRequest('/reservas', { reservas: reservaToServer })
  }

  useEffect(() => {
    if (data) {
      setSaldo(parseFloat(data.saldo))
      setTotal(reservasSelected.reduce((acc, reserva) => acc + parseFloat(reserva.pista.precio), 0))
    }
  }, [data])

  return (
    <Box>
      <Card sx={{ width: '100%' }}>
        <CardContent>
          <Typography variant="h5">Reserva</Typography>
          <List>
            {reservasSelected
              .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
              .map((reserva, index) => (
                <ListItem key={reserva.startTime + '-' + index} sx={{ pl: 1 }}>
                  {reserva.pista.nombre} : {dateUTCToLocalDate(reserva.startTime)} -
                  {dateUTCToLocalTime(reserva.endTime)} {reserva.pista.precio} €
                </ListItem>
              ))}
          </List>

          <Typography sx={{ my: 0.5, width: '100%', textAlign: 'end' }} color="textSecondary">
            Importe total: {total} €
          </Typography>
          <Typography sx={{ my: 0.5, width: '100%', textAlign: 'end' }} color="textSecondary">
            Saldo: {saldo} €
          </Typography>

          {total <= saldo && (
            <Typography sx={{ my: 0.5, width: '100%', textAlign: 'end' }} color="textSecondary">
              Saldo tras reserva: {saldo - total} €
            </Typography>
          )}

          {total > saldo && (
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', my: 1 }}>
              <Typography sx={{ my: 0.5, width: '100%', textAlign: 'start' }} color="error">
                No tienes saldo suficiente
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                sx={{ width: '60%', px: 1 }}
                onClick={() => setSaldo(100)}
              >
                Añadir saldo
              </Button>
            </Box>
          )}

          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              disabled={total > saldo}
              onClick={handleConfirmar}
            >
              Confirmar
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  )
}
