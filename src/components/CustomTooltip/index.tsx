import { Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomTooltip = styled(({ className, ...props }: any) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: "transparent",
    boxShadow: "none",
    padding: 0,
    maxWidth: "unset",
  },
}));
export default CustomTooltip;
