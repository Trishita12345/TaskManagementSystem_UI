import Hamburger from "./Hamburger";
import SideBarItem from "./SidebarItem";
import { sidebarItemsList } from "../../constants/sidebarItemsList";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { getTheme } from "../../utils/redux/slices/commonSlice";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const theme = useSelector(getTheme);
  if (!isSidebarOpen)
    return (
      <div
        id="sidebar-closed"
        style={{
          backgroundColor: theme.secondaryColor2,
          borderRight: `1px solid ${theme.secondaryColor3}`,
        }}
      >
        <Hamburger
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
    );
  return (
    <Box
      id="sidebar"
      style={{
        backgroundColor: theme.secondaryColor2,
      }}
    >
      <Hamburger
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div style={{ marginBottom: "8px" }}></div>
      {sidebarItemsList.map((s) => (
        <SideBarItem key={s.id} item={s} />
      ))}
    </Box>
  );
};

export default Sidebar;
