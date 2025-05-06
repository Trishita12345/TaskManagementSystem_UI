import TaskRow from "./TaskRow";

const TaskTable = ({
  tasks,
  setSelectedIdForEdit,
  setSelectedIdForDelete,
  updateStatus,
}) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <TaskRow
              key={t.id}
              id={t.id}
              title={t.title}
              description={t.description || "-"}
              dueDate={t.dueDate}
              status={t.status}
              setSelectedIdForEdit={setSelectedIdForEdit}
              setSelectedIdForDelete={setSelectedIdForDelete}
              updateStatus={updateStatus}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TaskTable;
