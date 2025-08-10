import "./App.css";
import { useSelector } from "react-redux";
import Routes from "./routes/index.js";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { getTheme, isDark } from "./utils/redux/slices/commonSlice.js";

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
    <ThemeProvider theme={theme}>
      <Router>
        <Routes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
