import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import type { AxiosError } from "axios";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import Loader from "../../../components/Loader";
import { getErrorMessage } from "../../../utils/helperFunctions/commonHelperFunctions";
import { setMessage } from "../../../utils/redux/slices/commonSlice";
import type { AddRoleFormInputs } from "../../../constants/types";
import { addRole } from "../../../utils/services/roleService";
import { routes } from "../../../constants/routes";
import { Link } from "react-router-dom";

const AddRoleForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddRoleFormInputs>({ mode: "onChange" });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<AddRoleFormInputs> = async (formData) => {
    try {
      const { data } = await addRole({ ...formData, permissions: [] });
      reset();
      dispatch(
        setMessage({
          display: true,
          severity: "success",
          duration: 3000,
          message: (
            <Typography>
              Role Added Successfully.{" "}
              <Link to={`${routes.role}/${data.roleId}`}>
                <Typography sx={{ display: "inline" }} fontWeight={600}>
                  Click here
                </Typography>
              </Link>{" "}
              {`to add permissions in ${data.name} role.`}
            </Typography>
          ),
        })
      );
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

  return (
    <>
      {isSubmitting && <Loader />}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          variant="outlined"
          className="authFormHandle"
          size="small"
          label="Role Name"
          {...register("name", {
            required: "Role name is required",
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
        />
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
      </Box>
    </>
  );
};

export default AddRoleForm;
