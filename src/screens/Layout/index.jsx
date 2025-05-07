import "./layout.css";
import Sidebar, { openSidebar } from "./Sidebar";
import Logo from "./Logo";

const Layout = ({ children }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          boxShadow: "0px 12px 30px 0px rgba(120,120,120,0.1)",
        }}
      >
        <Logo onHamburgerClick={openSidebar} />
      </div>
      <div style={{ margin: "8px" }}>{children}</div>
      <Sidebar />
    </>
  );
};

export default Layout;
