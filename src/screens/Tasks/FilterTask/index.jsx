import FilterInput from "./FilterInput";
import "./FilterTask.css";
import { useSelector } from "react-redux";
import AvatarGroup from "./AvatarGroup";
import strings from "../../../constants/strings";
import useScreenSize from "../../../utils/customHooks/useScreenSize";
import { employeeData } from "../../../constants/data";

const FilterTask = ({
  handleFilterInputChange,
  handleSelectUser,
  onClear,
  selectCurrentUserForFilter,
}) => {
  const { width } = useScreenSize();
  const taskFilterString = useSelector(
    (state) => state.taskSlice.taskFilterString
  );
  const empIdsForFilter = useSelector(
    (state) => state.taskSlice.empIdsForFilter
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: width > 700 ? "center" : "start",
        gap: "12px",
        flexDirection: width > 700 ? "row" : "column",
      }}
    >
      <FilterInput handleFilterInputChange={handleFilterInputChange} />
      <div style={{ width: "190px" }}>
        <AvatarGroup handleSelectUser={handleSelectUser} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          fontWeight: 500,
        }}
      >
        <div onClick={selectCurrentUserForFilter} className="link">
          {strings.onlyMyIssues}
        </div>
        <div>|</div>
        {taskFilterString !== "" || empIdsForFilter.length > 0 ? (
          <div onClick={onClear} className="link">
            {strings.clearAll}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FilterTask;
