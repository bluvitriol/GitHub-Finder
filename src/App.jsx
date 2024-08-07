import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Content from './components/Content';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: '#0676f8', // light blue (button)
          },
          secondary: {
            main: '#131052', // dark blue
          },
          text: {
            primary: darkMode ? '#e1dddd' : '#000000', // white in dark mode, black in light mode
            secondary: darkMode ? '#ffffff' : '#757575', //  grey in dark mode, white in light mode
            third: '#79839b',
          },
          background: {
            default: darkMode ? '#141b2e' : '#f5f8ff',  
            paper: darkMode ? '#1d2a4a' : '#ffffff',
          },
          // action: {
          //   // active: darkMode ? '#bb86fc' : '#001f3f', 
          //   active: '#0676f8',
          //   // hover: darkMode ? '#3700b3' : '#007bff', 
          //   hover: '#00aeff',
          // },
        },
      }),
    [darkMode]
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <div className="app flex flex-col gap-5 w-auto"> */}
      <div className="app flex justify-center" style={{ color: theme.palette.background.default }}>
        <Content darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
    </ThemeProvider>
  );
}

export default App;



