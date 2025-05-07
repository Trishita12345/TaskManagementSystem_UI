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

  useEffect(() => {
    reset(taskFilterObj);
  }, [taskFilterObj]);

  const minDate = new Date();
  const maxDate = new Date("2030-12-31");
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
          <label className="formLabel">{strings.taskTitle}</label>
          <input className="formValue" {...register("title")} />
        </div>
        <div className="formItem">
          <label className="formLabel">{strings.dueDate}</label>
          <input
            type="date"
            className="formValue"
            {...register("dueDate", {
              validate: (value) => {
                if (value !== "") {
                  const selectedDate = new Date(value);
                  if (selectedDate < minDate || selectedDate > maxDate) {
                    return `${
                      strings.dateError1
                    } ${minDate.toLocaleDateString()} 
                    ${strings.and} ${maxDate.toLocaleDateString()}`;
                  }
                }
                return true;
              },
            })}
          />
          {errors.dueDate && (
            <p style={{ color: "red" }}>{errors.dueDate.message}</p>
          )}
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
