import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getNameInitials } from "../../../utils/helperFunctions/commonHelperFunctions";
import type { EmployeeSummaryType } from "../../../constants/types";
import { getTheme } from "../../../utils/redux/slices/commonSlice";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { selectedProjectDetails } from "../../../utils/redux/slices/authenticationSlice";
import { setEmpIdsForFilter } from "../../../utils/redux/slices/taskSlice";
import CustomEmployeeAvatar from "../../../components/CustomEmployeeAvatar";
import { colors } from "../../../constants/colors";

interface PopOverContentItems {
  data: EmployeeSummaryType;
  index: number;
}
const PopOverContentItems = ({ data, index }: PopOverContentItems) => {
  const dispatch = useDispatch();
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
              dispatch(setEmpIdsForFilter(data.employeeId));
            }}
          />
        }
        label={
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <CustomEmployeeAvatar
              employeeDetails={data}
              bgColor={colors[index % colors.length]}
            />
            <div>{`${data.firstName} ${data.lastName}`}</div>
          </div>
        }
      />
    </Box>
  );
};

const PopOverContent = () => {
  const { employees } = useSelector(selectedProjectDetails);
  return (
    <>
      {employees
        .slice(4, employees.length)
        .map((e: EmployeeSummaryType, index: number) => (
          <PopOverContentItems data={e} key={e.employeeId} index={index} />
        ))}
    </>
  );
};

export default PopOverContent;
