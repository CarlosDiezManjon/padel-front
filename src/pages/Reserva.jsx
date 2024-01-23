import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import React from 'react'
import useStore from '../store/GeneralStore'
import { dateUTCToLocalDate, dateUTCToLocalTime } from '../utils/utils'

export default function Reserva() {
  const reservasSelected = useStore((state) => state.reservasSelected)
  console.log(reservasSelected)
  return (
    <Card sx={{ width: '100%', height: 'auto' }}>
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
          Total:{' '}
          {reservasSelected.reduce((acc, reserva) => acc + parseFloat(reserva.pista.precio), 0)} €
        </Typography>
        <Typography sx={{ my: 0.5, width: '100%', textAlign: 'end' }} color="textSecondary">
          Saldo restante:{' '}
          {reservasSelected.reduce((acc, reserva) => acc + parseFloat(reserva.pista.precio), 0)} €
        </Typography>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary">
            Confirmar reserva
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}
