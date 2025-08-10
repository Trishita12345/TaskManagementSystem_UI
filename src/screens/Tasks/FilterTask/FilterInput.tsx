import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import strings from "../../../constants/strings";
import { debounce } from "lodash-es";
import { setTaskFilterString } from "../../../utils/redux/slices/taskSlice";
import { TextField } from "@mui/material";

const FilterInput = ({
  handleFilterInputChange,
}: {
  handleFilterInputChange: (val: string) => {};
}) => {
  const dispatch = useDispatch();
  const debouncedSearch = useMemo(
    () => debounce((e: any) => handleFilterInputChange(e.target.value), 500),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel(); // clean up on unmount
    };
  }, [debouncedSearch]);

  const taskFilterString = useSelector(
    (state: any) => state.taskSlice.taskFilterString
  );

  return (
    <TextField
      placeholder={strings.filterInputText}
      variant="outlined"
      value={taskFilterString}
      onChange={(e: any) => {
        dispatch(setTaskFilterString(e.target.value));
        debouncedSearch(e);
      }}
    />
  );
};

export default FilterInput;
