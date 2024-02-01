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
      setTimeout(() => {
        setUsuario(data.usuario)
      }, 3000)
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
      {usuario ? (
        <div>{usuario.nombre}</div>
      ) : (
        <div class="shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div class="animate-pulse flex space-x-4">
            <div class="rounded-full bg-neutral-400 h-32 w-32"></div>
            <div class="flex-1 space-y-6 py-1">
              <div class="h-2 bg-neutral-400 rounded"></div>
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-2 bg-neutral-400 rounded col-span-2"></div>
                  <div class="h-2 bg-neutral-400 rounded col-span-1"></div>
                </div>
                <div class="h-2 bg-neutral-400 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <PerfilReservas /> */}
    </Box>
  )
}

export default Perfil
