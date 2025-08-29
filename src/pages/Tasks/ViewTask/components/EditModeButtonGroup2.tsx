import { ClearOutlined, DoneOutlined } from "@mui/icons-material";
import { Box, Button, CircularProgress } from "@mui/material";

const saveButtonStyle = {
  textTransform: "capitalize",
  p: 0.6,
};
interface EditModeButtonGroup2 {
  loading: boolean;
  onCancel: () => void;
  onSave: () => void;
}
const EditModeButtonGroup2 = ({
  loading,
  onCancel,
  onSave,
}: EditModeButtonGroup2) => {
  return (
    <Box display="flex" alignItems={"center"} mt={1} gap={1}>
      <Button
        variant="contained"
        onClick={onSave}
        disabled={loading}
        sx={{ textTransform: "capitalize", p: 0.5 }}
      >
        {loading && <CircularProgress size={18} color="inherit" />}
        Save
      </Button>
      <Button
        variant="outlined"
        onClick={onCancel}
        disabled={loading}
        sx={{ textTransform: "capitalize", p: 0.35 }}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default EditModeButtonGroup2;
