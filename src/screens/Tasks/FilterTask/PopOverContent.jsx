import { useSelector } from "react-redux";
import Checkbox from "../../../components/Checkbox";
import { useState } from "react";
import Avatar from "../../../components/Avatar";
import { getNameInitials } from "../../../utils/helperFunctions";

const PopOverContent = ({ data, onCheck }) => {
  const [isChecked, setIsChecked] = useState(false);
  const employeeList = useSelector((state) => state.taskSlice.employeeList);
  const empIdsForFilter = useSelector(
    (state) => state.taskSlice.empIdsForFilter
  );
  return (
    <Checkbox
      label={
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Avatar
            className={"popover-avatar"}
            text={getNameInitials(data.firstName, data.lastName)}
            avatarImage={data.avatarImage}
            onClick={() => {}}
          />
          <div>{`${data.firstName} ${data.lastName}`}</div>
        </div>
      }
      isChecked={isChecked}
      handleCheckboxChange={() => {
        setIsChecked((prev) => !prev);
        onCheck(data.id);
      }}
    />
  );
};

export default PopOverContent;
