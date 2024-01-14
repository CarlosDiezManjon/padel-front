import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../constants'
import Header from '../layout/Header'
import useLoginRequest from '../services/login.service'
import useStore from '../store/GeneralStore'
import { parseJwt } from '../utils/utils'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const setToken = useStore((state) => state.setToken)
  const setUser = useStore((state) => state.setUser)
  const setAxios = useStore((state) => state.setAxios)
  const { login, data } = useLoginRequest()
  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())
    login(data)
  }

  const goToRegister = () => {
    navigate('/registro')
  }

  useEffect(() => {
    if (data) {
      setToken(data)
      setUser(parseJwt(data))
      const axiosInstance = axios.create({
        baseURL: baseUrl,
        headers: { Authorization: `Bearer ${data}` },
      })
      setAxios(axiosInstance)
    }
  }, [data])
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
            PADEL
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuario"
              name="username"
              autoComplete="Usuario"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <IconButton
                    color="default"
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                ),
              }}
            />
            <Button
              type="submit"
              color="primary"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={username === '' || password === ''}
            >
              <Typography component="h6" variant="h6">
                Entrar
              </Typography>
            </Button>
            <Grid container color="secondary">
              <Grid item xs>
                <Button variant="text" color="inherit" sx={{ fontSize: '13px', p: 0, pt: 2 }}>
                  ¿Olvidaste la contraseña?
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="text"
                  color="inherit"
                  onClick={goToRegister}
                  sx={{ fontSize: '13px', p: 0, pt: 2 }}
                >
                  Registrarse
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
