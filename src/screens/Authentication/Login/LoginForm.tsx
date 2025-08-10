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
import axiosInstance from "../../../utils/axios";
import { urls } from "../../../constants/urls";
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

interface LoginFormInputs {
  email: string;
  password: string;
}

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
      await axiosInstance.post(urls.login, formData);
      const { data } = await axiosInstance(urls.myProfile);
      dispatch(setIsAuthenticated());
      dispatch(setUserDetails(data));
      navigate(routes.myBoard);
    } catch (e) {
      const err = e as AxiosError<{ message: string }>;
      dispatch(
        setMessage({
          display: true,
          severity: "error",
          message: err.response?.data.message || err,
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
          maxWidth: 350,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 4,
        }}
      >
        <TextField
          variant="standard"
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
          variant="standard"
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
