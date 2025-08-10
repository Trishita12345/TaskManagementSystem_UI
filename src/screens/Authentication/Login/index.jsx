import { Box, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import LoginForm from "./LoginFom.jsx";
import "../authenticationLayout.css";

function Login() {
  const theme = useTheme();
  const screenSizeUpMd = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Box id={"auth-container"}>
      <Box id={"auth-sub-container"}>
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={12} md={6} id="left-container">
            <LoginForm />
          </Grid>
          {screenSizeUpMd && (
            <Grid item xs={0} md={6} id="right-container">
              right
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
export default Login;
