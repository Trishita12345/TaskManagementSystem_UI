import { Box, Typography } from "@mui/material";
import PageHeader from "../PageHeader";
import useScreenSize from "../../utils/customHooks/useScreenSize";

interface ViewDetailsPageProps {
  header: string;
  children: React.ReactNode;
  isEditPermission: boolean;
  isEditMode: boolean;
  setIsEditMode: any;
}
const ViewDetailsPage = ({
  header,
  children,
  isEditPermission,
  isEditMode,
  setIsEditMode,
}: ViewDetailsPageProps) => {
  const { height } = useScreenSize();
  return (
    <Box m={1.5} height={`${height - 85}px`} sx={{ overflow: "scroll" }}>
      <PageHeader
        label={header}
        showBackIcon
        showDivider
        setIsEditMode={
          isEditPermission && !isEditMode ? setIsEditMode : undefined
        }
      />
      {!isEditPermission && (
        <Typography color={"red"} pt={1}>
          {!isEditPermission ? (
            <i>
              *You donot have permission to update the data. Please conatct with
              admin for more details.*
            </i>
          ) : (
            <i>*You cannot update your own role*</i>
          )}
        </Typography>
      )}
      <Box mt={3}>{children}</Box>
    </Box>
  );
};

export default ViewDetailsPage;
