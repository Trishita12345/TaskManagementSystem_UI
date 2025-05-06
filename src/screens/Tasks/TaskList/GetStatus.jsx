import { useSelector } from "react-redux";
import Chip from "../../../components/Chip";
import { getStatusColor } from "../../../utils/helperFunctions";

const GetStatus = ({ id, statusId, updateStatus }) => {
  const statusList = useSelector((state) => state.taskStore.statusList);

  return (
    <div style={{ display: "flex" }}>
      {statusList.map((s, idx) => (
        <>
          {s.id === statusId ? (
            <Chip text={s.name} color={getStatusColor(statusId)} />
          ) : (
            <div
              class="tooltip"
              style={{
                color: "#1c6fbd",
                backgroundColor: "#ffffff",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => updateStatus(id, s.id)}
            >
              {s.name}
              <span class="tooltiptext">{`Mark As ${s.name}`}</span>
            </div>
          )}
          <div>&nbsp;{idx !== statusList.length - 1 && "->"} &nbsp; </div>
        </>
      ))}
    </div>
  );
};

export default GetStatus;
