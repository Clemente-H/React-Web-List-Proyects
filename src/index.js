import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserProvider } from './components/UserContext'; // Asegúrate de que la ruta sea correcta

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffeb3b', // Negro
    },
    secondary: {
      main: '#000000', // Negro
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserProvider>
        <App />
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);
