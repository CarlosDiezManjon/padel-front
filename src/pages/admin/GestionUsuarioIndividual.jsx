import React, { useState } from 'react'
import { TextField, Button, Card, CardContent, Box, InputAdornment } from '@mui/material'

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
    // Lógica para revertir los cambios del usuario
  }

  const handleDeleteUser = () => {
    // Lógica para dar de baja al usuario
  }

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        fullWidth
        margin="normal"
        name="username"
        label="Username"
        value={usuario.username}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        name="nombre"
        label="Nombre"
        value={usuario.nombre}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        name="apellidos"
        label="Apellidos"
        value={usuario.apellidos}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        name="email"
        label="Email"
        value={usuario.email}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        name="telefono"
        label="Teléfono"
        value={usuario.telefono}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        name="password"
        label="Contraseña"
        value={usuario.password}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        name="saldo"
        label="Saldo"
        InputProps={{
          endAdornment: <InputAdornment position="end">€</InputAdornment>,
        }}
        value={usuario.saldo}
        onChange={handleInputChange}
      />
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
        <Button variant="contained" color="error" onClick={handleDeleteUser} sx={{ m: 0.25 }}>
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
