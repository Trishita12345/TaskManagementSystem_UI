import { useSelector } from "react-redux";
import Checkbox from "../../../components/Checkbox";
import { useEffect, useState } from "react";
import Avatar from "../../../components/CustomAvatar";
import { getNameInitials } from "../../../utils/helperFunctions/commonHelperFunctions";

const PopOverContent = ({ data, onCheck }: any) => {
  const [isChecked, setIsChecked] = useState(false);
  const empIdsForFilter = useSelector(
    (state: any) => state.taskSlice.empIdsForFilter
  );
  useEffect(() => {
    setIsChecked(empIdsForFilter.includes(data.id) ? true : false);
  }, []);
  return (
    <Checkbox
      className={isChecked ? "popover-checkbox-checked" : "popover-checkbox"}
      label={
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Avatar
            text={getNameInitials(data.firstName, data.lastName)}
            avatarImage={data.avatarImage}
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
