import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import React, { useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'
import BackdropComponent from './components/BackdropComponent'
import CustomDialog from './components/CustomDialog'
import Layout from './layout/Layout'
import Historial from './pages/Historial'
import Home from './pages/Home'
import Login from './pages/Login'
import Perfil from './pages/Perfil'
import Pistas from './pages/Pistas'
import Registro from './pages/Registro'
import Reservas from './pages/Reservas'
import Saldo from './pages/Saldo'
import useStore from './store/GeneralStore'
import Administracion from './pages/admin/Administracion'
import GestionPistas from './pages/admin/GestionPistas'
import GestionUsuarios from './pages/admin/GestionUsuarios'
import GestionReservas from './pages/admin/GestionReservas'

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const getDesignTokens = (mode) => ({
    palette: {
      mode,
    },
  })

  const token = useStore((state) => state.token)
  const error = useStore((state) => state.error)
  const onCloseError = useStore((state) => state.onCloseError)
  const mode = useStore((state) => state.mode)
  const isLoading = useStore((state) => state.isLoading)
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {token != null ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/saldo" element={<Saldo />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/pistas" element={<Pistas />} />
            <Route path="/historial" element={<Historial />} />
            <Route path="/administracion" element={<Administracion />} />
            <Route path="/gestion-usuarios" element={<GestionUsuarios />} />
            <Route path="/gestion-pistas" element={<GestionPistas />} />
            <Route path="/gestion-reservas" element={<GestionReservas />} />
          </Route>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
          </>
        )}
      </Routes>
      <CustomDialog open={error != null} message={error} onClose={onCloseError} />
      <BackdropComponent open={isLoading} />
    </ThemeProvider>
  )
}
