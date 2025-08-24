import { Grid, Typography } from "@mui/material";

interface TaskDetailsLabelValue {
  label: string;
  Component: React.ReactNode;
}
const TaskDetailsLabelValue = ({ label, Component }: TaskDetailsLabelValue) => {
  return (
    <Grid container alignItems={"center"}>
      <Grid item xs={4}>
        <Typography color={"gray"}>{label}:</Typography>
      </Grid>
      <Grid item xs={7}>
        {Component}
      </Grid>
    </Grid>
  );
};

export default TaskDetailsLabelValue;
