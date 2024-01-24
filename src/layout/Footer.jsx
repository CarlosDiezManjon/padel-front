import { AppBar, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import React, { useEffect } from 'react'
import RestoreIcon from '@mui/icons-material/Restore'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ArchiveIcon from '@mui/icons-material/Archive'
import HomeIcon from '@mui/icons-material/Home'
import useStore from '../store/GeneralStore'
import { Link } from 'react-router-dom'
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import HistoryIcon from '@mui/icons-material/History'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import WalletIcon from '@mui/icons-material/Wallet'

export default function Footer() {
  const currentTab = useStore((state) => state.currentTab)
  const setCurrentTab = useStore((state) => state.setCurrentTab)
  const user = useStore((state) => state.user)
  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <BottomNavigation
        color="primary"
        showLabels
        value={currentTab}
        onChange={(event, newValue) => {
          setCurrentTab(newValue)
        }}
      >
        <BottomNavigationAction
          color="primary"
          icon={<HomeIcon fontSize="large" />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          color="primary"
          icon={<WalletIcon fontSize="large" />}
          component={Link}
          to="/cartera"
        />
        <BottomNavigationAction
          color="primary"
          icon={<PermIdentityIcon fontSize="large" />}
          component={Link}
          to="/perfil"
        />
        {user?.tipo == 2 && (
          <BottomNavigationAction
            color="primary"
            icon={<AdminPanelSettingsIcon fontSize="large" />}
            component={Link}
            to="/administracion"
          />
        )}
      </BottomNavigation>
    </AppBar>
  )
}
