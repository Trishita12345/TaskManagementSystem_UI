import "../authenticationLayout.css";
import AuthenticationLayout from "../AuthenticationLayout.js";
import { Box, Button, Typography } from "@mui/material";
import LoginForm from "./LoginForm.js";
import { useNavigate } from "react-router";
import { routes } from "../../../constants/routes.js";

const Login = () => {
  const navigate = useNavigate();
  return (
    <AuthenticationLayout>
      <Box>
        <Typography variant="h5" pb={"8px"} fontWeight={600}>
          Welcome back
        </Typography>
        <Typography color={"grey"}>
          Welcome back! Please enter your details.
        </Typography>
        <LoginForm />
        <Typography color={"grey"} pt={"8px"} textAlign={"center"}>
          Don't have an account?
          <Button
            className="link-button"
            onClick={() => navigate(routes.register)}
          >
            Register now
          </Button>
        </Typography>
      </Box>
    </AuthenticationLayout>
  );
};
export default Login;
