import { Box, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import "./authenticationLayout.css";
import { useSelector } from "react-redux";
import { getTheme } from "../../utils/redux/slices/commonSlice.js";
import type React from "react";
import LogoIcon from "../../components/Logo/LogoIcon.js";

const AuthenticationLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useSelector(getTheme);
  const muiTheme = useTheme();
  const screenSizeUpMd = useMediaQuery(muiTheme.breakpoints.up("md"));
  return (
    <Grid container id={"auth-container"}>
      <Grid item xs={12} md={4}>
        <Box id="left-sub-container">
          <Box>
            <Box display={"flex"} justifyContent={"center"} mb="32px">
              <LogoIcon size="70px" />
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              {children}
            </Box>
          </Box>
        </Box>
      </Grid>
      {screenSizeUpMd && (
        <Grid
          item
          xs={0}
          md={8}
          id="right-container"
          bgcolor={theme.primary}
        ></Grid>
      )}
    </Grid>
  );
};
export default AuthenticationLayout;
