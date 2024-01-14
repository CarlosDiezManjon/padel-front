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

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      // ...(mode == 'light'
      //   ? {
      //       // palette values for light mode
      //       primary: {
      //         main: mainColor,
      //         contrastText: '#000000'
      //       },
      //       secondary:{
      //         main: '#000000',
      //         dark: "#000000"
      //       },
      //       text: {
      //         primary: '#000000',
      //         secondary: '#000000',
      //       }
      //     }
      //   : {
      //       // palette values for dark mode
      //       primary:  {
      //         main: mainColor,
      //         contrastText: mainColor
      //       },
      //       secondary:{
      //         main: mainColor,
      //         dark: "#00000"
      //       },
      //       text: {
      //         primary: mainColor,
      //         secondary: mainColor,
      //       }
      //     }),
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
