import AccountCircle from '@mui/icons-material/AccountCircle'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import LogoutIcon from '@mui/icons-material/Logout'
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import useStore from '../store/GeneralStore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { datetimeToStringTime } from '../utils/utils'
import useGetRequest from '../services/get.service'
export default function Header() {
  const toggleMode = useStore((state) => state.toggleMode)
  const mode = useStore((state) => state.mode)
  const user = useStore((state) => state.user)
  const setCurrentTab = useStore((state) => state.setCurrentTab)
  const [title, setTitle] = useState('')
  const [bigHeader, setBigHeader] = useState(false)
  const [backButton, setBackButton] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [openMenu, setOpenMenu] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const clearState = useStore((state) => state.clearState)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [actividades, setActividades] = useState([{}])
  const { id } = useParams()
  const menuRef = useRef(null)

  const { getRequest, data } = useGetRequest()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    getRequest('/actividades-activas')
    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    if (data) {
      setActividades(data.actividades)
    }
  }, [data])

  const getActividadNombre = () => {
    const actividad = actividades.find((actividad) => actividad.id == id)
    return actividad ? actividad.nombre : ''
  }

  useEffect(() => {
    if (/^\/gestion\/usuarios\/(\d+|\w+)$/.test(location.pathname)) {
      setTitle('Ficha usuario')
      setBackButton(true)
      setCurrentTab(3)
      setBigHeader(false)
    } else if (/^\/gestion\/pistas\/(\d+|\w+)$/.test(location.pathname)) {
      setTitle('Ficha pista')
      setBackButton(true)
      setCurrentTab(3)
      setBigHeader(false)
    } else if (/^\/gestion\/tarifas\/(\d+|\w+)$/.test(location.pathname)) {
      setTitle('Ficha tarifa')
      setBackButton(true)
      setCurrentTab(3)
      setBigHeader(false)
    } else if (/^\/gestion\/actividades\/(\d+|\w+)$/.test(location.pathname)) {
      setTitle('Ficha actividad')
      setBackButton(true)
      setCurrentTab(3)
      setBigHeader(false)
    } else if (/^\/parrillas\/(\d+|\w+)$/.test(location.pathname)) {
      setTitle(getActividadNombre())
      setBackButton(true)
      setCurrentTab(0)
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
        case '/reserva':
          setTitle('Reserva')
          setBackButton(true)
          setBigHeader(false)
          setCurrentTab(0)
          break
        case '/cancelacion':
          setBackButton(true)
          setTitle('Cancelación')
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
        case '/gestion':
          setBackButton(false)
          setTitle('Administración')
          setCurrentTab(3)
          setBigHeader(false)
          break
        case '/gestion/usuarios':
          setBackButton(true)
          setTitle('Usuarios')
          setCurrentTab(3)
          setBigHeader(false)
          break
        case '/gestion/pistas':
          setBackButton(true)
          setTitle('Pistas')
          setCurrentTab(3)
          setBigHeader(false)
          break
        case '/gestion/tarifas':
          setBackButton(true)
          setTitle('Tarifas')
          setCurrentTab(3)
          setBigHeader(false)
          break
        case '/gestion/actividades':
          setBackButton(true)
          setTitle('Actividades')
          setCurrentTab(3)
          setBigHeader(false)
          break
        case '/registro':
          setBackButton(false)
          setTitle('Registro')
          setBigHeader(false)
          break
        case '/gestion/informes':
          setBackButton(false)
          setTitle('Informes')
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
    setOpenMenu(!openMenu)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setOpenMenu(false)
  }

  const handleLogout = () => {
    clearState()
    localStorage.removeItem('token')
  }

  const handleToggle = () => {
    toggleMode()
    document.body.classList.toggle('dark')
    handleClose()
  }
  return (
    <AppBar position="fixed" id="header" sx={{ boxShadow: 'none' }}>
      {bigHeader ? (
        <div className="h-40"></div>
      ) : (
        <div className="max-w-4xl flex h-12 items-center px-1 min-w-full xl:min-w-main lg:min-w-main text-primary border-b border-secondary dark:border-text dark:text-text">
          {backButton ? (
            <IconButton onClick={() => navigate(-1)} sx={{ p: 0, pr: 1 }} color="inherit">
              <ArrowBackIosNewIcon />
            </IconButton>
          ) : (
            <div className="w-5"></div>
          )}
          <div className="flex-grow">
            <h1 className="text-xl">{title}</h1>
          </div>
          {user && (
            <>
              <h1 className="text-xl mr-2 px-1 max-w-20 min-w-20">
                {datetimeToStringTime(currentTime)}
              </h1>
              <div
                className="flex items-center text-xl mr-0 cursor-pointer relative"
                onClick={handleMenu}
              >
                <h1>{user.nombre}</h1>
                <MoreVertIcon />
                {openMenu && (
                  <div
                    ref={menuRef}
                    className="absolute z-10 mt-1 bg-backgroundFrom rounded-md shadow-lg p-0 top-9 right-0 w-52 text-primary dark:text-text"
                  >
                    <div
                      className="p-2 py-3 bg-transparent hover:bg-light dark:hover:text-background cursor-pointer rounded-md"
                      onClick={handleToggle}
                    >
                      {mode == 'light' ? (
                        <>
                          {' '}
                          <Brightness4Icon className="mr-2" />
                          Modo oscuro
                        </>
                      ) : (
                        <>
                          <Brightness7Icon className="mr-2" />
                          Modo claro
                        </>
                      )}
                    </div>

                    <div
                      onClick={handleLogout}
                      className="p-2 py-3 bg-transparent hover:bg-light dark:hover:text-background cursor-pointer rounded-md"
                    >
                      {' '}
                      <LogoutIcon sx={{ mr: 1 }} />
                      Cerrar sesión
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </AppBar>
  )
}
