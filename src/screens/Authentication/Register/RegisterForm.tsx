import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

interface RegisterFormInputs {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
  profileImgUrl: string;
}

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>({ mode: "onChange" });

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    console.log("Register Data:", data);
    // Call your Register API here
  };

  return (
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
        variant="outlined"
        {...register("firstName", {
          required: "First name is required",
          maxLength: {
            value: 20,
            message: "First name must be at most 20 characters",
          },
        })}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
        fullWidth
      />
      <TextField
        className="authFormHandle"
        size="small"
        label="Last Name"
        variant="outlined"
        {...register("lastName", {
          required: "Last name is required",
          maxLength: {
            value: 20,
            message: "First name must be at most 20 characters",
          },
        })}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
        fullWidth
      />
      <TextField
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
        variant="outlined"
        {...register("confirmPassword", {
          required: "confirmPassword is required",
        })}
        error={!!errors.confirmPassword}
        helperText={
          errors.confirmPassword?.message || "Enter same value as your password"
        }
        fullWidth
      />
      <TextField
        className="authFormHandle"
        size="small"
        label="Profile Image URL"
        {...register("profileImgUrl")}
        error={!!errors.profileImgUrl}
        helperText={errors.profileImgUrl?.message}
        fullWidth
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving in..." : "Register"}
      </Button>
    </Box>
  );
};
export default RegisterForm;
