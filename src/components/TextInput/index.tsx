import { TextField, type TextFieldVariants } from "@mui/material";
import { getTheme } from "../../utils/redux/slices/commonSlice";
import { useSelector } from "react-redux";

type textInputProps = {
  value: any;
  sx?: any;
  onChange: () => void;
  placeholder: string;
  variant?: TextFieldVariants | undefined;
};

const TextInput = ({
  value,
  sx,
  onChange,
  placeholder,
  variant,
}: textInputProps) => {
  const theme = useSelector(getTheme);
  return (
    <TextField
      placeholder={placeholder}
      variant={variant}
      value={value}
      onChange={onChange}
      sx={{
        ...sx,
        ".MuiOutlinedInput-root": {
          backgroundColor: theme.inputBgColor,
        },
      }}
    />
  );
};

export default TextInput;
