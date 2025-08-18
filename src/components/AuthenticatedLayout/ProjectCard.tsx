import { Avatar, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectedProjectDetails } from "../../utils/redux/slices/authenticationSlice";
import { routes } from "../../constants/routes";
import { useNavigate } from "react-router-dom";

export default function ProjectCard() {
  const selectedProject = useSelector(selectedProjectDetails);
  const navigate = useNavigate();
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
          onClick={() =>
            navigate(`${routes.viewEditProject}/${selectedProject?.projectId}`)
          }
        >
          <Avatar
            sx={{ bgcolor: "#0ebdf8ff", width: 40, height: 40 }}
            variant="square"
          >
            {selectedProject.name.substring(0, 1)}
          </Avatar>
          <Box ml={1}>
            <Typography variant="subtitle1" fontWeight="bold">
              {selectedProject.name}
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
