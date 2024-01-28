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
import './Footer.css'

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
      label: 'Inicio',
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
      label: 'Admin',
      icon: 'settings-outline',
      link: '/administracion',
      admin: true,
    },
  ]
  // Reemplaza esto con tu lista de enlaces

  return (
    // <div className="navigation" id="footer" style={{ top: 'auto', bottom: 0 }}>
    //   <ul>
    //     {listFooter
    //       .filter((item) => (user.tipo == 2 ? true : item.admin === false))
    //       .map((item, index) => (
    //         <li
    //           key={index}
    //           className={index === currentTab ? 'list active' : 'list'}
    //           onClick={() => handleChangeTab(item, index)}
    //         >
    //           <div>
    //             <span className="icon">
    //               <ion-icon name={item.icon}></ion-icon>
    //             </span>
    //             <span className="text">{item.label}</span>
    //           </div>
    //         </li>
    //       ))}
    //     <div className="indicator"></div>
    //   </ul>
    // </div>
    <div className="fixed top-auto bottom-0 h-16 text-white bg-gradient-to-tr from-black to-semiblack w-full flex justify-center py-1">
      {listFooter
        .filter((item) => (user.tipo == 2 ? true : item.admin === false))
        .map((item, index) => (
          <div
            key={index}
            className={
              'h-full  w-20 flex flex-col items-center justify-center mx-1 rounded font-medium py-2 transition duration-500 cursor-pointer text-3xl' +
              (index === currentTab ? ' bg-main-500 text-xl' : '')
            }
            onClick={() => handleChangeTab(item, index)}
          >
            <div
              className={
                'flex flex-col items-center ' +
                (index === currentTab ? ' text-xl justify-center' : 'text-3xl justify-center')
              }
            >
              <ion-icon name={item.icon}></ion-icon>
              <span className={index === currentTab ? 'flex text-base' : 'hidden'}>
                {item.label}
              </span>
            </div>
          </div>
        ))}
    </div>
  )
}
