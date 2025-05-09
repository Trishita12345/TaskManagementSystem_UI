import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import strings from "../../../constants/strings";
import _ from "lodash";
import { setTaskFilterString } from "../../../utils/redux/slices/taskSlice";

const FilterInput = ({ handleFilterInputChange }) => {
  const dispatch = useDispatch();
  const debouncedSearch = useMemo(
    () => _.debounce((e) => handleFilterInputChange(e.target.value), 500),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel(); // clean up on unmount
    };
  }, [debouncedSearch]);

  const taskFilterString = useSelector(
    (state) => state.taskSlice.taskFilterString
  );

  return (
    <div className="custom-input-wrapper">
      {taskFilterString === "" && (
        <div className="custom-placeholder">{strings.filterInputText}</div>
      )}
      <input
        type="text"
        value={taskFilterString}
        onChange={(e) => {
          dispatch(setTaskFilterString(e.target.value));
          debouncedSearch(e);
        }}
        style={{ width: "170px" }}
        className="input-field"
      />
    </div>
  );
};

export default FilterInput;
