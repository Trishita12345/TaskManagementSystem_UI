import { IconButton, InputAdornment, TextField } from "@mui/material";
import strings from "../../constants/strings";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash-es";
import { useSearchParams } from "react-router-dom";
import { HighlightOff } from "@mui/icons-material";

const FilterInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [localQuery, setLocalQuery] = useState<string>("");

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  const handleSetQuery = (query: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("query", query);
    setSearchParams(newParams);
  };

  const debouncedSearch = useMemo(
    () => debounce((value: string) => handleSetQuery(value), 500),
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
      value={localQuery}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalQuery(e.target.value);
        debouncedSearch(e.target.value);
      }}
      InputProps={{
        endAdornment: (
          <>
            {query ? (
              <InputAdornment position="end">
                <IconButton onClick={() => handleSetQuery("")} edge="end">
                  <HighlightOff fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null}
          </>
        ),
      }}
    />
  );
};

export default FilterInput;
