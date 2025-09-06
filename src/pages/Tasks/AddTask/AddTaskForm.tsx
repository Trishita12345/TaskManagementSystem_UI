import { useForm, Controller } from "react-hook-form";
import { TextField, Button, MenuItem, Grid, Box } from "@mui/material";
import Loader from "../../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  loading,
  setIsLoading,
  setMessage,
} from "../../../utils/redux/slices/commonSlice";
import InputCounterComponent from "../../../components/InputCounterComponent";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type {
  AddTaskFormValues,
  dropdownDataProps,
  EmployeeSummaryType,
} from "../../../constants/types";
import { selectedProjectDetails } from "../../../utils/redux/slices/authenticationSlice";
import {
  priorityList,
  taskTypeList,
} from "../../../utils/redux/slices/taskSlice";
import { addTask } from "../../../utils/services/taskService";
import { Link } from "react-router-dom";
import { routes } from "../../../constants/routes";
import {
  DropdownLabel,
  PriorityIconMap,
  TypeIconMap,
} from "../../../utils/helperFunctions/dropdownHelper";
import FullNameComponent from "../../../components/FullNameComponent";
import { getEmployeesWithDefalult } from "../../../utils/helperFunctions/commonHelperFunctions";

// ✅ Yup validation schema
const schema = yup.object().shape({
  taskName: yup
    .string()
    .required("Task Name is required")
    .max(200, "Task Name must be at most 200 characters"),
  priority: yup.string().default("P1").required("Priority is required"),
  type: yup.string().default("TASK").required("Type is required"),
  assignedTo: yup.string().nullable().default("unassigned"),
  startDate: yup.date().nullable().typeError("Invalid date").default(null),
  endDate: yup
    .date()
    .nullable()
    .typeError("Invalid date")
    .min(yup.ref("startDate"), "End date cannot be before start date")
    .default(null),
  status: yup.string().default("TODO"),
});

export default function AddTaskForm({
  setAddModalOpen,
  onSuccess,
}: {
  setAddModalOpen: (val: boolean) => void;
  onSuccess: () => void;
}) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<AddTaskFormValues>({
    mode: "onChange",
    resolver: yupResolver(schema), // ✅ Add yup resolver
    defaultValues: {
      status: "TODO",
    },
  });

  const isLoading = useSelector(loading);
  const nameValue = watch("taskName");

  const { projectId, employees } = useSelector(selectedProjectDetails);
  const priorities = useSelector(priorityList);
  const types = useSelector(taskTypeList);
  const dispatch = useDispatch();

  const onSubmit = async (formData: AddTaskFormValues) => {
    try {
      dispatch(setIsLoading(false));
      const { data } = await addTask(projectId, formData);
      setAddModalOpen(false);
      onSuccess();
      dispatch(
        setMessage({
          display: true,
          severity: "success",
          duration: 3000,
          message: (
            <>
              <span>Issue created Successfully.&nbsp;</span>
              <Link to={`${routes.task}/${data.taskId}`}>
                <span style={{ fontWeight: 600 }}>Click here&nbsp;</span>
              </Link>
              <span>to view details</span>
            </>
          ),
        })
      );
    } catch {
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
      {(isSubmitting || isLoading) && <Loader />}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          {/* Task Name */}
          <Grid item xs={12}>
            <Controller
              name="taskName"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="Task Name"
                  error={!!errors.taskName}
                  helperText={
                    <InputCounterComponent
                      errorMessage={errors.taskName?.message}
                      inputLength={nameValue?.length || 0}
                      maxLength={200}
                    />
                  }
                />
              )}
            />
          </Grid>

          {/* Priority Dropdown */}
          <Grid item xs={12}>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  select
                  fullWidth
                  label="Priority"
                  defaultValue={"P1"}
                  error={!!errors.priority}
                  helperText={errors.priority?.message}
                >
                  {priorities.map((p: dropdownDataProps) => (
                    <MenuItem key={p.value} value={p.value}>
                      <DropdownLabel
                        Icon={<PriorityIconMap priority={p.value} />}
                        label={p.label}
                      />
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          {/* Type Dropdown */}
          <Grid item xs={12}>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  select
                  fullWidth
                  label="Type"
                  defaultValue={"TASK"}
                  error={!!errors.type}
                  helperText={errors.type?.message}
                >
                  {types.map((t: dropdownDataProps) => (
                    <MenuItem key={t.value} value={t.value}>
                      <DropdownLabel
                        Icon={<TypeIconMap type={t.value} />}
                        label={t.label}
                      />
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          {/* AssignedTo Dropdown */}
          <Grid item xs={12}>
            <Controller
              name="assignedTo"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  select
                  fullWidth
                  defaultValue={"unassigned"}
                  label="Assigned To"
                  error={!!errors.assignedTo}
                  helperText={errors.assignedTo?.message}
                >
                  {getEmployeesWithDefalult(employees).map(
                    (item: EmployeeSummaryType) => (
                      <MenuItem value={item.employeeId}>
                        <FullNameComponent
                          employeeDetails={item}
                          showTooltip={false}
                        />
                      </MenuItem>
                    )
                  )}
                </TextField>
              )}
            />
          </Grid>

          {/* Start Date */}
          <Grid item xs={12}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Start Date"
                  disablePast
                  onChange={(date) => field.onChange(date)} // validate on change
                  slotProps={{
                    textField: {
                      size: "small",
                      error: !!errors.startDate,
                      helperText: errors.startDate?.message,
                      fullWidth: true,
                    },
                  }}
                />
              )}
            />
          </Grid>

          {/* End Date */}
          <Grid item xs={12}>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="End Date"
                  disablePast
                  onChange={(date) => field.onChange(date)} // validate on change
                  slotProps={{
                    textField: {
                      size: "small",
                      error: !!errors.endDate,
                      helperText: errors.endDate?.message,
                      fullWidth: true,
                    },
                  }}
                />
              )}
            />
          </Grid>

          {/* Status (disabled) */}
          <Grid item xs={12}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="Status"
                  disabled
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container sx={{ mt: "16px" }} spacing={1}>
          <Grid item xs={0} md={0} lg={8}></Grid>
          <Grid item xs={12} md={6} lg={2}>
            <Button
              fullWidth
              type="button"
              variant="outlined"
              color="primary"
              disabled={isSubmitting}
              onClick={() => reset()}
            >
              Reset
            </Button>
          </Grid>
          <Grid item xs={12} md={6} lg={2}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
