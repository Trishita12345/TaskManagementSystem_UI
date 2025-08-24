import { Grid, Typography } from "@mui/material";
import type { UpdateableTaskComponentProps } from "../../../../constants/types";
import TaskDetailsLabelValue from "./TaskDetailsLabelValue";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format, isAfter, isBefore, isValid, parseISO } from "date-fns";

const Date = ({
  selectedTask,
  updateTask,
  dateType,
}: UpdateableTaskComponentProps & { dateType: "startDate" | "endDate" }) => {
  const { startDate, endDate } = selectedTask;
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const type = dateType === "startDate" ? startDate : endDate;
  const [errorText, setErrorText] = useState<string>("");
  const [localDate, setLocalDate] = useState<string>();

  useEffect(() => {
    setLocalDate(type);
  }, [selectedTask, dateType]);

  const handleChange = (date: any) => {
    if (!date || !isValid(date)) return;
    setLocalDate(format(date as Date, "yyyy-MM-dd"));
    if (dateType === "startDate") {
      if (
        endDate &&
        isValid(parseISO(endDate)) &&
        isAfter(date, parseISO(endDate))
      ) {
        setErrorText("Start date cannot be after end date");
        return;
      }
    } else if (dateType === "endDate") {
      if (
        startDate &&
        isValid(parseISO(startDate)) &&
        isBefore(date, parseISO(startDate))
      ) {
        setErrorText("End date cannot be before start date");
        return;
      }
    }
    setErrorText("");
    updateTask(
      dateType,
      format(date as Date, "yyyy-MM-dd"),
      undefined,
      setIsEditMode
    );
  };
  return (
    <>
      {type === null || isEditMode ? (
        <Grid container>
          <TaskDetailsLabelValue
            label={dateType === "startDate" ? "Start Date" : "End Date"}
            Component={
              <DatePicker
                sx={{ ".MuiPickersSectionList-root": { py: 0.5 } }}
                disablePast
                onChange={handleChange}
                value={
                  localDate && isValid(parseISO(localDate))
                    ? parseISO(localDate)
                    : null
                }
                slotProps={{
                  textField: {
                    error: Boolean(errorText), // true if error exists
                    helperText: errorText, // show message under field
                  },
                }}
              />
            }
          />
          {/* <Typography ml={}>{errorText}</Typography> */}
        </Grid>
      ) : (
        <TaskDetailsLabelValue
          label={dateType === "startDate" ? "Start Date" : "End Date"}
          Component={
            <Typography onClick={() => setIsEditMode(true)}>{type}</Typography>
          }
        />
      )}
    </>
  );
};
export default Date;
