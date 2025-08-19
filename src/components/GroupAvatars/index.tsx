import * as React from "react";
import AvatarGroup from "@mui/material/AvatarGroup";
import Popover from "@mui/material/Popover";
import type { EmployeeSummaryType } from "../../constants/types";
import CustomAvatar from "../CustomAvatar";
import { useSelector } from "react-redux";
import { getTheme } from "../../utils/redux/slices/commonSlice";
import { getNameInitials } from "../../utils/helperFunctions/commonHelperFunctions";
import { colors } from "../../constants/data";

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
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  console.log(selectedAvatars);
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
        max={5}
        renderSurplus={(surplus) => (
          <>
            <CustomAvatar
              onClick={handleExtraClick}
              text={`+${surplus}`}
              sx={{
                cursor: "pointer",
                ...(isSurplusAvatarSelected() && {
                  border: `2.5px solid ${theme.primary} !important`,
                  zIndex: 1, // bring it to the top
                }),
                transition: "all 0.2s ease-in-out",
              }}
            />
          </>
        )}
      >
        {avatars?.map((a, index) => {
          return (
            <CustomAvatar
              key={a.employeeId}
              tooltipText={`${a.firstName} ${a.lastName}(${a.email})`}
              avatarImage={a.profileImage}
              text={getNameInitials(a.firstName, a.lastName)}
              onClick={() => handleSelectAvatar(a.employeeId)}
              bgColor={colors[index % colors.length]}
              sx={{
                cursor: "pointer",
                ...(isAvatarSelected(a.employeeId) && {
                  border: `2.5px solid ${theme.primary} !important`,
                  zIndex: 1,
                }),
                transition: "all 0.2s ease-in-out",
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
