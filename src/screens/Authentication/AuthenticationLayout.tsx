import { Box, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import "./authenticationLayout.css";
import { useSelector } from "react-redux";
import { getTheme } from "../../utils/redux/slices/commonSlice.js";
import type React from "react";
import Logo from "../Layout/Logo.js";

const AuthenticationLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useSelector(getTheme);
  const muiTheme = useTheme();
  const screenSizeUpMd = useMediaQuery(muiTheme.breakpoints.up("md"));
  return (
    <Box id={"auth-container"} sx={{ backgroundColor: `${theme.primary}14` }}>
      <Box id={"auth-sub-container"}>
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={12} md={6} id="left-container">
            <Logo color={theme.primary} />
            <Box id="left-sub-container">{children}</Box>
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
};
export default AuthenticationLayout;
