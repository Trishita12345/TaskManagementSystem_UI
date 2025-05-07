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
        <div className="formItem">
          <label className="formLabel">Task Title:</label>
          <input
            className="formValue"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p style={{ color: "red" }}>{errors.title.message}</p>
          )}
        </div>

        <div className="formItem">
          <label className="formLabel">Description:</label>
          <textarea
            className="formValue"
            {...register("description", {
              maxLength: {
                value: 200,
                message: "Description cannot be more than 200 characters",
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
          <label className="formLabel">Due date:</label>
          <input
            type="date"
            className="formValue"
            {...register("dueDate", {
              required: "Date is required",
              validate: (value) => {
                const selectedDate = new Date(value);
                if (selectedDate < minDate || selectedDate > maxDate) {
                  return `Date must be between ${minDate.toLocaleDateString()} and ${maxDate.toLocaleDateString()}`;
                }
                return true;
              },
            })}
          />
          {errors.dueDate && (
            <p style={{ color: "red" }}>{errors.dueDate.message}</p>
          )}
        </div>

        {/* {selectedIdForEdit && (
          <div className="formItem">
            <label className="formLabel">Status:</label>
            <select className="formValue" {...register("status")}>
              {statusList.map((i, idx) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </select>
          </div>
        )} */}

        <div id="formBtnContainer">
          <button type="submit">Submit</button>
          <button type="button" onClick={() => reset()}>
            Reset
          </button>
        </div>
      </form>
    </>
  );
};

export default AddEditTaskForm;
