import { useSelector } from "react-redux";
import Dropdown from "../../../components/Dropdown";

const GetStatus = ({ id, statusId, updateStatus }) => {
  const statusList = useSelector((state) => state.taskSlice.statusList);
  const handleChange = (statusId) => {
    updateStatus(id, statusId);
  };
  return (
    <Dropdown
      dropdownData={statusList}
      selectedValue={statusId}
      handleChange={handleChange}
    />
  );
};

export default GetStatus;
