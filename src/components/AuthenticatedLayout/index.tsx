import "./authenticatedLayout.css";
import Sidebar from "./Sidebar";
import useScreenSize from "../../utils/customHooks/useScreenSize";
import { useEffect } from "react";
import { smallDevice } from "../../constants/data";
import NarrowSideBar from "./NarrowSideBar";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getTheme,
  setIsSidebarOpen,
  sidebarOpen,
} from "../../utils/redux/slices/commonSlice";
import { selectedProjectDetails } from "../../utils/redux/slices/authenticationSlice";
import { routes } from "../../constants/routes";
import { useNavigate } from "react-router-dom";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedProject = useSelector(selectedProjectDetails);
  const isSidebarOpen = useSelector(sidebarOpen);
  const theme = useSelector(getTheme);
  const { width } = useScreenSize();
  useEffect(() => {
    if (width < smallDevice) dispatch(setIsSidebarOpen(false));
  }, [width]);

  const getSelectedProject = async () => {
    if (!selectedProject.projectId) {
      navigate(routes.projectList);
    }
  };
  useEffect(() => {
    getSelectedProject();
  }, []);

  useEffect(() => {
    if (!selectedProject.projectId) dispatch(setIsSidebarOpen(false));
  }, [selectedProject]);
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: theme.secondaryColor1 }}>
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: isSidebarOpen && width > smallDevice ? `310px` : "70px",
          }}
        ></div>
        <NarrowSideBar />
        <div
          style={{
            margin: "8px",
            paddingLeft: "16px",
            width:
              isSidebarOpen && width > smallDevice
                ? `${width - 310}px`
                : `${width - 80}px`,
          }}
        >
          {children}
        </div>
      </div>
      {width <= smallDevice && isSidebarOpen ? (
        <div id={"sidebar-overlay"}>
          <Sidebar />
        </div>
      ) : (
        <Sidebar />
      )}
    </Box>
  );
};

export default AuthenticatedLayout;
