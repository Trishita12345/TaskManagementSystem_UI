import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import strings from "../../../constants/strings";
import { Box, Button } from "@mui/material";

const AddTaskButton = ({ onAdd }: { onAdd: () => void }) => {
  return (
    <Button variant="contained" onClick={onAdd}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <FontAwesomeIcon icon={faAdd} style={{ cursor: "pointer" }} />
        {strings.newTask}
      </Box>
    </Button>
  );
};

export default AddTaskButton;
