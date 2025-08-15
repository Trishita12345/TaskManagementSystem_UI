import { Box, Typography, Button } from "@mui/material";
import { priviledges } from "../../constants/priviledges";
import PageHeader from "../PageHeader";
import useScreenSize from "../../utils/customHooks/useScreenSize";
import { useSelector } from "react-redux";
import { userDetails } from "../../utils/redux/slices/authenticationSlice";
import { getTheme } from "../../utils/redux/slices/commonSlice";

interface ViewDetailsPageProps {
  children: React.ReactNode;
  isEditPermission: boolean;
  isEditMode: boolean;
  setIsEditMode: any;
  handleCancel: () => void;
  updateRole: () => void;
}
const ViewDetailsPage = ({
  children,
  isEditPermission,
  isEditMode,
  setIsEditMode,
  handleCancel,
  updateRole,
}: ViewDetailsPageProps) => {
  const theme = useSelector(getTheme);
  const { height } = useScreenSize();
  const { permissions } = useSelector(userDetails);
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
      {children}
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

export default ViewDetailsPage;
