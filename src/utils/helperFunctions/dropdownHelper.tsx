import { Box, Typography } from "@mui/material";
import FullNameComponent from "../../components/FullNameComponent";
import type {
  dropdownDataProps,
  EmployeeSummaryType,
} from "../../constants/types";
import { getEmployeesWithDefalult } from "./commonHelperFunctions";
import {
  BookmarkBorderOutlined,
  CheckBox,
  DragHandle,
  KeyboardArrowDown,
  KeyboardArrowUp,
  KeyboardDoubleArrowUp,
} from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug, faMinusSquare } from "@fortawesome/free-solid-svg-icons";

export const DropdownLabel = ({
  Icon,
  label,
}: {
  Icon: React.ReactNode;
  label: string;
}) => {
  return (
    <Box display={"flex"} alignItems={"center"} gap={1}>
      {Icon}
      <Typography>{label}</Typography>
    </Box>
  );
};
export const PriorityIconMap = {
  P0: <KeyboardDoubleArrowUp color="error" />,
  P1: <KeyboardArrowUp color="error" />,
  P2: <DragHandle color="warning" />,
  P3: <KeyboardArrowDown color="primary" />,
};

export const TypeIconMap = {
  STORY: <BookmarkBorderOutlined color="success" />,
  TASK: <CheckBox color="primary" />,
  BUG: <FontAwesomeIcon icon={faBug} height={"1rem"} color="red" />,
  ENHANCEMENT: (
    <FontAwesomeIcon icon={faMinusSquare} height={"1.3rem"} color="darkgray" />
  ),
};
export const assigneeList = (employees: EmployeeSummaryType[]) =>
  getEmployeesWithDefalult(employees).map((a: EmployeeSummaryType) => ({
    value: a.employeeId,
    label: <FullNameComponent employeeDetails={a} showTooltip={false} />,
  }));
export const prioritiesList = (priorities: dropdownDataProps[]) =>
  priorities.map((p: dropdownDataProps) => ({
    value: p.value,
    label: (
      <DropdownLabel
        Icon={PriorityIconMap[p.value as keyof typeof PriorityIconMap]}
        label={p.label}
      />
    ),
  }));
export const typeList = (types: dropdownDataProps[]) =>
  types.map((t: dropdownDataProps) => ({
    value: t.value,
    label: (
      <DropdownLabel
        Icon={TypeIconMap[t.value as keyof typeof TypeIconMap]}
        label={t.label}
      />
    ),
  }));
