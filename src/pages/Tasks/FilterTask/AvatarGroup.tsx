import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomAvatar from "../../../components/CustomAvatar";
import "./AvatarGroup.css";
import { getNameInitials } from "../../../utils/helperFunctions/commonHelperFunctions";
import PopOverContent from "./PopOverContent";
import { Popover, Tooltip } from "@mui/material";
import { selectedEmployeeIds } from "../../../utils/redux/slices/taskSlice";
import { selectedProjectDetails } from "../../../utils/redux/slices/authenticationSlice";
import type { EmployeeSummaryType } from "../../../constants/types";
import { getTheme } from "../../../utils/redux/slices/commonSlice";

const AvatarGroup = ({ handleSelectUser }: any) => {
  const theme = useSelector(getTheme);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [className, setClassName] = useState("");
  const { employees } = useSelector(selectedProjectDetails);
  const empIdsForFilter = useSelector(selectedEmployeeIds);
  const getStyle = () => {
    const temp = employees.slice(4, employees.length);
    let val = "";
    for (let i = 0; i < temp.length; i++) {
      if (empIdsForFilter.includes(temp[i].employeeId)) {
        val = "avatar-wrapper-border";
        break;
      }
    }
    setClassName(val);
  };

  useEffect(() => {
    getStyle();
  }, [employees, empIdsForFilter]);

  const a = (empId: string) =>
    empIdsForFilter.includes(empId)
      ? { border: `2px solid ${theme.primary}` }
      : {};
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className="avatar-group">
      {employees.slice(0, 4).map((emp: EmployeeSummaryType, index: number) => (
        <div
          key={emp.employeeId}
          className="avatar-wrapper"
          style={{
            ...a(emp.employeeId),
            left: `${index * 30}px`,
            zIndex: employees.length - index,
          }}
        >
          <Tooltip title={`${emp.firstName} ${emp.lastName}`}>
            <CustomAvatar
              text={getNameInitials(emp.firstName, emp.lastName)}
              avatarImage={emp.profileImage}
              onClick={() => handleSelectUser(emp.employeeId)}
            />
          </Tooltip>
        </div>
      ))}
      <div
        className={`avatar-wrapper ${className}`}
        style={{
          left: `${4 * 30}px`,
          zIndex: employees.length - 4,
        }}
      >
        <div className="popover-container">
          <CustomAvatar
            id={id}
            text={`+${employees.length - 4}`}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              setAnchorEl(event.currentTarget);
            }}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "left",
            }}
          >
            {employees.slice(4, employees.length).map((e: any) => (
              <PopOverContent data={e} onCheck={handleSelectUser} />
            ))}
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default AvatarGroup;
