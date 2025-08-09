import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "../../../components/CustomAvatar";
import "./AvatarGroup.css";
import { getNameInitials } from "../../../utils/helperFunctions";
import PopOverContent from "./PopOverContent";
import { Tooltip } from "@mui/material";

const AvatarGroup = ({ handleSelectUser }) => {
  const [togglePopover, setTogglePopover] = useState(false);
  const [className, setClassName] = useState("");
  const employeeList = useSelector((state) => state.taskSlice.employeeList);
  const empIdsForFilter = useSelector(
    (state) => state.taskSlice.empIdsForFilter
  );
  const getStyle = () => {
    const temp = employeeList.slice(5, employeeList.length);
    let val = "";
    for (let i = 0; i < temp.length; i++) {
      if (empIdsForFilter.includes(temp[i].id)) {
        val = "avatar-wrapper-border";
        break;
      }
    }
    setClassName(val);
  };

  useEffect(() => {
    getStyle();
  }, [employeeList, empIdsForFilter]);

  return (
    <div className="avatar-group">
      {employeeList.slice(0, 5).map((emp, index) => (
        <div
          key={emp.id}
          className={`avatar-wrapper ${
            empIdsForFilter.includes(emp.id) ? "avatar-wrapper-border" : ""
          }`}
          style={{
            left: `${index * 30}px`,
            zIndex: employeeList.length - index,
          }}
        >
          <Avatar
            text={getNameInitials(emp.firstName, emp.lastName)}
            avatarImage={emp.avatarImage}
            onClick={() => handleSelectUser(emp.id)}
          />
          <Tooltip title={`${emp.firstName} ${emp.lastName}`}></Tooltip>
        </div>
      ))}
      <div
        className={`avatar-wrapper ${className}`}
        style={{
          left: `${5 * 30}px`,
          zIndex: employeeList.length - 5,
        }}
      >
        <div class="popover-container">
          <Avatar
            text={`+${employeeList.length - 5}`}
            onClick={() => setTogglePopover((prev) => !prev)}
          />
          {togglePopover && (
            <div className="popover">
              {employeeList.slice(5, employeeList.length).map((e) => (
                <PopOverContent data={e} onCheck={handleSelectUser} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvatarGroup;
