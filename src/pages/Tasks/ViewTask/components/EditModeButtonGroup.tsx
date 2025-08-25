import { ClearOutlined, DoneOutlined } from "@mui/icons-material";
import { Box, Button, CircularProgress } from "@mui/material";

const saveButtonStyle = {
  minWidth: "30px",
  paddingX: 0,
  color: "#a4a4a4ff",
  border: "1px solid #a4a4a4ff",
  backgroundColor: "transparent",
  ":hover": {
    border: "1px solid #716f6fff",
    color: "#716f6fff",
    backgroundColor: "transparent",
  },
};
interface EditModeButtonGroup {
  loading: boolean;
  onCancel: () => void;
  onSave: () => void;
}
const EditModeButtonGroup = ({
  loading,
  onCancel,
  onSave,
}: EditModeButtonGroup) => {
  return (
    <Box display="flex" alignItems={"center"} justifyContent={"end"} mt={1}>
      <Button
        variant="outlined"
        onClick={onCancel}
        sx={{ ...saveButtonStyle, marginRight: "8px" }}
        disabled={loading}
      >
        <ClearOutlined fontSize="small" />
      </Button>
      <Button
        variant="outlined"
        onClick={onSave}
        sx={saveButtonStyle}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress size={18} color="inherit" />
        ) : (
          <DoneOutlined fontSize="small" />
        )}
      </Button>
    </Box>
  );
};

export default EditModeButtonGroup;
