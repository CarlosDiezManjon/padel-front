import { AppBar, Box, Button, Checkbox, Container, FormControlLabel, Grid, IconButton, InputAdornment, Link, Paper, Switch, TextField, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import useStore from '../store/GeneralStore';
import Header from '../layout/Header';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Login() {
  const login = useStore(state => state.login)
  const startLoading = useStore(state => state.startLoading)
  const endLoading = useStore(state => state.endLoading)
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleSubmit = (event) => {
    startLoading()
   
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setTimeout(() => {
      endLoading()
      login({username: data.get("email"), name: "Carlos Díez", password: data.get("password"), saldo: "0€"})
    }, 1000);
  };
  return (
    <Box>
      <Header/>
      <Container component="main" maxWidth="sm">
      <Paper
      color='primary'
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
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
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type={showPassword ? "text" : "password"} 
            id="password"
            autoComplete="current-password"
            InputProps={{ // <-- This is where the toggle button is added.
              endAdornment: (
                  <IconButton
                    color='default'
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
              )
            }}
            
          />
          <Button
            type="submit"
            color='primary'
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
           <Typography component="h6" variant="h6">
          Entrar
        </Typography>
          </Button>
          <Grid container color='secondary'>
            <Grid item xs>
              <Link href="#" variant="body2" color='inherit'>
                ¿Olvidaste la contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" color='inherit'>
                {"Registrarse"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
    </Box>
  )
}
