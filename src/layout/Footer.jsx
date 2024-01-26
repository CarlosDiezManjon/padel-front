import { AppBar, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RestoreIcon from '@mui/icons-material/Restore'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ArchiveIcon from '@mui/icons-material/Archive'
import HomeIcon from '@mui/icons-material/Home'
import useStore from '../store/GeneralStore'
import { Link, useNavigate } from 'react-router-dom'
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import HistoryIcon from '@mui/icons-material/History'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import WalletIcon from '@mui/icons-material/Wallet'
import './Layout.css'

export default function Footer() {
  const currentTab = useStore((state) => state.currentTab)
  const setCurrentTab = useStore((state) => state.setCurrentTab)
  const user = useStore((state) => state.user)
  const navigate = useNavigate()
  const handleChangeTab = (item, index) => {
    navigate(item.link)
    setCurrentTab(index)
  }
  const listFooter = [
    {
      label: 'Home',
      icon: 'home-outline',
      link: '/',
      admin: false,
    },
    {
      label: 'Cartera',
      icon: 'wallet-outline',
      link: '/cartera',
      admin: false,
    },
    {
      label: 'Perfil',
      icon: 'person-outline',
      link: '/perfil',
      admin: false,
    },
    {
      label: 'Administración',
      icon: 'settings-outline',
      link: '/administracion',
      admin: true,
    },
  ]
  // Reemplaza esto con tu lista de enlaces

  return (
    <div className="navigation" id="footer" style={{ top: 'auto', bottom: 0 }}>
      <ul>
        {listFooter
          .filter((item) => (user.tipo == 2 ? true : item.admin === false))
          .map((item, index) => (
            <li
              key={index}
              className={index === currentTab ? 'list active' : 'list'}
              onClick={() => handleChangeTab(item, index)}
            >
              <a>
                <span className="icon">
                  <ion-icon name={item.icon}></ion-icon>
                </span>
                <span className="text">{item.label}</span>
              </a>
            </li>
          ))}
        <div className="indicator"></div>
      </ul>
    </div>
  )
}
// <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
//   <BottomNavigation
//     color="primary"
//     showLabels
//     value={currentTab}
//     onChange={(event, newValue) => {
//       setCurrentTab(newValue)
//     }}
//   >
//     <BottomNavigationAction
//       color="primary"
//       icon={<HomeIcon fontSize="large" />}
//       component={Link}
//       to="/"
//     />
//     <BottomNavigationAction
//       color="primary"
//       icon={<WalletIcon fontSize="large" />}
//       component={Link}
//       to="/cartera"
//     />
//     <BottomNavigationAction
//       color="primary"
//       icon={<PermIdentityIcon fontSize="large" />}
//       component={Link}
//       to="/perfil"
//     />
//     {user?.tipo == 2 && (
//       <BottomNavigationAction
//         color="primary"
//         icon={<AdminPanelSettingsIcon fontSize="large" />}
//         component={Link}
//         to="/administracion"
//       />
//     )}
//   </BottomNavigation>
// </AppBar>
