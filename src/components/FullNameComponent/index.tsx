import { Box, Typography } from "@mui/material";
import CustomEmployeeAvatar from "../CustomEmployeeAvatar";
import type { EmployeeSummaryType } from "../../constants/types";

const FullNameComponent = ({
  employeeDetails,
  showTooltip = true,
  avatarHeight,
  avatarWeight,
  fontSize,
  svgIconSize = "20px",
}: {
  employeeDetails: EmployeeSummaryType;
  showTooltip?: boolean;
  avatarHeight?: number;
  avatarWeight?: number;
  fontSize?: string;
  svgIconSize?: string;
}) => {
  return (
    <Box display={"flex"} alignItems={"center"} gap={1}>
      <CustomEmployeeAvatar
        height={avatarHeight || 28}
        width={avatarWeight || 28}
        fontSize={fontSize || "14px"}
        employeeDetails={employeeDetails}
        showInitial={false}
        showTooltip={showTooltip}
        svgIconSize={svgIconSize}
      />
      <Typography>
        {employeeDetails?.firstName + " " + employeeDetails?.lastName}
      </Typography>
    </Box>
  );
};

export default FullNameComponent;
