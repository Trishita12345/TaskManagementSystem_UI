import { Box, Typography } from "@mui/material";

interface AddProps {
  setAddModalOpen: (val: boolean) => void;
}
const AddRole = ({ setAddModalOpen }: AddProps) => {
  return (
    <Box>
      <Typography variant="h5" fontWeight={600}>
        Create Role
      </Typography>
    </Box>
  );
};

export default AddRole;
