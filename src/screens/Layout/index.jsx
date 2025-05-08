import "./layout.css";
import Sidebar from "./Sidebar";
import Logo from "./Logo";
import useScreenSize from "../../utils/customHooks/useScreenSize";
import { useEffect, useState } from "react";
import { smallDevice } from "../../constants/data";
import Avatar from "../../components/Avatar";
import NarrowSideBar from "./NarrowSideBar";
import ThemeToggleSwitch from "../../components/ThemeToggleSwich";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { width } = useScreenSize();
  useEffect(() => {
    if (width < smallDevice) setIsSidebarOpen(false);
  }, [width]);
  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: isSidebarOpen && width > smallDevice ? `280px` : "70px",
          }}
        ></div>
        <NarrowSideBar setIsSidebarOpen={setIsSidebarOpen} />
        <div
          style={{
            margin: "8px",
            width:
              isSidebarOpen && width > smallDevice
                ? `${width - 280}px`
                : "100%",
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
    </>
  );
};

export default Layout;
