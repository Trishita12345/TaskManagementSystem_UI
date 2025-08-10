import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

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

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log("Login Data:", data);
    // Call your login API here
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
        {...register("password", { required: "Password is required" })}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
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
  );
};
export default LoginForm;
