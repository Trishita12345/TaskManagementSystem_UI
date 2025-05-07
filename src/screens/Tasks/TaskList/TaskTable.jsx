import { useSelector } from "react-redux";
import TaskRow from "./TaskRow";
import strings from "../../../constants/strings";

const TaskTable = ({ updateStatus }) => {
  const tasks = useSelector((state) => state.taskStore.tasks);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>{strings.taskId}</th>
            <th>{strings.dueDate}</th>
            <th>{strings.assignedTo}</th>
            <th>{strings.status}</th>
            <th>{strings.actions}</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <TaskRow
              key={t.id}
              id={t.id}
              dueDate={t.dueDate}
              status={t.status}
              assignedTo={t.assignedTo}
              updateStatus={updateStatus}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TaskTable;
