import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import strings from "../../constants/strings";
import { routes } from "../../constants/routes";
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "primary",
        // background: theme.palette.primary.main,
        // color: theme.palette.primary.contrastText,
        flexDirection: "column",
      }}
    >
      {/* <img width="50%" src={images.pageNotFound} alt="page not found" /> */}
      <Typography fontSize={{ xs: 20, md: 40 }}>
        Opps! Page not found
      </Typography>
      <Typography fontSize={{ xs: 12, md: 16 }} my={2}>
        {strings.page_not_found_desc_text}
      </Typography>
      <Button
        data-testid={"button"}
        sx={{
          mt: 2,
          fontWeight: "bold",
        }}
        variant="contained"
        onClick={() => navigate(routes.root)}
      >
        <HomeRoundedIcon sx={{ mr: 1 }} />
        {strings.backHome}
      </Button>
    </Box>
  );
};

export default PageNotFound;
