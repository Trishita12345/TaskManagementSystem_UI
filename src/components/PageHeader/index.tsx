import { ClearOutlined, Edit } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface propType {
  label: string;
  showBackIcon?: boolean;
  showDivider?: boolean;
  setIsEditMode?: any;
}
const PageHeader = ({ showBackIcon, showDivider, setIsEditMode }: propType) => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
        gap={2}
      >
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Typography variant="h5" fontWeight={600} letterSpacing={0.7}>
            Role Details
          </Typography>
          {setIsEditMode && (
            <IconButton
              onClick={() => setIsEditMode((prev: boolean) => !prev)}
              color="primary"
            >
              <Edit />
            </IconButton>
          )}
        </Box>
        {showBackIcon && (
          <IconButton onClick={() => navigate(-1)}>
            <ClearOutlined sx={{ cursor: "pointer" }} />
          </IconButton>
        )}
      </Box>
      {showDivider && <Divider sx={{ mt: "4px" }} />}
    </>
  );
};

export default PageHeader;
