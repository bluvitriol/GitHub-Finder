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
            primary: darkMode ? '#e1dddd' : '#000000', // default text color white in dark mode, black in light mode
            secondary: darkMode ? '#ffffff' : '#757575', // secondary text color grey in dark mode, white in light mode
            third: '#79839b',
          },
          background: {
            default: darkMode ? '#141b2e' : '#f5f8ff', // default background color: dark grey in dark mode, white in light mode
            paper: darkMode ? '#1d2a4a' : '#ffffff', // background color for paper components: darker grey in dark mode, light grey in light mode
          },
          action: {
            // active: darkMode ? '#bb86fc' : '#001f3f', // active color for icons and buttons: purple in dark mode, darker blue in light mode
            active: '#0676f8',
            // hover: darkMode ? '#3700b3' : '#007bff', // hover color for buttons: darker purple in dark mode, light blue in light mode
            hover: '#00aeff',
          },
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



