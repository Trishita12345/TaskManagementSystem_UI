import { setTaskFilterString } from "../../../utils/redux/slices/taskSlice";
import FilterInput from "./FilterInput";
import "./FilterTask.css";
import { useDispatch, useSelector } from "react-redux";

const FilterTask = ({ handleFilterInputChange }) => {
  const dispatch = useDispatch();
  const taskFilterString = useSelector(
    (state) => state.taskSlice.taskFilterString
  );
  const onClear = () => {
    dispatch(setTaskFilterString(""));
  };
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FilterInput handleFilterInputChange={handleFilterInputChange} />
      {taskFilterString !== "" ? (
        <div onClick={onClear} className="link" id="clearBtn">
          Clear All
        </div>
      ) : null}
    </div>
  );
};

export default FilterTask;
