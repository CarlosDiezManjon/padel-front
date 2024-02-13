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
import GestionActividades from './pages/admin/actividades/GestionActividades'
import Administracion from './pages/admin/Administracion'
import Informes from './pages/admin/informes/Informes'
import GestionPistaIndividual from './pages/admin/pistas/GestionPistaIndividual'
import GestionPistas from './pages/admin/pistas/GestionPistas'
import GestionTarifaIndividual from './pages/admin/tarifas/GestionTarifaIndividual'
import GestionTarifas from './pages/admin/tarifas/GestionTarifas'
import GestionUsuarioIndividual from './pages/admin/usuarios/GestionUsuarioIndividual'
import GestionUsuarios from './pages/admin/usuarios/GestionUsuarios'
import Cartera from './pages/Cartera'
import Home from './pages/Home'
import Login from './pages/Login'
import Perfil from './pages/perfil/Perfil'
import Registro from './pages/Registro'
import Cancelacion from './pages/reservas/Cancelacion'
import Parrillas from './pages/reservas/Parrillas'
import Reserva from './pages/reservas/Reserva'
import useStore from './store/GeneralStore'
import { parseJwt } from './utils/utils'
import GestionActividadIndividual from './pages/admin/actividades/GestionActividadIndividual'
import ProtectedRoute from './router/ProtectedRoute'
import UnprotectedRoute from './router/UnprotectedRoute'

export default function App() {
  const navigate = useNavigate()
  const setToken = useStore((state) => state.setToken)
  const setUser = useStore((state) => state.setUser)
  const setAxios = useStore((state) => state.setAxios)
  const token = useStore((state) => state.token)

  function inicializeSession() {
    const localToken = localStorage.getItem('token')
    if (localToken != null) {
      console.log('Token: ', localToken)
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
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/cartera" element={<Cartera />} />
          <Route path="/parrillas/:id" element={<Parrillas />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/cancelacion" element={<Cancelacion />} />
          <Route
            path="/gestion"
            element={
              <ProtectedRoute>
                <Administracion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gestion/usuarios"
            element={
              <ProtectedRoute>
                <GestionUsuarios />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gestion/usuarios/:id"
            element={
              <ProtectedRoute>
                <GestionUsuarioIndividual />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gestion/pistas"
            element={
              <ProtectedRoute>
                <GestionPistas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gestion/pistas/:id"
            element={
              <ProtectedRoute>
                <GestionPistaIndividual />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gestion/tarifas"
            element={
              <ProtectedRoute>
                <GestionTarifas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gestion/tarifas/:id"
            element={
              <ProtectedRoute>
                <GestionTarifaIndividual />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gestion/actividades"
            element={
              <ProtectedRoute>
                <GestionActividades />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gestion/actividades/:id"
            element={
              <ProtectedRoute>
                <GestionActividadIndividual />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gestion/informes"
            element={
              <ProtectedRoute>
                <Informes />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/login"
          element={
            <UnprotectedRoute>
              <Login />
            </UnprotectedRoute>
          }
        />
        <Route
          path="registro"
          element={
            <UnprotectedRoute>
              <Registro />
            </UnprotectedRoute>
          }
        />
      </Routes>
      <CustomErrorDialog />
      <BackdropComponent />
      <ConfirmationDialog />
      <AlertComponent />
    </>
  )
}
