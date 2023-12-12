import { AppBar, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import React from 'react'
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive'
import useStore from '../store/GeneralStore';

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
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />}/>
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
        </BottomNavigation>
    </AppBar>
  )
}
