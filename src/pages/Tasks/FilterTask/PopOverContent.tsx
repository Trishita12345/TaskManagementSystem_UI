import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Avatar from "../../../components/CustomAvatar";
import { getNameInitials } from "../../../utils/helperFunctions/commonHelperFunctions";
import type { EmployeeSummaryType } from "../../../constants/types";
import { getTheme } from "../../../utils/redux/slices/commonSlice";
import { Box, Checkbox, FormControlLabel } from "@mui/material";

interface PopOverContent {
  data: EmployeeSummaryType;
  onCheck: (empId: string) => void;
}
const PopOverContent = ({ data, onCheck }: PopOverContent) => {
  const theme = useSelector(getTheme);
  const [isChecked, setIsChecked] = useState(false);
  const empIdsForFilter = useSelector(
    (state: any) => state.taskSlice.empIdsForFilter
  );
  useEffect(() => {
    setIsChecked(empIdsForFilter.includes(data.employeeId) ? true : false);
  }, []);
  return (
    <Box
      py={1}
      px={2}
      my={0.5}
      sx={{
        ":hover": {
          backgroundColor: `${theme.primary}${theme.opacity}`,
        },
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={() => {
              setIsChecked((prev) => !prev);
              onCheck(data.employeeId);
            }}
          />
        }
        label={
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Avatar
              text={getNameInitials(data.firstName, data.lastName)}
              avatarImage={data.profileImage}
            />
            <div>{`${data.firstName} ${data.lastName}`}</div>
          </div>
        }
      />
    </Box>
  );
};

export default PopOverContent;
