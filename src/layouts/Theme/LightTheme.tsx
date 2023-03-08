import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#FF1744",
    },
    secondary: {
      main: "#a11a83",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#ffffff",
    },
  },
  typography: {
    h1: {
      color: "black",
    },
  },
});

export default lightTheme;
