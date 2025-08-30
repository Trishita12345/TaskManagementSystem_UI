import AuthLayout from "../../../components/AuthLayout/AuthLayout.js";
import { Button, Typography } from "@mui/material";
import LoginForm from "./LoginForm.js";
import { useNavigate } from "react-router";
import { routes } from "../../../constants/routes.js";
import strings from "../../../constants/strings.js";
import TypingText from "../../../components/TypingText/index.js";

const Login = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <Typography variant="h4" pb={"8px"} fontWeight={600}>
        Login to <TypingText text={strings.logoText} />
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
    </AuthLayout>
  );
};
export default Login;
