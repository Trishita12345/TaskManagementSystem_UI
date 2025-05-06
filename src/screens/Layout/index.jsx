import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons";

const Layout = ({ children }) => {
  return (
    // <div style={{ display: "flex", height: "100vh" }}>
    //   <div style={{ width: "300px", backgroundColor: "red" }}></div>
    <div style={{ display: "flex", flexDirection: "column", width: "100vw" }}>
      <div
        style={{
          display: "flex",
          boxShadow: "0px 12px 30px 0px rgba(120,120,120,0.1)",
        }}
      >
        <div
          style={{
            padding: "15px 6px",
            display: "flex",
            gap: 2,
            cursor: "pointer",
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon
            onClick={(e) => onPopupClose()}
            icon={faCube}
            size="lg"
            style={{ padding: "4px", fontSize: "25px" }}
          />
          <div style={{ padding: "4px", fontSize: "25px", fontWeight: 500 }}>
            manageMyTask.com
          </div>
        </div>
      </div>
      <div style={{ margin: "8px" }}>{children}</div>
    </div>
    // </div>
  );
};

export default Layout;
