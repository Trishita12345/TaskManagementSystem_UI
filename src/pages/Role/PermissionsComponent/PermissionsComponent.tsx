import type {
  dropdownDataProps,
  PermissionsComponentProps,
} from "../../../constants/types";
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";

const PermissionsComponent = ({
  permissionsList,
  selectedPermissions,
  setSelectedPermissions,
  isDisabled,
}: PermissionsComponentProps) => {
  const handleCheck = (checked: boolean, permissionId: string) => {
    let temp = [...selectedPermissions];
    if (checked) {
      temp.push(permissionId);
    } else {
      temp = temp.filter((item) => item !== permissionId);
    }
    setSelectedPermissions(temp);
  };
  return (
    <>
      <Typography fontSize={"1.2rem"} fontWeight={400} pt={2} pb={0.5}>
        Permissions
      </Typography>
      <Divider sx={{ marginBottom: "16px" }} />
      {permissionsList.map((permission: any) => (
        <Box key={permission.label} display={"flex"} gap={3}>
          <Typography
            py={1}
            fontWeight={600}
            flex={1}
            justifyContent={"end"}
            display={"flex"}
          >
            {permission.label}
          </Typography>
          <Box flex={11}>
            <>
              {permission.value.map((p: dropdownDataProps) => (
                <FormControlLabel
                  key={p.value}
                  sx={{ display: "block" }}
                  label={p.label}
                  control={
                    <Checkbox
                      disabled={isDisabled}
                      checked={selectedPermissions.includes(p.value)}
                      onChange={(_event: any, checked: boolean) =>
                        handleCheck(checked, p.value)
                      }
                    />
                  }
                />
              ))}
              <Divider />
            </>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default PermissionsComponent;
