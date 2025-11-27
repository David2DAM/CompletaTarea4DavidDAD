import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Box, CssBaseline, type ThemeOptions } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux'
//Aqui solo añadi el privider

import { store } from './store/index.ts';
//tambien tomo el index del store

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#8c4936',
    },
    secondary: {
      main: '#a06999',
    },
    background: {
      default: '#88dbd8',
      paper: '#fcfcfcff',
    },
    text: {
      primary: 'rgba(0,0,0,0.87)',
    },
  },
};

const theme = createTheme(themeOptions);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
    <CssBaseline/>
          {/*Tambien lo añado aqui, para que se aplique en el codigo */}
      <Provider store={store}>
    <App />
          </Provider>
    </ThemeProvider>
  </StrictMode>,
)


  