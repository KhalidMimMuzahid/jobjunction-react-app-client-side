import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#fcba03',
    },
    secondary: {
      main: '#a11a83',
    },
    error: {
      main: red.A400,
    },
    background: {
        default: '#a15590',
    },

  },
  typography: {
    fontFamily: 'Times New Roman',
    h1:{
      color:"red"
    }
  },
  
});

export default lightTheme;

