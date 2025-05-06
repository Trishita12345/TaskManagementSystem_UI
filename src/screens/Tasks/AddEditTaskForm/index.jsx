import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { statusData } from "../../../constants/data";

const AddEditTaskForm = ({ data, onSubmit, onPopupClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const description = watch("description", "");

  useEffect(() => {
    reset(data);
  }, [data]);
  console.log(errors);
  const minDate = new Date();
  const maxDate = new Date("2030-12-31");
  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={() => onPopupClose(reset)}>Close</button>
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

        <div className="formItem">
          <label className="formLabel">Status:</label>
          <select className="formValue" {...register("status")}>
            {statusData.map((i, idx) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>
        </div>

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
