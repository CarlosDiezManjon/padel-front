import AccountCircle from '@mui/icons-material/AccountCircle'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import LogoutIcon from '@mui/icons-material/Logout'
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import useStore from '../store/GeneralStore'
import { useNavigate } from 'react-router-dom'
export default function Header() {
  const toggleMode = useStore((state) => state.toggleMode)
  const mode = useStore((state) => state.mode)
  const user = useStore((state) => state.user)
  const setToken = useStore((state) => state.setToken)
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()

  const handleMenu = (event) => {
    //TODO Go to the account page
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
    navigate('/')
  }

  const DarkModeItem = () => {
    const handleToggle = () => {
      toggleMode()
      handleClose()
    }
    return (
      <MenuItem onClick={handleToggle}>
        {mode == 'light' ? (
          <Brightness4Icon color="inherit" sx={{ mr: 1 }} />
        ) : (
          <Brightness7Icon sx={{ mr: 1 }} color="inherit" />
        )}
        Mode
      </MenuItem>
    )
  }
  return (
    <Box>
      <AppBar position="fixed" color="primary" sx={{ top: 0, bottom: 'auto' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
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
                <DarkModeItem />
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
      </AppBar>
    </Box>
  )
}
