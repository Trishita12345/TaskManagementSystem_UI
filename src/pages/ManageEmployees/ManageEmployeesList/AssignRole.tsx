import {
  FormControl,
  Select,
  MenuItem,
  type SelectChangeEvent,
  Typography,
} from "@mui/material";
import { priviledges } from "../../../constants/priviledges";
import type {
  dropdownDataProps,
  tableColumnProps,
} from "../../../constants/types";
import {
  fetchRoleOptions,
  updateRoleByEmployeeId,
} from "../../../utils/services/roleService";
import { userDetails } from "../../../utils/redux/slices/authenticationSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { getErrorMessage } from "../../../utils/helperFunctions/commonHelperFunctions";
import {
  setIsLoading,
  setMessage,
} from "../../../utils/redux/slices/commonSlice";

const AssignRole = ({
  item,
  getList,
}: {
  row: tableColumnProps;
  item: any;
  getList: () => void;
}) => {
  const { permissions, email } = useSelector(userDetails);
  const [roleOptions, setRoleOptions] = useState<dropdownDataProps[]>([]);
  const dispatch = useDispatch();
  const handleCatch = (err: AxiosError<{ message: string }>) => {
    dispatch(
      setMessage({
        display: true,
        severity: "error",
        message: getErrorMessage(err),
      })
    );
  };
  const getRoleOptions = async () => {
    try {
      dispatch(setIsLoading(true));
      const { data } = await fetchRoleOptions();
      setRoleOptions(data);
    } catch (e: any) {
      handleCatch(e);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
  useEffect(() => {
    getRoleOptions();
  }, []);

  const updateRole = async (employeeId: string, selectedRoleId: string) => {
    try {
      dispatch(setIsLoading(true));
      await updateRoleByEmployeeId(employeeId, selectedRoleId);
      dispatch(
        setMessage({
          display: true,
          severity: "success",
          message: "Employee role updated successfully.",
        })
      );
      getList();
    } catch (e: any) {
      handleCatch(e);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
  return (
    <FormControl fullWidth>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={roleOptions.length > 0 ? item.role.roleId : ""}
        onChange={(e: SelectChangeEvent) =>
          updateRole(item.employeeId, e.target.value)
        }
        disabled={
          email === item.email || !permissions.includes(priviledges.assign_role)
        }
        size="small"
      >
        {roleOptions.map((item: dropdownDataProps) => (
          <MenuItem value={item.value} key={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {email === item.email && (
        <Typography
          color={"darkorange"}
          sx={{ fontStyle: "italic", fontSize: "0.8rem" }}
        >
          *You cannot update your own role*
        </Typography>
      )}
    </FormControl>
  );
};
export default AssignRole;
