import { Box, Typography } from "@mui/material";
import CustomEmployeeAvatar from "../CustomEmployeeAvatar";
import type { EmployeeSummaryType } from "../../constants/types";

const FullNameComponent = ({
  employeeDetails,
  showTooltip = true,
}: {
  employeeDetails: EmployeeSummaryType;
  showTooltip?: boolean;
}) => {
  return (
    <Box display={"flex"} alignItems={"center"} gap={1}>
      <CustomEmployeeAvatar
        height={28}
        width={28}
        employeeDetails={employeeDetails}
        showInitial={false}
        showTooltip={showTooltip}
      />
      <Typography>
        {employeeDetails?.firstName + " " + employeeDetails?.lastName}
      </Typography>
    </Box>
  );
};

export default FullNameComponent;
