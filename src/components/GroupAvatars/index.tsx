import * as React from "react";
import AvatarGroup from "@mui/material/AvatarGroup";
import Popover from "@mui/material/Popover";
import type { EmployeeSummaryType } from "../../constants/types";
import CustomEmployeeAvatar from "../CustomEmployeeAvatar";
import { useSelector } from "react-redux";
import { getTheme, isDark } from "../../utils/redux/slices/commonSlice";
import { colors } from "../../constants/colors";
import { Avatar } from "@mui/material";

interface GroupAvatarsProps {
  avatars: EmployeeSummaryType[];
  PopOverContent: any;
  selectedAvatars?: string[];
  handleSelectAvatar?: any;
}
export default function GroupAvatars({
  avatars,
  PopOverContent,
  selectedAvatars = [],
  handleSelectAvatar,
}: GroupAvatarsProps) {
  const theme = useSelector(getTheme);
  const darkTheme = useSelector(isDark);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handleExtraClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const isAvatarSelected = (avatarId: string) =>
    selectedAvatars.find((sa: string) => sa === avatarId);
  const isSurplusAvatarSelected = () => {
    return selectedAvatars.some((sa: string) => {
      const idx = avatars.findIndex(
        (a: EmployeeSummaryType) => a.employeeId === sa
      );
      return idx > 3; // if true, .some() short-circuits and returns true
    });
  };

  return (
    <React.Fragment>
      <AvatarGroup
        sx={{
          ".MuiAvatar-root": {
            border: `2px solid ${darkTheme ? "#2B2B2B" : "#ffffff"}`,
          },
        }}
        max={5}
        renderSurplus={(surplus) => (
          <Avatar
            onClick={handleExtraClick}
            sx={{
              // border
              height: 35,
              width: 35,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              border: `3px solid ${
                darkTheme ? "#2B2B2B" : "#ffffff"
              } !important`,
              ...(isSurplusAvatarSelected() && {
                border: `2.5px solid ${theme.primary} !important`,
                zIndex: 2, // bring it to the top
              }),
              transition: "all 0.2s ease-in-out",
            }}
          >{`+${surplus - 1}`}</Avatar>
          // <>`+${surplus}`</>
        )}
      >
        {avatars?.map((a, index) => {
          return (
            <CustomEmployeeAvatar
              showInitial={a.firstName !== "Unassigned"}
              key={a.employeeId}
              employeeDetails={a}
              onClick={() => handleSelectAvatar(a.employeeId)}
              bgColor={colors[index % colors.length]}
              sx={{
                ...(isAvatarSelected(a.employeeId) && {
                  border: `2.5px solid ${theme.primary} !important`,
                  zIndex: 1,
                }),
                transition: "all 0.2s ease-in-out",
                cursor: "pointer",
              }}
            />
          );
        })}
      </AvatarGroup>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <PopOverContent />
      </Popover>
    </React.Fragment>
  );
}
