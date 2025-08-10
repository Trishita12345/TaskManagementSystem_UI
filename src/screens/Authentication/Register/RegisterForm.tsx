import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import type { AxiosError } from "axios";
import React from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { urls } from "../../../constants/urls";
import axiosInstance from "../../../utils/axios";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../constants/routes";
import Loader from "../../../components/Loader";
import { useDispatch } from "react-redux";
import { setMessage } from "../../../utils/redux/slices/commonSlice";
import strings from "../../../constants/strings";

interface RegisterFormInputs {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  confirmPassword: string;
  profileImage: string;
  agree: boolean;
}

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>({
    mode: "onChange",
    defaultValues: { agree: false },
  });

  const isChecked = watch("agree");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<RegisterFormInputs> = async (formData) => {
    try {
      if (formData.password !== formData.confirmPassword) {
        throw "Password and Confirm Password does not match";
      }
      const { confirmPassword, ...rest } = formData;
      await axiosInstance.post(urls.register, rest);
      dispatch(
        setMessage({
          display: true,
          severity: "success",
          message: "Registration Successful!",
        })
      );
      setTimeout(() => navigate(routes.login), 1000);
    } catch (e) {
      const err = e as AxiosError<{ message: string }>;
      dispatch(
        setMessage({
          display: true,
          severity: "error",
          message: err.response?.data.message || err,
        })
      );
      setTimeout(() => navigate(routes.login), 1000);
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
          className="authFormHandle"
          size="small"
          label="First Name"
          variant="standard"
          {...register("firstname", {
            required: "First name is required",
            maxLength: {
              value: 20,
              message: "First name must be at most 20 characters",
            },
          })}
          error={!!errors.firstname}
          helperText={errors.firstname?.message}
          fullWidth
        />
        <TextField
          className="authFormHandle"
          size="small"
          label="Last Name"
          variant="standard"
          {...register("lastname", {
            required: "Last name is required",
            maxLength: {
              value: 20,
              message: "First name must be at most 20 characters",
            },
          })}
          error={!!errors.lastname}
          helperText={errors.lastname?.message}
          fullWidth
        />
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
          type="password"
          {...register("password", {
            required: "Password is required",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
              message:
                "Password must be at least 8 characters, include uppercase, lowercase, number, and special char",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />

        <TextField
          className="authFormHandle"
          size="small"
          label="Confirm Password"
          variant="standard"
          {...register("confirmPassword", {
            required: "confirmPassword is required",
          })}
          error={!!errors.confirmPassword}
          helperText={
            errors.confirmPassword?.message ||
            "Enter same value as your password"
          }
          fullWidth
        />
        <TextField
          variant="standard"
          className="authFormHandle"
          size="small"
          label="Profile Image URL"
          {...register("profileImage")}
          error={!!errors.profileImage}
          helperText={errors.profileImage?.message}
          fullWidth
        />
        <Controller
          name="agree"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              sx={{
                alignItems: "flex-start", // align to top
                mt: "12px", // remove margin
                "& .MuiCheckbox-root": {
                  py: 0, // remove checkbox padding
                  pt: "2px",
                },
              }}
              control={<Checkbox {...field} checked={field.value} />}
              label={`I accept the Terms & Conditions and Privacy Policy of ${strings.logoText}`}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isChecked || isSubmitting}
        >
          {isSubmitting ? "Saving in..." : "Register"}
        </Button>
      </Box>
    </>
  );
};
export default RegisterForm;
