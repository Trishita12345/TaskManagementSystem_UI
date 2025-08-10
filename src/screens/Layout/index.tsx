import "./layout.css";
import Sidebar from "./Sidebar";
import useScreenSize from "../../utils/customHooks/useScreenSize";
import { useEffect, useState } from "react";
import { smallDevice } from "../../constants/data";
import NarrowSideBar from "./NarrowSideBar";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { getTheme } from "../../utils/redux/slices/commonSlice";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const theme = useSelector(getTheme);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { width } = useScreenSize();
  useEffect(() => {
    if (width < smallDevice) setIsSidebarOpen(false);
  }, [width]);
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: theme.secondaryColor1 }}>
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: isSidebarOpen && width > smallDevice ? `280px` : "70px",
          }}
        ></div>
        <NarrowSideBar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
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
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
      ) : (
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )}
    </Box>
  );
};

export default Layout;
