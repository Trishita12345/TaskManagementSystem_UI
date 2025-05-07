import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import strings from "../../../constants/strings";

const FilterTaskForm = ({ onSubmit, onPopupClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const taskFilterObj = useSelector((state) => state.taskStore.taskFilterObj);
  const statusList = useSelector((state) => state.taskStore.statusList);
  const employeeList = useSelector((state) => state.taskStore.employeeList);

  useEffect(() => {
    reset(taskFilterObj);
  }, [taskFilterObj]);

  return (
    <>
      <div style={{ margin: "6px 10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p className="header">{strings.filterTask}</p>
          <FontAwesomeIcon
            onClick={(e) => onPopupClose()}
            icon={faXmark}
            size="lg"
            style={{ cursor: "pointer", padding: "4px" }}
          />
        </div>
        <hr />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: 400, margin: "auto" }}
      >
        <div className="formItem">
          <label className="formLabel">{strings.taskId}</label>
          <input className="formValue" {...register("id")} />
        </div>
        <div className="formItem">
          <label className="formLabel">{strings.assignedTo}</label>
          <select className="formValue" {...register("assignedTo")}>
            {employeeList.map((i, idx) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>
        </div>
        <div className="formItem">
          <label className="formLabel">{strings.status}</label>
          <select className="formValue" {...register("status")}>
            {statusList.map((i, idx) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>
        </div>
        <div id="formBtnContainer">
          <button type="submit">{strings.search}</button>
          <button
            type="button"
            onClick={() => onSubmit({})}
            // className={Object.keys(taskFilterObj).length === 0}
            disabled={Object.keys(taskFilterObj).length === 0}
          >
            {strings.clearFilter}
          </button>
        </div>
      </form>
    </>
  );
};

export default FilterTaskForm;
