import "./layout.css";
import Sidebar from "./Sidebar";
import Logo from "./Logo";
import useScreenSize from "../../utils/customHooks/useScreenSize";
import { useEffect, useState } from "react";
import Hamburger from "./Hamburger";
import { smallDevice } from "../../constants/data";
import Avatar from "../../components/Avatar";
import NarrowSideBar from "./NarrowSideBar";
import ThemeToggleSwitch from "../../components/ThemeToggleSwich";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { width } = useScreenSize();
  console.log(width);
  useEffect(() => {
    if (width < smallDevice) setIsSidebarOpen(false);
  }, [width]);
  return (
    <>
      <div
        style={{
          height: "60px",
          padding: "0px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0px 12px 30px 0px rgba(120,120,120,0.1)",
        }}
      >
        <Logo />
        <ThemeToggleSwitch />
        <Avatar text="T" onClick={() => {}} />
      </div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: isSidebarOpen && width > smallDevice ? `220px` : "50px",
          }}
        ></div>
        <NarrowSideBar setIsSidebarOpen={setIsSidebarOpen} />
        <div
          style={{
            margin: "8px",
            width:
              isSidebarOpen && width > smallDevice
                ? `${width - 220}px`
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
