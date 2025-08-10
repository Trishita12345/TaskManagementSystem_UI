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
      <Box>
        <Typography variant="h5" pb={"8px"} fontWeight={600}>
          {`Welcome to ${strings.logoText}`}
        </Typography>
        <Typography color={"grey"}>
          Please fill your personal details.
        </Typography>
        <RegisterForm />
        <Typography color={"grey"} pt={"8px"} textAlign={"center"}>
          Already have have an account?
          <Button
            sx={{ textTransform: "capitalize" }}
            onClick={() => navigate(routes.login)}
          >
            Sign in now
          </Button>
        </Typography>
      </Box>
    </AuthenticationLayout>
  );
};
export default Register;
