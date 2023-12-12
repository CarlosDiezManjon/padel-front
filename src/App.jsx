import React, { useMemo } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import useStore from './store/GeneralStore';
import Home from './pages/Home';
import BackdropComponent from './components/BackdropComponent';
import { mainColor } from './constants';


export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      // ...(mode == 'light'
      //   ? {
      //       // palette values for light mode
      //       primary: {
      //         main: mainColor,
      //         contrastText: '#000000'
      //       },
      //       secondary:{
      //         main: '#000000',
      //         dark: "#000000"
      //       },
      //       text: {
      //         primary: '#000000',
      //         secondary: '#000000',
      //       }
      //     }
      //   : {
      //       // palette values for dark mode
      //       primary:  {
      //         main: mainColor,
      //         contrastText: mainColor
      //       },
      //       secondary:{
      //         main: mainColor,
      //         dark: "#00000"
      //       },
      //       text: {
      //         primary: mainColor,
      //         secondary: mainColor,
      //       }
      //     }),
    },
  });
  
  const user = useStore(state => state.user)
  const mode = useStore(state => state.mode)
  const isLoading = useStore(state => state.isLoading)
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {user != null ? (
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
          </Route>
        ):
        <Route path="/"  element={<Login/>}/>
        
        }
       
      </Routes>
      <BackdropComponent open={isLoading}/>
    </ThemeProvider>
  );
}
