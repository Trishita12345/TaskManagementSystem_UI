import { Person } from "@mui/icons-material";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { blueGrey } from "@mui/material/colors";
import CustomTooltip from "../CustomTooltip";
import EmployeeTooltipContent from "../EmployeeTooltipContent";
import type { EmployeeSummaryType } from "../../constants/types";
import { getNameInitials } from "../../utils/helperFunctions/commonHelperFunctions";

interface CustomEmployeeAvatarTypes {
  employeeDetails: EmployeeSummaryType;
  showInitial?: boolean;
  onClick?: any;
  sx?: any;
  height?: number;
  width?: number;
  bgColor?: string;
  onTooltipClick?: () => void;
}
const CustomEmployeeAvatar = ({
  showInitial = true,
  onClick = () => {},
  sx = {},
  height = 35,
  width = 35,
  bgColor = blueGrey[300],
  employeeDetails,
  onTooltipClick,
}: CustomEmployeeAvatarTypes) => {
  const { firstName, lastName, email, role, profileImage } = employeeDetails;
  return (
    <CustomTooltip
      placement="right"
      title={
        <EmployeeTooltipContent
          firstName={firstName}
          lastName={lastName}
          email={email}
          role={role?.name}
          profileImage={profileImage}
          onTooltipClick={onTooltipClick}
        />
      }
    >
      {profileImage ? (
        <Avatar
          alt="Remy Sharp"
          src={profileImage}
          sx={{
            ...sx,
            width: width,
            height: height,
          }}
          onClick={onClick}
        />
      ) : (
        <Avatar
          sx={{
            ...sx,
            bgcolor: bgColor,
            color: "white",
            height: width,
            width: height,
          }}
          onClick={onClick}
        >
          {showInitial ? (
            <Typography fontWeight={600}>
              {getNameInitials(firstName, lastName)}
            </Typography>
          ) : (
            <Person />
          )}
        </Avatar>
      )}
    </CustomTooltip>
  );
};

export default CustomEmployeeAvatar;
