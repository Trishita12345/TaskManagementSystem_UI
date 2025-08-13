import "../authenticationLayout.css";
import AuthenticationLayout from "../AuthenticationLayout.js";
import { Box, Button, Typography } from "@mui/material";
import LoginForm from "./LoginForm.js";
import { useNavigate } from "react-router";
import { routes } from "../../../constants/routes.js";
import strings from "../../../constants/strings.js";

const Login = () => {
  const navigate = useNavigate();
  return (
    <AuthenticationLayout>
      <Typography variant="h4" pb={"8px"} fontWeight={600}>
        {`Login to ${strings.logoText}`}
      </Typography>
      <Typography color={"grey"} textAlign={"center"}>
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
    </AuthenticationLayout>
  );
};
export default Login;
