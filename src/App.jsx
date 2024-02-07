import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import axios from 'axios'
import React, { useEffect, useMemo } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AlertComponent from './components/AlertComponent'
import BackdropComponent from './components/BackdropComponent'
import ConfirmationDialog from './components/ConfirmationDialog'
import CustomErrorDialog from './components/CustomErrorDialog'
import { baseUrl } from './constants'
import Layout from './layout/Layout'
import Administracion from './pages/admin/Administracion'
import GestionPistaIndividual from './pages/admin/pistas/GestionPistaIndividual'
import GestionPistas from './pages/admin/pistas/GestionPistas'
import GestionUsuarioIndividual from './pages/admin/usuarios/GestionUsuarioIndividual'
import GestionUsuarios from './pages/admin/usuarios/GestionUsuarios'
import Cancelacion from './pages/reservas/Cancelacion'
import Cartera from './pages/Cartera'
import Home from './pages/Home'
import Login from './pages/Login'
import Parrillas from './pages/reservas/Parrillas'
import Perfil from './pages/perfil/Perfil'
import Registro from './pages/Registro'
import Reserva from './pages/reservas/Reserva'
import useStore from './store/GeneralStore'
import { parseJwt } from './utils/utils'
import GestionTarifas from './pages/admin/tarifas/GestionTarifas'
import GestionTarifaIndividual from './pages/admin/tarifas/GestionTarifaIndividual'
import Informes from './pages/admin/informes/Informes'
import GestionSaldoUsuario from './pages/admin/usuarios/GestionSaldoUsuario'

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const getDesignTokens = (mode) => ({
    palette: {
      mode,
    },
    typography: {
      fontFamily: "'Kanit', fallback-fonts",
    },
  })
  const navigate = useNavigate()
  const setToken = useStore((state) => state.setToken)
  const setUser = useStore((state) => state.setUser)
  const setAxios = useStore((state) => state.setAxios)
  const token = useStore((state) => state.token)
  const error = useStore((state) => state.error)
  const onCloseError = useStore((state) => state.onCloseError)
  const mode = useStore((state) => state.mode)
  const isLoading = useStore((state) => state.isLoading)
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  function inicializeSession() {
    const localToken = localStorage.getItem('token')
    if (localToken != null) {
      setToken(localToken)
      setUser(parseJwt(localToken))
      const axiosInstance = axios.create({
        baseURL: baseUrl,
        headers: { Authorization: `Bearer ${localToken}` },
      })
      setAxios(axiosInstance)
    } else {
      navigate('/')
    }
  }

  useEffect(() => {
    inicializeSession()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {token != null ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/cartera" element={<Cartera />} />
            <Route path="/parrillas" element={<Parrillas />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/reserva" element={<Reserva />} />
            <Route path="/cancelacion" element={<Cancelacion />} />
            <Route path="/administracion" element={<Administracion />} />
            <Route path="/gestion-usuarios" element={<GestionUsuarios />} />
            <Route path="/gestion-usuarios/:id" element={<GestionUsuarioIndividual />} />
            <Route path="/gestion-pistas" element={<GestionPistas />} />
            <Route path="/gestion-pistas/:id" element={<GestionPistaIndividual />} />
            <Route path="/gestion-tarifas" element={<GestionTarifas />} />
            <Route path="/gestion-tarifas/:id" element={<GestionTarifaIndividual />} />
            <Route path="/gestion-saldo-usuario/:id" element={<GestionSaldoUsuario />} />
            <Route path="/informes" element={<Informes />} />
          </Route>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
          </>
        )}
      </Routes>
      <CustomErrorDialog
        open={error != null}
        message={error?.message}
        onClose={onCloseError}
        tipo={error?.tipo}
      />
      <BackdropComponent open={isLoading} />
      <ConfirmationDialog />
      <AlertComponent />
    </ThemeProvider>
  )
}
