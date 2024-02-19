import axios from 'axios'
import React, { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AlertComponent from './components/AlertComponent'
import BackdropComponent from './components/BackdropComponent'
import ConfirmationDialog from './components/ConfirmationDialog'
import CustomErrorDialog from './components/CustomErrorDialog'
import { baseUrl } from './constants'
import Layout from './layout/Layout'
import ProtectedRoute from './router/ProtectedRoute'
import UnprotectedRoute from './router/UnprotectedRoute'
import useStore from './store/GeneralStore'
import { parseJwt } from './utils/utils'

const GestionActividades = lazy(() => import('./pages/admin/actividades/GestionActividades'))
const Administracion = lazy(() => import('./pages/admin/Administracion'))
const Informes = lazy(() => import('./pages/admin/informes/Informes'))
const GestionPistaIndividual = lazy(() => import('./pages/admin/pistas/GestionPistaIndividual'))
const GestionPistas = lazy(() => import('./pages/admin/pistas/GestionPistas'))
const GestionTarifaIndividual = lazy(() => import('./pages/admin/tarifas/GestionTarifaIndividual'))
const GestionTarifas = lazy(() => import('./pages/admin/tarifas/GestionTarifas'))
const GestionUsuarioIndividual = lazy(
  () => import('./pages/admin/usuarios/GestionUsuarioIndividual'),
)
const GestionActividadIndividual = lazy(
  () => import('./pages/admin/actividades/GestionActividadIndividual'),
)
const GestionUsuarios = lazy(() => import('./pages/admin/usuarios/GestionUsuarios'))
const Cartera = lazy(() => import('./pages/Cartera'))
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Perfil = lazy(() => import('./pages/perfil/Perfil'))
const Registro = lazy(() => import('./pages/Registro'))
const Cancelacion = lazy(() => import('./pages/reservas/Cancelacion'))
const Parrillas = lazy(() => import('./pages/reservas/Parrillas'))
const Reserva = lazy(() => import('./pages/reservas/Reserva'))

export default function App() {
  const navigate = useNavigate()
  const setToken = useStore((state) => state.setToken)
  const setUser = useStore((state) => state.setUser)
  const setAxios = useStore((state) => state.setAxios)
  const token = useStore((state) => state.token)

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
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<BackdropComponent show />}>
              <Layout />
            </Suspense>
          }
        >
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
          path="/registro"
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
