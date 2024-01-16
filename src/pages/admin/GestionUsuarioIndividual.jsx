import React, { useState } from 'react'
import {
  TextField,
  Button,
  Card,
  CardContent,
  Box,
  InputAdornment,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from '@mui/material'
import { datetimeToStringMinutes } from '../../utils/utils'

const GestionUsuarioIndividual = ({ user, setUserSelected }) => {
  const [usuario, setUsuario] = useState(user)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }))
  }

  const handleSaveChanges = () => {
    // Lógica para guardar los cambios del usuario
  }

  const handleRevertChanges = () => {
    setUsuario(user)
  }

  const handleDeleteUser = () => {
    // Lógica para dar de baja al usuario
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TextField
          sx={{ mr: '4%', width: '50%' }}
          margin="normal"
          name="username"
          label="Username"
          value={usuario.username}
          onChange={handleInputChange}
        />
        <TextField
          sx={{ width: '50%' }}
          margin="normal"
          name="nombre"
          label="Nombre"
          value={usuario.nombre}
          onChange={handleInputChange}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TextField
          sx={{ mr: '4%', width: '50%' }}
          margin="normal"
          name="apellidos"
          label="Apellidos"
          value={usuario.apellidos}
          onChange={handleInputChange}
        />
        <FormControl sx={{ width: '50%' }} margin="normal">
          <InputLabel id="tipo">Tipo usuario</InputLabel>
          <Select
            labelId="tipo"
            id="tipo"
            name="tipo"
            value={usuario.tipo}
            label="Tipo usuario"
            onChange={handleInputChange}
          >
            <MenuItem value={1}>Usuario</MenuItem>
            <MenuItem value={2}>Administrador</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TextField
          sx={{ mr: '3%', width: '67%' }}
          margin="normal"
          name="email"
          label="Email"
          value={usuario.email}
          onChange={handleInputChange}
        />
        <TextField
          sx={{ width: '30%' }}
          margin="normal"
          name="telefono"
          label="Teléfono"
          value={usuario.telefono}
          onChange={handleInputChange}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TextField
          sx={{ mr: '4%' }}
          margin="normal"
          name="fecha_alta"
          label="Fecha alta"
          disabled
          value={datetimeToStringMinutes(usuario.fecha_alta)}
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          name="saldo"
          label="Saldo"
          InputProps={{
            endAdornment: <InputAdornment position="end">€</InputAdornment>,
          }}
          value={usuario.saldo}
          onChange={handleInputChange}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
          width: '100%',
          mt: 2,
        }}
      >
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => setUserSelected(null)}
          sx={{ m: 0.25 }}
        >
          Volver
        </Button>
        <Button variant="contained" color="error" onClick={handleRevertChanges} sx={{ m: 0.25 }}>
          Dar de baja
        </Button>
        <Button variant="contained" color="primary" onClick={handleSaveChanges} sx={{ m: 0.25 }}>
          Guardar cambios
        </Button>
      </Box>
    </Box>
  )
}

export default GestionUsuarioIndividual
