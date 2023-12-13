import { AppBar, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import React from 'react'
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive'
import useStore from '../store/GeneralStore';
import { Link } from 'react-router-dom';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import HistoryIcon from '@mui/icons-material/History';

export default function Footer() {

  const currentTab = useStore(state => state.currentTab)
  const setCurrentTab = useStore(state => state.setCurrentTab)
  const [value, setValue] = React.useState(0);
  return (
    <AppBar position='fixed' color='primary' sx={{ top: 'auto', bottom: 0 }}>
      <BottomNavigation
          showLabels
          value={currentTab}
          onChange={(event, newValue) => {
            setCurrentTab(newValue);
          }}
        >
          <BottomNavigationAction label="Inicio" icon={<SportsBaseballIcon />} component={Link} to="/"/>
          <BottomNavigationAction label="Historial" icon={<HistoryIcon />} component={Link} to="/historial" />
          <BottomNavigationAction label="Perfil" icon={<PermIdentityIcon />} component={Link} to="/perfil" />
        </BottomNavigation>
    </AppBar>
  )
}
