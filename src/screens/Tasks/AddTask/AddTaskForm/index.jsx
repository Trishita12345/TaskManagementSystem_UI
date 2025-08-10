import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import TextField from "../../../../components/TextInput";

// const AddTaskForm = ({ onSubmit, onPopupClose }) => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const title = watch("title", "");
//   const description = watch("description", "");

//   const data = useSelector((state) => state.taskSlice.taskById);
//   const selectedIdForEdit = useSelector(
//     (state) => state.taskSlice.selectedIdForEdit
//   );
//   const statusList = useSelector((state) => state.taskSlice.statusList);
//   const employeeList = useSelector((state) => state.taskSlice.employeeList);

//   useEffect(() => {
//     reset(data);
//   }, [data]);

//   return (
//     <>
//       <div style={{ margin: "6px 10px" }}>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <p className="header">
//             {selectedIdForEdit ? strings.editTask : strings.newTask}
//           </p>
//           <FontAwesomeIcon
//             onClick={(e) => onPopupClose()}
//             icon={faXmark}
//             size="lg"
//             style={{ cursor: "pointer", padding: "4px" }}
//           />
//         </div>
//         <hr />
//       </div>
//       <form
//         onSubmit={handleSubmit((data) => onSubmit(data, reset))}
//         style={{ maxWidth: 400, margin: "auto" }}
//       >
//         {selectedIdForEdit && (
//           <div className="formItem">
//             <label className="formLabel">{strings.taskId}</label>
//             <input className="formValue" {...register("id")} disabled />
//           </div>
//         )}
//         <div className="formItem">
//           <label className="formLabel">{strings.title}</label>
//           <textarea
//             className="formValue"
//             rows={2}
//             {...register("title", {
//               required: { value: true, message: strings.titleRequiredError },
//               maxLength: {
//                 value: 100,
//                 message: strings.titleMaxLengthEror,
//               },
//             })}
//           />
//           <p
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <p style={{ margin: 0, color: "red" }}>
//               {errors.title && errors.title.message}
//             </p>
//             <p
//               style={{
//                 fontSize: "0.9em",
//                 color: title.length > 100 ? "red" : "gray",
//                 margin: 0,
//               }}
//             >
//               {title.length} / {100}
//             </p>
//           </p>
//         </div>

//         <div className="formItem">
//           <label className="formLabel">{strings.description}</label>
//           <textarea
//             className="formValue"
//             rows={8}
//             {...register("description", {
//               maxLength: {
//                 value: 400,
//                 message: strings.descriptionMaxLengthEror,
//               },
//             })}
//           />
//           <p
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <p style={{ margin: 0, color: "red" }}>
//               {errors.description && errors.description.message}
//             </p>
//             <p
//               style={{
//                 fontSize: "0.9em",
//                 color: description.length > 400 ? "red" : "gray",
//                 margin: 0,
//               }}
//             >
//               {description.length} / {400}
//             </p>
//           </p>
//         </div>

//         <div className="formItem">
//           <label className="formLabel">{strings.assignedTo}</label>
//           <select
//             className="formValue"
//             {...register("assignedTo", {
//               required: {
//                 value: true,
//                 message: strings.assignedToRequiredErrror,
//               },
//             })}
//           >
//             {employeeList.map((i, idx) => (
//               <option key={i.id} value={i.id}>
//                 {i.name}
//               </option>
//             ))}
//           </select>
//           <p style={{ margin: 0, color: "red" }}>
//             {errors.assignedTo && errors.assignedTo.message}
//           </p>
//         </div>

//         {selectedIdForEdit && (
//           <div className="formItem">
//             <label className="formLabel">{strings.status}</label>
//             <select className="formValue" {...register("status")}>
//               {statusList.map((i, idx) => (
//                 <option key={i.id} value={i.id}>
//                   {i.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         <div id="formBtnContainer">
//           <button type="submit">{strings.submit}</button>
//           <button type="button" onClick={() => reset()}>
//             {strings.reset}
//           </button>
//         </div>
//       </form>
//     </>
//   );
// };

const AddTaskForm = () => {
  return (
    <>
      <TextField
        placeholder={"placeholder"}
        value={"value"}
        onChange={() => {}}
      />
    </>
  );
};

export default AddTaskForm;
