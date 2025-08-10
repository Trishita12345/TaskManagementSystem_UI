import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import strings from "../../../constants/strings";
import { debounce } from "lodash-es";
import { setTaskFilterString } from "../../../utils/redux/slices/taskSlice";
import TextField from "../../../components/TextInput";

const FilterInput = ({ handleFilterInputChange }) => {
  const dispatch = useDispatch();
  const debouncedSearch = useMemo(
    () => debounce((e) => handleFilterInputChange(e.target.value), 500),
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
    <TextField
      placeholder={strings.filterInputText}
      variant="outlined"
      value={taskFilterString}
      onChange={(e) => {
        dispatch(setTaskFilterString(e.target.value));
        debouncedSearch(e);
      }}
    />
  );
};

export default FilterInput;
