import React, { useEffect } from 'react'
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import useStore from '../../store/GeneralStore'
import { Navigate, useNavigate } from 'react-router-dom'
import PeopleIcon from '@mui/icons-material/People'
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek'
import ReceiptIcon from '@mui/icons-material/Receipt'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'

const Administracion = () => {
  const user = useStore((state) => state.user)
  const navigate = useNavigate()

  const menuItems = [
    {
      icon: <PeopleIcon />,
      text: 'Usuarios',
      path: '/gestion/usuarios',
    },
    {
      icon: <CalendarViewWeekIcon />,
      text: 'Pistas',
      path: '/gestion/pistas',
    },
    {
      icon: <ReceiptIcon />,
      text: 'Tarifas',
      path: '/gestion/tarifas',
    },
    {
      icon: <SportsSoccerIcon />,
      text: 'Tipos de actividad',
      path: '/gestion/actividades',
    },
    {
      icon: <QueryStatsIcon />,
      text: 'Informes',
      path: '/gestion/informes',
    },
  ]

  return (
    <ul className="w-full h-full text-primary dark:text-text mt-2">
      {menuItems.map((item, index) => (
        <React.Fragment key={index}>
          <li
            key={index}
            className="w-full flex h-16 cursor-pointer items-center pl-6  hover:bg-light dark:hover:text-background rounded-md my-1 transition duration-300"
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <h1 className="ml-6">{item.text}</h1>
          </li>
          <Divider className="bg-light" variant="middle" />
        </React.Fragment>
      ))}
    </ul>
  )
}

export default Administracion
