import {
  Box,
  Card,
  CardContent,
  Chip,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { datetimeToStringMinutes } from '../utils/utils'
import { styled } from '@mui/material/styles'
import useGetRequest from '../services/get.service'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

export default function PerfilReservas() {
  const [reservas, setReservas] = useState([])
  const { getRequest, data } = useGetRequest()
  const [expanded, setExpanded] = React.useState(false)

  useEffect(() => {
    getRequest('/reservas')
  }, [])

  useEffect(() => {
    if (data) {
      setReservas(data.reservas)
    }
  }, [data])

  return (
    <Card sx={{ width: '90%', mt: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="h2">
            Reservas
          </Typography>
          {reservas.length > 0 ? (
            <ExpandMore
              expand={expanded}
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No hay reservas
            </Typography>
          )}
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List>
            {reservas.map((reserva) => (
              <ListItem key={reserva.id}>
                <ListItemText
                  primary={datetimeToStringMinutes(reserva.fecha_inicio)}
                  secondary={
                    <Box sx={{ display: 'flex' }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          width: '35%',
                          mr: 2,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {reserva.nombre}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {reserva.importe}€
                      </Typography>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <Chip
                    color={reserva.estado == 'confirmada' ? 'success' : 'default'}
                    label={reserva.estado}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </CardContent>
    </Card>
  )
}
