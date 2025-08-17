import { Avatar, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectedProjectDetails } from "../../utils/redux/slices/authenticationSlice";

export default function ProjectCard() {
  const selectedProject = useSelector(selectedProjectDetails);
  return (
    <>
      {selectedProject.projectId ? (
        <Box
          display="flex"
          alignItems="center"
          p={1}
          ml={0.5}
          mb={2}
          width={"fit-content"}
          sx={{ cursor: "pointer" }}
        >
          <Avatar
            sx={{ bgcolor: "#0ebdf8ff", width: 40, height: 40 }}
            variant="square"
          >
            D
          </Avatar>
          <Box ml={1}>
            <Typography variant="subtitle1" fontWeight="bold">
              Dev Saga
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Project Planning
            </Typography>
          </Box>
        </Box>
      ) : null}
    </>
  );
}
