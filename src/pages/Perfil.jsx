import React, { useEffect, useState } from 'react'
import { Box, Card, CardContent, CardHeader, Chip, IconButton, Typography } from '@mui/material'
import useGetRequest from '../services/get.service'
import { datetimeToStringMinutes } from '../utils/utils'
import EditIcon from '@mui/icons-material/Edit'
import PerfilReservas from './PerfilReservas'

const Perfil = () => {
  const [usuario, setUsuario] = useState(null)
  const { getRequest, data } = useGetRequest()

  useEffect(() => {
    getRequest('/perfil')
  }, [])

  useEffect(() => {
    if (data) {
      setUsuario(data.usuario)
    }
  }, [data])

  const handleEditUser = () => {}

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {usuario && (
        <Card sx={{ width: '90%' }}>
          <CardContent>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}
            >
              <Typography variant="h5" component="h2">
                {usuario.nombre} {usuario.apellidos}
              </Typography>

              {usuario.tipo == 2 && <Chip size="small" label="Admin" color="secondary" />}
              {/* <IconButton onClick={handleEditUser} color="primary">
                <EditIcon />
              </IconButton> */}
            </Box>

            <Typography sx={{ my: 0.5 }} color="textSecondary">
              Username: {usuario.username}
            </Typography>
            <Typography sx={{ my: 0.5 }} color="textSecondary">
              Email: {usuario.email}
            </Typography>
            <Typography sx={{ my: 0.5 }} color="textSecondary">
              Teléfono: {usuario.telefono}
            </Typography>
            <Typography sx={{ my: 0.5 }} color="textSecondary">
              Saldo: {usuario.saldo} €
            </Typography>

            <Typography sx={{ my: 0.5 }} color="textSecondary">
              Fecha de alta: {datetimeToStringMinutes(usuario.fecha_alta)}
            </Typography>
          </CardContent>
        </Card>
      )}
      <PerfilReservas />
    </Box>
  )
}

export default Perfil
