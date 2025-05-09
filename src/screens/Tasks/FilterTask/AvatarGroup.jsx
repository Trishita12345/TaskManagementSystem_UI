import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../../components/Avatar";
import { getNameInitials } from "../../../utils/helperFunctions";

const AvatarGroup = ({ handleSelectUser }) => {
  const employeeList = useSelector((state) => state.taskSlice.employeeList);
  const empIdsForFilter = useSelector(
    (state) => state.taskSlice.empIdsForFilter
  );
  return (
    <div className="avatar-group">
      {employeeList.map((emp, index) => (
        <div
          key={index}
          className={`avatar-wrapper ${
            empIdsForFilter.includes(emp.id) ? "avatar-wrapper-border" : ""
          }`}
          style={{
            left: `${index * 30}px`,
          }}
          onClick={() => {
            handleSelectUser(emp.id);
          }}
        >
          {emp.avatarImage ? (
            <img
              key={emp.id}
              src={emp.avatarImage}
              alt={`avatar-${index}`}
              className="avatar"
            />
          ) : (
            <Avatar
              text={getNameInitials(emp.firstName, emp.lastName)}
              className="avatar"
            />
          )}
          <div className="tooltip">{emp.emailId}</div>
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
