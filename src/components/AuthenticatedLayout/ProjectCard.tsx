import React, { useEffect } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProjectDetails,
  setSelectedProject,
} from "../../utils/redux/slices/authenticationSlice";
import { fetchSelectedProject } from "../../utils/services/projectService";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";

export default function ProjectCard() {
  const selectedProject = useSelector(selectedProjectDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getSelectedProject = async () => {
    if (!selectedProject.projectId) {
      // const { data } = await fetchSelectedProject();
      // if (data.content.length > 0) {
      //   dispatch(setSelectedProject(data.content[0]));
      //   navigate(routes.projectList);
      // } else {
      //   navigate(routes.addProject);
      // }
      navigate(routes.projectList);
    }
  };
  useEffect(() => {
    getSelectedProject();
  }, []);
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
