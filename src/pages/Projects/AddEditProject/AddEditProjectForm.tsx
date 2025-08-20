import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Grid,
  Checkbox,
  Autocomplete,
  Chip,
  Box,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputCounterComponent from "../../../components/InputCounterComponent";
import Loader from "../../../components/Loader";
import type {
  AddEditProjectInputProps,
  dropdownDataProps,
} from "../../../constants/types";
import {
  addProject,
  updateProject,
} from "../../../utils/services/projectService";
import { useDispatch, useSelector } from "react-redux";
import {
  getTheme,
  loading,
  setIsLoading,
  setMessage,
} from "../../../utils/redux/slices/commonSlice";
import type { AxiosError } from "axios";
import {
  getErrorMessage,
  viewEditCTAButtonStyle,
} from "../../../utils/helperFunctions/commonHelperFunctions";
import { routes } from "../../../constants/routes";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchRoleOptions } from "../../../utils/services/roleService";
import { getAllEmployees } from "../../../utils/services/commonService";

// Validation schema
const schema = yup.object({
  name: yup
    .string()
    .required("Project name is required")
    .max(30, "Project name must be at most 30 characters"),
  details: yup
    .string()
    .required("Details are required")
    .max(100, "Details must be at most 100 characters"),
  managerId: yup.string().required("Manager is required"),
  employeeIds: yup.array().of(yup.string()).default([]),
});

interface AddEditProjectFormProps {
  onSuccess: () => void;
  disabled?: boolean;
  pageResponse?: AddEditProjectInputProps;
  setIsEditMode?: (e: boolean) => void;
}
export default function AddEditProjectForm({
  disabled,
  onSuccess,
  setIsEditMode,
  pageResponse,
}: AddEditProjectFormProps) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<AddEditProjectInputProps>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      details: "",
      managerId: "",
      employeeIds: [],
      // ...other fields
    },
  });
  const dispatch = useDispatch();
  const theme = useSelector(getTheme);
  const isLoading = useSelector(loading);
  const nameValue = watch("name");
  const detailsValue = watch("details");
  const [employeeList, setEmployeeList] = useState<dropdownDataProps[]>([]);
  const [managerList, setManagerList] = useState<dropdownDataProps[]>([]);
  const { id } = useParams();

  useEffect(() => {
    if (id && pageResponse) reset(pageResponse);
  }, [id, pageResponse]);

  const getEmployeeList = async () => {
    try {
      dispatch(setIsLoading(true));
      const { data } = await fetchRoleOptions();
      const employeeRoleID = data.find(
        (d: dropdownDataProps) => d.label === "EMPLOYEE"
      )?.value;
      const managerRoleID = data.find(
        (d: dropdownDataProps) => d.label === "MANAGER"
      )?.value;
      const [employeeRes, managerRes] = await Promise.all([
        getAllEmployees(employeeRoleID),
        getAllEmployees(managerRoleID),
      ]);
      setEmployeeList(employeeRes.data);
      setManagerList(managerRes.data);
    } catch (e) {
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    getEmployeeList();
  }, []);

  const onSubmit = async (formData: AddEditProjectInputProps) => {
    try {
      if (id) {
        await updateProject(id, { ...formData });
        dispatch(
          setMessage({
            display: true,
            severity: "success",
            duration: 3000,
            message: <Typography>Project Updated Successfully.</Typography>,
          })
        );
        setIsEditMode && setIsEditMode(false);
      } else {
        const { data } = await addProject({ ...formData });
        reset();
        dispatch(
          setMessage({
            display: true,
            severity: "success",
            duration: 3000,
            message: (
              <>
                <span>Project Added Successfully. </span>
                <Link to={`${routes.viewEditProject}/${"data.roleId"}`}>
                  <span style={{ fontWeight: 600 }}>Click here</span>
                </Link>
                <span>to view details</span>
              </>
            ),
          })
        );
      }
      onSuccess();
    } catch (e) {
      const err = e as AxiosError<{ message: string }>;
      dispatch(
        setMessage({
          display: true,
          severity: "error",
          message: getErrorMessage(err),
        })
      );
    }
  };
  const handleReset = () => {
    setIsEditMode && setIsEditMode(false);
    reset();
  };

  return (
    <>
      {(isSubmitting || isLoading) && <Loader />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Project Name */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              disabled={disabled}
              size="small"
              {...field}
              label="Project Name"
              variant="outlined"
              error={!!errors.name}
              helperText={
                <InputCounterComponent
                  errorMessage={errors.name?.message}
                  inputLength={nameValue?.length}
                  maxLength={30}
                />
              }
              fullWidth
            />
          )}
        />
        {/* Details */}
        <Controller
          disabled={disabled}
          name="details"
          control={control}
          render={({ field }) => (
            <TextField
              size="small"
              {...field}
              label="Details"
              variant="outlined"
              multiline
              rows={3}
              error={!!errors.details}
              helperText={
                <InputCounterComponent
                  errorMessage={errors.details?.message}
                  inputLength={detailsValue?.length}
                  maxLength={100}
                />
              }
              fullWidth
            />
          )}
        />
        {/* Manager ID Dropdown (Text Input style) */}
        <Controller
          name="managerId"
          control={control}
          render={({ field }) => (
            <TextField
              disabled={disabled}
              size="small"
              {...field}
              select
              label="Manager"
              variant="outlined"
              error={!!errors.managerId}
              helperText={errors.managerId?.message}
              fullWidth
            >
              {managerList.map((manager) => (
                <MenuItem key={manager.value} value={manager.value}>
                  {manager.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          name="employeeIds"
          control={control}
          render={({ field }) => (
            <Autocomplete
              disabled={disabled}
              multiple
              disableCloseOnSelect
              options={employeeList}
              getOptionLabel={(option) => option.label}
              value={employeeList.filter((e) => field.value?.includes(e.value))}
              onChange={(_, newValue) => {
                field.onChange(newValue.map((emp) => emp.value));
              }}
              renderTags={(selected, getTagProps) =>
                selected.map((option, index) => (
                  <Chip
                    // key={option.id}
                    sx={{ paddingY: 0 }}
                    label={option.label}
                    {...getTagProps({ index })} // gives you the delete (cross) functionality
                    onDelete={() => {
                      const updated = field.value.filter(
                        (id: any) => id !== option.value
                      );
                      field.onChange(updated);
                    }}
                  />
                ))
              }
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox style={{ marginRight: 8 }} checked={selected} />
                  {option.label}
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Employees" size="small" />
              )}
            />
          )}
        />
        {/*Add Mode */}
        {!id && (
          <Grid container sx={{ mt: "16px" }} spacing={1}>
            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                type="button"
                variant="outlined"
                color="primary"
                disabled={isSubmitting}
                onClick={handleReset}
              >
                Reset
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
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
        )}
        {id && (
          <>
            {!disabled && (
              <Box sx={viewEditCTAButtonStyle(theme)}>
                <Button variant="outlined" onClick={handleReset}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Update
                </Button>
              </Box>
            )}
          </>
        )}
      </form>
    </>
  );
}
