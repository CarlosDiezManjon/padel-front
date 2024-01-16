import { Box, Button, TextField, Paper, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../layout/Header'
import useRegisterRequest from '../services/registro.service'

const Registro = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')
  const { register, data } = useRegisterRequest()

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
    if (password !== e.target.value) {
      setConfirmPasswordError('Las contraseñas no coinciden')
    } else {
      setConfirmPasswordError('')
    }
  }
  const handlePasswordChange = (e) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/
    const isValidPassword = passwordRegex.test(e.target.value)
    setPassword(e.target.value)

    if (!isValidPassword) {
      // Handle invalid password error
      setPasswordError(
        'La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número'
      )
    } else {
      setPasswordError('')
    }
  }

  const handleEmailChange = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValidEmail = emailRegex.test(e.target.value)
    setEmail(e.target.value)

    if (!isValidEmail) {
      // Handle invalid email error
      setEmailError('El email no es válido')
    } else {
      setEmailError('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    register(data)
  }

  useEffect(() => {
    if (data) {
      navigate('/')
    }
  }, [data])

  const goToLogin = () => {
    navigate('/')
  }

  return (
    <Box>
      <Header />
      <Container component="main" maxWidth="sm">
        <Paper
          color="primary"
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            REGISTRO
          </Typography>
          {data ? (
            <Typography component="h1" variant="h5">
              Registro correcto
            </Typography>
          ) : (
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                label="Username"
                name="username"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                name="nombre"
                required
                margin="normal"
                label="Nombre"
                autoComplete="off"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                name="apellidos"
                required
                margin="normal"
                fullWidth
                label="Surname"
                autoComplete="off"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
              <TextField
                name="email"
                required
                fullWidth
                margin="normal"
                label="Email"
                type="email"
                autoComplete="off"
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}
                helperText={emailError}
              />
              <TextField
                name="telefono"
                required
                margin="normal"
                fullWidth
                label="Phone"
                autoComplete="off"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                label="Password"
                name="password"
                fullWidth
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={handlePasswordChange}
                error={!!passwordError}
                helperText={passwordError}
              />
              <TextField
                fullWidth
                required
                margin="normal"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                autoComplete="off"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
              />
              <Button
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={
                  username === '' ||
                  password === '' ||
                  confirmPassword === '' ||
                  confirmPasswordError !== '' ||
                  name === '' ||
                  surname === '' ||
                  email === '' ||
                  phone === ''
                }
              >
                <Typography component="h6" variant="h6">
                  Registrarse
                </Typography>
              </Button>
              <Button type="submit" color="inherit" fullWidth variant="text" onClick={goToLogin}>
                <Typography component="h6" variant="h6">
                  Volver a Login
                </Typography>
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  )
}

export default Registro
