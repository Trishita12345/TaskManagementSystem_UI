import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTheme, setMessage } from "../../../utils/redux/slices/commonSlice";
import PageHeader from "../../../components/PageHeader";
import { useEffect, useState } from "react";
import {
  fetchAllPermissions,
  fetchRoleDetails,
  updateRoleById,
} from "../../../utils/services/roleService";
import type { AxiosError } from "axios";
import {
  getErrorMessage,
  groupPermissions,
} from "../../../utils/helperFunctions/commonHelperFunctions";
import useScreenSize from "../../../utils/customHooks/useScreenSize";
import PermissionsComponent from "../PermissionsComponent/PermissionsComponent";
import { userDetails } from "../../../utils/redux/slices/authenticationSlice";
import { priviledges } from "../../../constants/priviledges";
import type { AddEditRoleFormInputs } from "../../../constants/types";

const RoleDetails = () => {
  const theme = useSelector(getTheme);
  const { permissions, role } = useSelector(userDetails);
  const { height, width } = useScreenSize();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [roleDetails, setRoleDetails] = useState<AddEditRoleFormInputs>({
    name: "",
    permissions: [],
  });
  const [permissionsList, setPermissionsList] = useState<any[]>([]);
  const [name, setName] = useState<string>("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const isEditPermission =
    permissions.includes(priviledges.edit_roles) && id !== role.roleId;

  const handleCatch = (e: any) => {
    const err = e as AxiosError<{ message: string }>;
    dispatch(
      setMessage({
        display: true,
        severity: "error",
        message: getErrorMessage(err),
      })
    );
  };

  useEffect(() => {
    const getPermisions = async () => {
      try {
        const { data } = await fetchAllPermissions();
        setPermissionsList(groupPermissions(data));
      } catch (e) {
        handleCatch(e);
      }
    };

    getPermisions();
  }, []);

  const getRoleDetails = async () => {
    try {
      const { data } = await fetchRoleDetails(id as string);
      setRoleDetails(data);
      setName(data.name);
      setSelectedPermissions(data.permissions);
    } catch (e) {
      handleCatch(e);
    }
  };

  useEffect(() => {
    getRoleDetails();
  }, [id]);

  const handleCancel = () => {
    setName(roleDetails.name);
    setSelectedPermissions(roleDetails.permissions);
    setIsEditMode(false);
  };
  const updateRole = async () => {
    try {
      if (name === "") return;
      await updateRoleById(id as string, {
        name,
        permissions: selectedPermissions,
      });
      dispatch(
        setMessage({
          display: true,
          severity: "success",
          message: "Role updated successfully",
        })
      );
      getRoleDetails();
    } catch (e) {
      handleCatch(e);
    }
  };
  return (
    <Box m={1.5} height={`${height - 85}px`} sx={{ overflow: "scroll" }}>
      <PageHeader
        label={"Role Details"}
        showBackIcon
        showDivider
        setIsEditMode={
          isEditPermission && !isEditMode ? setIsEditMode : undefined
        }
      />
      {!isEditPermission && (
        <Typography color={"red"} pt={1}>
          {!permissions.includes(priviledges.edit_roles) ? (
            <i>
              *You donot have permission to update the role. Please conatct with
              admin for more details.*
            </i>
          ) : (
            <i>*You cannot update your own role*</i>
          )}
        </Typography>
      )}
      <TextField
        disabled={!(isEditMode && isEditPermission)}
        sx={{ width: width > 750 ? "40%" : "100%", mt: "24px", mb: "12px" }}
        size="small"
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Role Name"
        error={name === ""}
        helperText={name === "" ? "Role Name is required" : ""}
      />
      <PermissionsComponent
        isDisabled={!(isEditMode && isEditPermission)}
        permissionsList={permissionsList}
        selectedPermissions={selectedPermissions}
        setSelectedPermissions={setSelectedPermissions}
      />
      {isEditMode && isEditPermission && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            position: "fixed",
            bottom: 0,
            left: -2,
            paddingX: "16px",
            height: "55px",
            justifyContent: "end",
            backgroundColor: theme.secondaryColor2,
            boxShadow: `0px -11px 14px 1px ${theme.secondaryColor2}20`,
            borderTop: `1px solid ${theme.secondaryColor3}`,
            width: "100%",
          }}
        >
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" onClick={updateRole}>
            Update
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default RoleDetails;
