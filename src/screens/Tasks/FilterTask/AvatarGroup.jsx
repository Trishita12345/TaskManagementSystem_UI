import React, { useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "../../../components/Avatar";
import "./AvatarGroup.css";
import { getNameInitials } from "../../../utils/helperFunctions";
import PopOverContent from "./PopOverContent";

const AvatarGroup = ({ handleSelectUser }) => {
  const [togglePopover, setTogglePopover] = useState(false);
  const employeeList = useSelector((state) => state.taskSlice.employeeList);
  const empIdsForFilter = useSelector(
    (state) => state.taskSlice.empIdsForFilter
  );

  return (
    <div className="avatar-group">
      {employeeList.slice(0, 6).map((emp, index) => (
        <div
          key={index}
          className={`avatar-wrapper ${
            empIdsForFilter.includes(emp.id) ? "avatar-wrapper-border" : ""
          }`}
          style={{
            left: `${index * 30}px`,
            zIndex: employeeList.length - index,
          }}
        >
          {index < 5 ? (
            <Avatar
              text={getNameInitials(emp.firstName, emp.lastName)}
              avatarImage={emp.avatarImage}
              className="avatar"
              onClick={() => handleSelectUser(emp.id)}
            />
          ) : (
            <div class="popover-container">
              <Avatar
                text={`+${employeeList.length - index}`}
                className="avatar"
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
          )}
          {index < 5 && (
            <div className="tooltip">{`${emp.firstName} ${emp.lastName}`}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
