import { AppBar, Box, Button, IconButton, Switch, Toolbar, Typography } from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import useStore from '../store/GeneralStore';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';

export default function Header() {
  const toggleMode = useStore(state => state.toggleMode)
  const mode = useStore(state => state.mode)
  const user = useStore(state => state.user)
  const logout = useStore(state => state.logout)
  return (
    <Box>
      <AppBar position='static' color='primary'>
      <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Padel app
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           {user && user.name+" ("+user.saldo+")"}
          </Typography>
            <IconButton onClick={toggleMode} color='secondary'>
            {mode == "light" ? <Brightness4Icon  color="inherit"/>: <Brightness7Icon  color="inherit"/>}
            </IconButton>
            {user && (
              <IconButton
              size="large"
              edge="end"
              color="secondary"
              aria-label="menu"
              onClick={logout}
            >
              <LogoutIcon />
            </IconButton>
            )}
            
        </Toolbar>
      </AppBar>
    </Box>
  )
}