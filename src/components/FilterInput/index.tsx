import { TextField } from "@mui/material";
import strings from "../../constants/strings";
import { useEffect, useMemo } from "react";
import { debounce } from "lodash-es";

interface FilterInputProps {
  filterFunc: (value: string) => void;
  query: string;
  setQuery: (value: string) => void;
}
const FilterInput = ({ filterFunc, query, setQuery }: FilterInputProps) => {
  const debouncedSearch = useMemo(
    () => debounce((value: string) => filterFunc(value), 500),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel(); // clean up on unmount
    };
  }, [debouncedSearch]);
  return (
    <TextField
      size="small"
      placeholder={strings.filterInputText}
      variant="outlined"
      value={query}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        debouncedSearch(e.target.value);
      }}
    />
  );
};

export default FilterInput;
