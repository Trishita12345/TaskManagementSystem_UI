import { Typography } from "@mui/material";
import type { UpdateableTaskComponentProps } from "../../../../constants/types";
import TaskDetailsLabelValue from "./TaskDetailsLabelValue";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format, isValid } from "date-fns";

const Date = ({
  selectedTask,
  updateTask,
  dateType,
}: UpdateableTaskComponentProps & { dateType: "startDate" | "endDate" }) => {
  const { startDate, endDate } = selectedTask;
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const type = dateType === "startDate" ? startDate : endDate;
  console.log(isEditMode);
  return (
    <TaskDetailsLabelValue
      label={dateType === "startDate" ? "Start Date" : "End Date"}
      Component={
        <>
          {type === null || isEditMode ? (
            <DatePicker
              sx={{ ".MuiPickersSectionList-root": { py: 0.5 } }}
              disablePast
              onClose={() => setIsEditMode(false)}
              onChange={(date: any) => {
                if (isValid(date))
                  updateTask(
                    dateType,
                    format(date as Date, "yyyy-MM-dd"),
                    undefined,
                    setIsEditMode
                  );
              }}
            />
          ) : (
            <Typography onClick={() => setIsEditMode(true)}>{type}</Typography>
          )}
        </>
      }
    />
  );
};
export default Date;
