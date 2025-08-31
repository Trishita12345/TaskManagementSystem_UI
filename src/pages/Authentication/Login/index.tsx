import AuthLayout from "../../../components/AuthLayout/AuthLayout.js";
import { Box, Button, Typography } from "@mui/material";
import LoginForm from "./LoginForm.js";
import { useNavigate } from "react-router";
import { routes } from "../../../constants/routes.js";
import strings from "../../../constants/strings.js";
import TypingText from "../../../components/TypingText/index.js";

const Login = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <Box display={"flex"}>
        <Typography variant="h4" pb={"8px"} mr={1} fontWeight={600}>
          Login to
        </Typography>
        <TypingText text={strings.logoText} />
      </Box>
      <Typography color={"grey"} textAlign={"center"}>
        Welcome back! Please enter your details.
      </Typography>
      <LoginForm />
      <Box color={"grey"} pt={"8px"} textAlign={"center"}>
        Don't have an account?{" "}
        <Button
          className="link-button"
          onClick={() => navigate(routes.register)}
        >
          Register now
        </Button>
      </Box>
    </AuthLayout>
  );
};
export default Login;
