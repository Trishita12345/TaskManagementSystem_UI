import { useDispatch, useSelector } from "react-redux";
import { isDark, setIsDark } from "../../utils/redux/slices/commonSlice";
import { Box } from "@mui/material";
import { Bedtime, WbSunny } from "@mui/icons-material";

const ThemeToggleSwitch = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(isDark);

  return (
    <Box onClick={() => dispatch(setIsDark(!isDarkMode))}>
      {!isDarkMode ? <WbSunny /> : <Bedtime />}
    </Box>
    // </Button>
  );
};

export default ThemeToggleSwitch;
