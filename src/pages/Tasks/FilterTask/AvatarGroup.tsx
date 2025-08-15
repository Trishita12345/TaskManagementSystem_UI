import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "../../../components/CustomAvatar";
import "./AvatarGroup.css";
import { getNameInitials } from "../../../utils/helperFunctions/commonHelperFunctions";
import PopOverContent from "./PopOverContent";
import { Tooltip } from "@mui/material";

const AvatarGroup = ({ handleSelectUser }: any) => {
  const [togglePopover, setTogglePopover] = useState(false);
  const [className, setClassName] = useState("");
  const employeeList = useSelector(
    (state: any) => state.taskSlice.employeeList
  );
  const empIdsForFilter = useSelector(
    (state: any) => state.taskSlice.empIdsForFilter
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
      {employeeList.slice(0, 5).map((emp: any, index: number) => (
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
          <Tooltip title={`${emp.firstName} ${emp.lastName}`}>
            <Avatar
              text={getNameInitials(emp.firstName, emp.lastName)}
              avatarImage={emp.avatarImage}
              onClick={() => handleSelectUser(emp.id)}
            />
          </Tooltip>
        </div>
      ))}
      <div
        className={`avatar-wrapper ${className}`}
        style={{
          left: `${5 * 30}px`,
          zIndex: employeeList.length - 5,
        }}
      >
        <div className="popover-container">
          <Avatar
            text={`+${employeeList.length - 5}`}
            onClick={() => setTogglePopover((prev) => !prev)}
          />
          {togglePopover && (
            <div className="popover">
              {employeeList.slice(5, employeeList.length).map((e: any) => (
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
