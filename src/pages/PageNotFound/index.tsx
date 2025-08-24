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
        minHeight: "80vh",
        backgroundColor: "primary",
        // background: theme.palette.primary.main,
        // color: theme.palette.primary.contrastText,
        flexDirection: "column",
      }}
    >
      <img
        style={{ width: "35%" }}
        src="https://images.unsplash.com/vector-1743473329244-f81d2c2a18f4?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
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
