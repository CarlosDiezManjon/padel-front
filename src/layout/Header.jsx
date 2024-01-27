import AccountCircle from '@mui/icons-material/AccountCircle'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import LogoutIcon from '@mui/icons-material/Logout'
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useStore from '../store/GeneralStore'
import { useLocation, useNavigate } from 'react-router-dom'
export default function Header() {
  const toggleMode = useStore((state) => state.toggleMode)
  const mode = useStore((state) => state.mode)
  const user = useStore((state) => state.user)
  const setUser = useStore((state) => state.setUser)
  const setToken = useStore((state) => state.setToken)
  const setCurrentTab = useStore((state) => state.setCurrentTab)
  const [title, setTitle] = useState('')
  const [bigHeader, setBigHeader] = useState(false)
  const [backButton, setBackButton] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (/^\/gestion-usuarios\/\d+$/.test(location.pathname)) {
      setTitle('Ficha usuario')
      setBackButton(true)
      setCurrentTab(3)
      setBigHeader(false)
    } else if (/^\/gestion-pistas\/(\d+|\w+)$/.test(location.pathname)) {
      setTitle('Ficha pista')
      setBackButton(true)
      setCurrentTab(3)
      setBigHeader(false)
    } else {
      switch (location.pathname) {
        case '/':
          setBackButton(false)
          setTitle('Inicio')
          setCurrentTab(0)
          setBigHeader(false)
          break
        case '/parrillas':
          setBackButton(true)
          setTitle('Parrillas')
          setCurrentTab(0)
          setBigHeader(false)
          break
        case '/cartera':
          setBackButton(false)
          setTitle('Cartera')
          setCurrentTab(1)
          setBigHeader(false)
          break
        case '/perfil':
          setBackButton(false)
          setTitle('Perfil')
          setCurrentTab(2)
          setBigHeader(false)
          break
        case '/administracion':
          setBackButton(false)
          setTitle('Administración')
          setCurrentTab(3)
          setBigHeader(false)
          break
        case '/gestion-usuarios':
          setBackButton(true)
          setTitle('Gestión usuarios')
          setCurrentTab(3)
          setBigHeader(false)
          break
        case '/gestion-pistas':
          setBackButton(true)
          setTitle('Gestión pistas')
          setCurrentTab(3)
          setBigHeader(false)
          break
        case '/gestion-reservas':
          setBackButton(true)
          setTitle('Gestión reservas')
          setCurrentTab(3)
          setBigHeader(false)
          break
        case '/registro':
          setBackButton(false)
          setTitle('Registro')
          setBigHeader(false)
          break
        case '/reserva':
          setTitle('Reserva')
          setBackButton(true)
          setBigHeader(false)
          break

        default:
          setTitle('Error')
          setBigHeader(false)
          setBackButton(false)
          break
      }
    }
  }, [location])

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMyAccount = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    navigate('/')
  }

  // const ToggleModeItem = () => {
  //   const handleToggle = () => {
  //     toggleMode()
  //     handleClose()
  //   }
  //   return (
  //     <MenuItem onClick={handleToggle}>
  //       {mode == 'light' ? (
  //         <>
  //           {' '}
  //           <Brightness4Icon color="inherit" sx={{ mr: 1 }} />
  //           Modo oscuro
  //         </>
  //       ) : (
  //         <>
  //           <Brightness7Icon sx={{ mr: 1 }} color="inherit" />
  //           Modo claro
  //         </>
  //       )}
  //     </MenuItem>
  //   )
  // }
  return (
    <AppBar position="fixed" id="header">
      {bigHeader ? (
        <div className="h-40"></div>
      ) : (
        <Toolbar sx={{ pl: 1 }}>
          {backButton ? (
            <IconButton onClick={() => navigate(-1)} sx={{ p: 0, pr: 1 }} color="inherit">
              <ArrowBackIosNewIcon />
            </IconButton>
          ) : (
            <Box sx={{ width: '32px' }}></Box>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {user && (
            <>
              <IconButton onClick={handleMenu} color="inherit" edge="end">
                <AccountCircle />
              </IconButton>
              <Menu
                color="inherit"
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {/* <ToggleModeItem /> */}
                <MenuItem onClick={handleMyAccount}>
                  {' '}
                  <AccountCircle sx={{ mr: 1 }} />
                  Mi cuenta
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  {' '}
                  <LogoutIcon sx={{ mr: 1 }} />
                  Cerrar sesión
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      )}
    </AppBar>
  )
}
