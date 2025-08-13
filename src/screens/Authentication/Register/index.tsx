import "../authenticationLayout.css";
import AuthenticationLayout from "../AuthenticationLayout.js";
import { Box, Button, Typography } from "@mui/material";
import RegisterForm from "./RegisterForm.js";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../constants/routes.js";
import strings from "../../../constants/strings.js";

const Register = () => {
  const navigate = useNavigate();
  return (
    <AuthenticationLayout>
      <Typography variant="h4" pb={"8px"} fontWeight={600} textAlign={"center"}>
        {`Welcome to ${strings.logoText}`}
      </Typography>
      <Typography color={"grey"} textAlign={"center"}>
        Create your account to manage tasks effortlessly and boost your
        productivity.
      </Typography>
      <RegisterForm />
      <Typography color={"grey"} pt={"8px"} textAlign={"center"}>
        Already have have an account?
        <Button className="link-button" onClick={() => navigate(routes.login)}>
          Login
        </Button>
      </Typography>
    </AuthenticationLayout>
  );
};
export default Register;
