import { statusData } from "../../../constants/data";

const GetStatus = ({ id, statusId, updateStatus }) => {
  const getColor = (status) => {
    if (status === 3) return "#346618";
    else if (status === 2) return "#d4a304";
    else return "#c70404";
  };

  return (
    <div style={{ display: "flex" }}>
      {statusData.map((s, idx) => (
        <>
          <div
            class="tooltip"
            style={{
              padding: "2px 8px",
              borderRadius: "5px",
              color: s.id === statusId ? getColor(s.id) : "#1c6fbd",
              backgroundColor:
                s.id !== statusId ? "#ffffff" : `${getColor(s.id)}40`,
              cursor: s.id !== statusId ? "pointer" : "default",
              textDecoration: s.id !== statusId ? "underline" : "none",
            }}
            onClick={() => updateStatus(id, s.id)}
          >
            {s.name}
            {s.id !== statusId && (
              <span class="tooltiptext">{`Mark As ${s.name}`}</span>
            )}
          </div>

          <div>&nbsp;{idx !== statusData.length - 1 && "|"} &nbsp; </div>
        </>
      ))}
    </div>
  );
};

export default GetStatus;
