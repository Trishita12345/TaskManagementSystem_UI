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

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(sidebarOpen);
  const theme = useSelector(getTheme);
  const { width } = useScreenSize();
  useEffect(() => {
    if (width < smallDevice) dispatch(setIsSidebarOpen(false));
  }, [width]);
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: theme.secondaryColor1 }}>
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: isSidebarOpen && width > smallDevice ? `280px` : "70px",
          }}
        ></div>
        <NarrowSideBar />
        <div
          style={{
            margin: "8px",
            width:
              isSidebarOpen && width > smallDevice
                ? `${width - 280}px`
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
