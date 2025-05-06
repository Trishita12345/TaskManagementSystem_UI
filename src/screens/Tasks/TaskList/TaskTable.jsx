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
            <th>{strings.title}</th>
            <th>{strings.dueDate}</th>
            <th>{strings.status}</th>
            <th>{strings.actions}</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <TaskRow
              key={t.id}
              id={t.id}
              title={t.title}
              dueDate={t.dueDate}
              status={t.status}
              updateStatus={updateStatus}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TaskTable;
