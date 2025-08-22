import "./App.css";
import { useSelector } from "react-redux";
import Routes from "./routes/index.js";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { getTheme, isDark } from "./utils/redux/slices/commonSlice.js";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function App() {
  const isDarkMode = useSelector(isDark);
  const themes = useSelector(getTheme);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: themes.primary,
        contrastText: themes.primaryTextColor,
      },
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* resets styles for consistency */}
        <Router>
          <Routes />
        </Router>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
