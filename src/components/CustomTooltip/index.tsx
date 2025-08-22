import { Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomTooltip = styled(
  ({ className, disableInteractive, ...props }: any) => (
    <Tooltip
      {...props}
      disableInteractive={disableInteractive}
      classes={{ popper: className }}
      PopperProps={{
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 0], // remove Popper spacing
            },
          },
          {
            name: "preventOverflow",
            options: {
              padding: 0, // remove viewport padding
            },
          },
        ],
      }}
    />
  )
)(() => ({
  [`&.MuiTooltip-popper`]: {
    zIndex: 9999, // <-- raise above dialogs/other elements
  },
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: "transparent",
    boxShadow: "none",
    padding: 0,
    margin: 0, // <-- ensure no margin
    maxWidth: "unset",
  },
  [`&[data-popper-placement*="bottom"] .MuiTooltip-tooltip`]: {
    marginTop: "0px !important", // <-- override placement-based margin
  },
  [`&[data-popper-placement*="top"] .MuiTooltip-tooltip`]: {
    marginBottom: "0px !important",
  },
  [`&[data-popper-placement*="right"] .MuiTooltip-tooltip`]: {
    marginLeft: "2px !important",
  },
  [`&[data-popper-placement*="left"] .MuiTooltip-tooltip`]: {
    marginRight: "0px !important",
  },
}));
export default CustomTooltip;
