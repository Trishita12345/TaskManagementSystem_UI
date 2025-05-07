import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import strings from "../../../constants/strings";

const AddEditTaskForm = ({ onSubmit, onPopupClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const description = watch("description", "");

  const data = useSelector((state) => state.taskStore.taskById);
  const selectedIdForEdit = useSelector(
    (state) => state.taskStore.selectedIdForEdit
  );
  const statusList = useSelector((state) => state.taskStore.statusList);
  const employeeList = useSelector((state) => state.taskStore.employeeList);

  useEffect(() => {
    reset(data);
  }, [data]);

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
          <p className="header">
            {selectedIdForEdit ? strings.editTask : strings.newTask}
          </p>
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
        onSubmit={handleSubmit((data) => onSubmit(data, reset))}
        style={{ maxWidth: 400, margin: "auto" }}
      >
        {selectedIdForEdit && (
          <div className="formItem">
            <label className="formLabel">{strings.taskId}</label>
            <input className="formValue" {...register("id")} disabled />
          </div>
        )}
        <div className="formItem">
          <label className="formLabel">{strings.description}</label>
          <textarea
            className="formValue"
            rows={8}
            {...register("description", {
              maxLength: {
                value: 200,
                message: strings.descriptionMaxLengthEror,
              },
            })}
          />
          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p style={{ margin: 0, color: "red" }}>
              {errors.description && errors.description.message}
            </p>
            <p
              style={{
                fontSize: "0.9em",
                color: description.length > 200 ? "red" : "gray",
                margin: 0,
              }}
            >
              {description.length} / {200}
            </p>
          </p>
        </div>

        <div className="formItem">
          <label className="formLabel">{strings.dueDate}</label>
          <input
            type="date"
            className="formValue"
            {...register("dueDate", {
              required: "Date is required",
              validate: (value) => {
                const selectedDate = new Date(value);
                if (selectedDate < minDate || selectedDate > maxDate) {
                  return `${strings.dateError1} ${minDate.toLocaleDateString()} 
                    ${strings.and} ${maxDate.toLocaleDateString()}`;
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
          <label className="formLabel">{strings.assignedTo}</label>
          <select className="formValue" {...register("assignedTo")}>
            {employeeList.map((i, idx) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>
        </div>

        {selectedIdForEdit && (
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
        )}

        <div id="formBtnContainer">
          <button type="submit">{strings.submit}</button>
          <button type="button" onClick={() => reset()}>
            {strings.reset}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddEditTaskForm;
