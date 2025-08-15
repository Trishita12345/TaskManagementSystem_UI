import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setMessage } from "../../../utils/redux/slices/commonSlice";
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
import ViewDetailsPage from "../../../components/ViewDetailsPage";

const RoleDetails = () => {
  const { permissions, role } = useSelector(userDetails);
  const { width } = useScreenSize();
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
    <ViewDetailsPage
      isEditPermission={isEditPermission}
      isEditMode={isEditMode}
      setIsEditMode={setIsEditMode}
      handleCancel={handleCancel}
      updateRole={updateRole}
    >
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
    </ViewDetailsPage>
  );
};

export default RoleDetails;
