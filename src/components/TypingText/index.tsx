import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getTheme } from "../../utils/redux/slices/commonSlice";

interface TypingText {
  text: string;
}
const TypingText = ({ text }: TypingText) => {
  const [displayed, setDisplayed] = useState("");
  const theme = useSelector(getTheme);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) setTimeout(() => (i = 0), 800);
    }, 200); // typing speed
    return () => clearInterval(interval);
  }, []);

  return (
    <Typography
      variant="h4"
      pb={"8px"}
      fontWeight={600}
      display={"inline"}
      color={theme.primary}
    >
      {displayed}
    </Typography>
  );
};

export default TypingText;
