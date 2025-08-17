import { Box, Typography } from "@mui/material";

const InputCounterComponent = ({
  errorMessage,
  inputLength,
  maxLength,
}: {
  errorMessage: string | undefined;
  inputLength: number;
  maxLength: number;
}) => {
  return (
    <Box display="flex" alignItems={"center"} justifyContent={"space-between"}>
      <Typography fontSize={"0.8rem"}>{errorMessage || ""}</Typography>
      <Typography fontSize={"0.8rem"}>{`${
        inputLength || 0
      }/${maxLength}`}</Typography>
    </Box>
  );
};

export default InputCounterComponent;
