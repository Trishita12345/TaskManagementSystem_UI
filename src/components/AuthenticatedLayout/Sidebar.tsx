import Hamburger from "./Hamburger";
import SideBarItem from "./SidebarItem";
import { sidebarItemsList } from "../../constants/sidebarItemsList";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { getTheme, sidebarOpen } from "../../utils/redux/slices/commonSlice";
import ProjectCard from "./ProjectCard";
import { selectedProjectDetails } from "../../utils/redux/slices/authenticationSlice";

type sidebarItemType = {
  id: number;
  name: string;
  icon: any;
  route: string;
  priviledge: string;
};

const Sidebar = () => {
  const selectedProject = useSelector(selectedProjectDetails);
  const isSidebarOpen = useSelector(sidebarOpen);
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
        <Hamburger disabled={selectedProject.projectId ? false : true} />
      </div>
    );
  return (
    <Box
      id="sidebar"
      sx={{
        backgroundColor: theme.secondaryColor2,
        borderRight: `1px solid ${theme.secondaryColor3}`,
      }}
    >
      <Hamburger disabled={selectedProject.projectId ? false : true} />
      <Box mt={1}>
        <ProjectCard />
        {sidebarItemsList.map((s: sidebarItemType) => (
          <SideBarItem key={s.id} item={s} />
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
