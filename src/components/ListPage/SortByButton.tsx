import * as React from "react";
import { Button, Popover, Box, Typography, IconButton } from "@mui/material";
import { KeyboardArrowRight, SwapVert } from "@mui/icons-material";
import useScreenSize from "../../utils/customHooks/useScreenSize";
import { useSearchParams } from "react-router-dom";

const directionLabels: Record<
  SortConfig["dataType"],
  { asc: string; desc: string }
> = {
  string: { asc: "A → Z", desc: "Z → A" },
  number: { asc: "Low → High", desc: "High → Low" },
  date: { asc: "Oldest → Newest", desc: "Newest → Oldest" },
};

interface SortConfig {
  label: string;
  field: string;
  dataType: "string" | "number" | "date";
}
interface SortByButton {
  sortByConfig: SortConfig[];
}
export default function SortByButton({ sortByConfig }: SortByButton) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { width } = useScreenSize();
  const [anchorEl1, setAnchorEl1] = React.useState<HTMLElement | null>(null);
  const [anchorEl2, setAnchorEl2] = React.useState<HTMLElement | null>(null);
  const [selected, setSelected] = React.useState<SortConfig | null>(null);
  const [selectedField, setSelectedField] = React.useState<string>("");

  const sortby = searchParams.get("sortby") || "";
  const direction = searchParams.get("dir") || "desc";

  React.useEffect(() => {
    const item =
      sortByConfig.find((item: SortConfig) => item.field === sortby) || null;
    setSelected(item);
  }, [sortby]);

  // list page sort by button
  const handleSortButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
    setAnchorEl2(null); // also close second popover
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleSortBy = (direction: boolean) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (selectedField) {
      newParams.set("sortby", selectedField);
      newParams.set("dir", `${direction ? "desc" : "asc"}`);
      setSearchParams(newParams);
      handleClose1();
      setSelectedField("");
    }
  };

  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);

  return (
    <Box>
      {width > 600 ? (
        <Button
          variant="outlined"
          onClick={handleSortButtonClick}
          startIcon={<SwapVert fontSize="large" />}
          sx={{ textTransform: "capitalize" }}
        >
          {selected
            ? `${selected.label}: ${
                directionLabels[selected.dataType][direction as "asc" | "desc"]
              }`
            : "Sort By"}
        </Button>
      ) : (
        <IconButton onClick={handleSortButtonClick}>
          <SwapVert color={"primary"} />
        </IconButton>
      )}

      {/* First Popover */}
      <Popover
        open={open1}
        anchorEl={anchorEl1}
        onClose={handleClose1}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box py={1}>
          {sortByConfig.map((s: SortConfig) => (
            <Button
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                setSelectedField(s.field);
                setAnchorEl2(event.currentTarget);
              }}
              sx={{ textTransform: "capitalize", display: "block" }}
            >
              <Box
                minWidth={"150px"}
                pl={1}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography>{s.label}</Typography>
                <KeyboardArrowRight fontSize="small" />
              </Box>
            </Button>
          ))}
        </Box>
      </Popover>

      {/* Nested Popover */}
      <Popover
        open={open2}
        anchorEl={anchorEl2}
        onClose={handleClose2}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <Box py={1}>
          {["asc", "desc"].map((dir) => {
            const selectedData = sortByConfig.find(
              (s) => s.field === selectedField
            );
            if (!selectedData) return null;
            return (
              <Button
                key={dir}
                onClick={() => handleSortBy(dir === "desc")}
                sx={{ textTransform: "capitalize", display: "block" }}
              >
                <Box
                  minWidth={"150px"}
                  pl={1}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography>
                    {`${selectedData.label}: ${
                      directionLabels[selectedData.dataType][
                        dir as "asc" | "desc"
                      ]
                    }`}
                  </Typography>
                </Box>
              </Button>
            );
          })}
        </Box>
      </Popover>
    </Box>
  );
}
