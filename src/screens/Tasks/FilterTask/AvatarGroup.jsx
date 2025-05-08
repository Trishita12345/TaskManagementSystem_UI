import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../../components/Avatar";

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
          className="avatar-wrapper"
          style={{
            left: `${index * 30}px`,
            border: `2px solid ${
              empIdsForFilter.includes(emp.id) ? "black" : "white"
            }`,
          }}
          onClick={() => {
            handleSelectUser(emp.id);
          }}
        >
          {emp.avatarImage ? (
            <img
              key={index}
              src={emp.avatarImage}
              alt={`avatar-${index}`}
              className="avatar"
            />
          ) : (
            <Avatar text={"TM"} className="avatar" />
          )}
          <div className="tooltip">{emp.emailId}</div>
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
