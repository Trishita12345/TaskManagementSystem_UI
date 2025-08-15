import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Loader from "../../../components/Loader";
import { useDispatch } from "react-redux";
import {
  setIsAuthenticated,
  setUserDetails,
} from "../../../utils/redux/slices/authenticationSlice";
import { setMessage } from "../../../utils/redux/slices/commonSlice";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../constants/routes";
import type { AxiosError } from "axios";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { getErrorMessage } from "../../../utils/helperFunctions/commonHelperFunctions";
import { getProfile, login } from "../../../utils/services/authService";
import type { LoginFormInputs } from "../../../constants/types";

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({ mode: "onChange" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (formData) => {
    try {
      await login(formData);
      const { data } = await getProfile();
      dispatch(setIsAuthenticated());
      dispatch(setUserDetails(data));
      navigate(routes.myBoard);
    } catch (e) {
      const err = e as AxiosError<{ message: string }>;
      dispatch(
        setMessage({
          display: true,
          severity: "error",
          message: getErrorMessage(err),
        })
      );
    }
  };

  return (
    <>
      {isSubmitting && <Loader />}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 8,
        }}
      >
        <TextField
          variant="outlined"
          className="authFormHandle"
          size="small"
          label="Email Id"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />

        <TextField
          variant="outlined"
          className="authFormHandle"
          size="small"
          label="Password"
          type={showPassword ? "text" : "password"}
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff fontSize="small" sx={{ mr: "8px" }} />
                  ) : (
                    <Visibility fontSize="small" sx={{ mr: "8px" }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          sx={{ mt: "16px" }}
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </Box>
    </>
  );
};
export default LoginForm;
