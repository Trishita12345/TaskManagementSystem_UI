import FilterInput from "./FilterInput";
import "./FilterTask.css";
import { useSelector } from "react-redux";
import AvatarGroup from "./AvatarGroup";

const FilterTask = ({ handleFilterInputChange, handleSelectUser, onClear }) => {
  const taskFilterString = useSelector(
    (state) => state.taskSlice.taskFilterString
  );

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FilterInput handleFilterInputChange={handleFilterInputChange} />
      <AvatarGroup handleSelectUser={handleSelectUser} />
      {/* {taskFilterString !== "" ? ( */}
      <div onClick={onClear} className="link" id="clearBtn">
        Clear All
      </div>
      {/* ) : null} */}
    </div>
  );
};

export default FilterTask;
