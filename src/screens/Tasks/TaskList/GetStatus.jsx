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
              className="bottom-tooltip"
              style={{
                color: "#1c6fbd",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => updateStatus(id, s.id)}
            >
              {s.name}
              <span className="bottom-tooltiptext">{`Mark As ${s.name}`}</span>
            </div>
          )}
          <div>&nbsp;{idx !== statusList.length - 1 && "|"} &nbsp; </div>
        </>
      ))}
    </div>
    // <div style={{ width: "100%" }}>
    //   <select>
    //     <option value="0">Select car:</option>
    //     <option value="1">Audi</option>
    //     <option value="2">BMW</option>
    //     <option value="3">Citroen</option>
    //     <option value="4">Ford</option>
    //     <option value="5">Honda</option>
    //     <option value="6">Jaguar</option>
    //     <option value="7">Land Rover</option>
    //     <option value="8">Mercedes</option>
    //     <option value="9">Mini</option>
    //     <option value="10">Nissan</option>
    //     <option value="11">Toyota</option>
    //     <option value="12">Volvo</option>
    //   </select>
    // </div>
  );
};

export default GetStatus;
