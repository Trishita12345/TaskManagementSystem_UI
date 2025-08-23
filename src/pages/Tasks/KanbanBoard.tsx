import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { Card, Typography, Grid, Box, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTheme, setMessage } from "../../utils/redux/slices/commonSlice";
import { statuses, tasks } from "../../utils/redux/slices/taskSlice";
import type {
  dropdownDataProps,
  EmployeeSummaryType,
  TaskSummary,
} from "../../constants/types";
import { selectedProjectDetails } from "../../utils/redux/slices/authenticationSlice";
import { updateTask } from "../../utils/services/taskService";
import {
  getEmployeesWithDefalult,
  getErrorMessage,
} from "../../utils/helperFunctions/commonHelperFunctions";
import {
  PriorityIconMap,
  TypeIconMap,
} from "../../utils/helperFunctions/dropdownHelper";
import CustomEmployeeAvatar from "../../components/CustomEmployeeAvatar";
import { colors } from "../../constants/colors";

type StatusValue = "TODO" | "IN_PROGRESS" | "QA" | "COMPLETED";

type BoardData = {
  [key in StatusValue]: TaskSummary[];
};

const Column = ({
  id,
  children,
  statusList,
  boardData,
}: {
  id: string;
  children: React.ReactNode;
  statusList: dropdownDataProps[];
  boardData: BoardData;
}) => {
  const theme = useSelector(getTheme);
  const { setNodeRef } = useDroppable({ id }); // mark this column as a drop zone

  return (
    <Paper
      ref={setNodeRef}
      elevation={3}
      sx={{
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundImage: "none",
        backgroundColor: `${theme.secondaryColor2}`,
      }}
    >
      <Box pb={1} display={"flex"} alignItems={"center"} gap={1}>
        <Typography fontWeight="500">
          {statusList.find((s: dropdownDataProps) => s.value === id)?.label}
        </Typography>
        <Typography>|</Typography>
        <Typography fontWeight="bold">
          {boardData[id as keyof typeof boardData].length}
        </Typography>
      </Box>

      {/* Scrollable area for tasks */}
      <Box sx={{ flex: 1, overflowY: "auto", minHeight: 400, maxHeight: 500 }}>
        <Box display="flex" flexDirection="column" gap={1}>
          {children}
        </Box>
      </Box>
    </Paper>
  );
};

// Draggable card representing a task
const TaskCard = ({ task }: { task: TaskSummary }) => {
  const theme = useSelector(getTheme);
  const { employees } = useSelector(selectedProjectDetails);
  const { taskId, taskName, priority, type, assignedTo } = task;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: taskId,
  });
  const index = getEmployeesWithDefalult(employees).findIndex(
    (e: EmployeeSummaryType) => e.employeeId === assignedTo.employeeId
  );
  const sx = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    cursor: "grab",
  };

  return (
    <Card
      ref={setNodeRef}
      sx={{ ...sx, py: 1, px: 1.5, bgcolor: theme.secondaryColor1 }}
      {...attributes}
      {...listeners}
    >
      <Box
        minHeight={"50px"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <Typography variant="body1" pb={1}>
          {taskName}
        </Typography>
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <Grid container gap={1}>
              <Grid item>{TypeIconMap[type as keyof typeof TypeIconMap]}</Grid>
              <Grid item>
                {PriorityIconMap[priority as keyof typeof PriorityIconMap]}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <CustomEmployeeAvatar
              employeeDetails={assignedTo}
              height={26}
              width={26}
              fontSize={"10px"}
              bgColor={colors[index % colors.length]}
              showInitial={assignedTo.firstName !== "Unassigned"}
            />
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

const KanbanBoard = () => {
  const { projectId } = useSelector(selectedProjectDetails);
  const [boardData, setBoardData] = useState<BoardData>({
    TODO: [],
    IN_PROGRESS: [],
    QA: [],
    COMPLETED: [],
  });
  const allTasks = useSelector(tasks);
  const statusList = useSelector(statuses);
  const dispatch = useDispatch();

  useEffect(() => {
    const boardData: BoardData = {
      TODO: [],
      IN_PROGRESS: [],
      QA: [],
      COMPLETED: [],
    };
    statusList.forEach((s: dropdownDataProps) => {
      boardData[s.value as StatusValue] = allTasks.filter(
        (t) => t.status === s.value
      );
    });
    setBoardData(boardData);
  }, [allTasks]);

  const [activeTask, setActiveTask] = useState<TaskSummary | null>(null);

  // Called when dragging starts
  const handleDragStart = (event: DragStartEvent) => {
    if (boardData) {
      const { active } = event;
      const taskId = active.id as string;
      const task = Object.values(boardData)
        .flat()
        .find((t) => t.taskId === taskId);

      if (task) {
        setActiveTask(task);
      }
    }
  };

  // Called when dragging ends
  const handleDragEnd = async (event: DragEndEvent) => {
    if (boardData) {
      const { active, over } = event;
      if (!over) return;

      const taskId = active.id as string;
      const targetColumn = over.id as string;
      const sourceColumn = Object.keys(boardData).find((colId) =>
        boardData[colId as keyof typeof boardData].some(
          (task) => task.taskId === taskId
        )
      );
      if (!sourceColumn || sourceColumn === targetColumn) return;

      //update optimistically
      const task = boardData[sourceColumn as keyof typeof boardData].find(
        (t) => t.taskId === taskId
      );
      setBoardData((prev) => ({
        ...prev,
        [sourceColumn]: prev[sourceColumn as keyof typeof prev].filter(
          (t: TaskSummary) => t.taskId !== taskId
        ),
        [targetColumn]: [task, ...prev[targetColumn as keyof typeof prev]],
      }));

      //Actual update
      try {
        await updateTask(projectId, taskId, {
          key: "status",
          value: targetColumn,
        });
        // onSuccess();
      } catch (error) {
        setBoardData((prev) => ({
          ...prev,
          [targetColumn]: prev[targetColumn as keyof typeof prev].filter(
            (t: TaskSummary) => t.taskId !== taskId
          ),
          [sourceColumn]: [task, ...prev[sourceColumn as keyof typeof prev]],
        }));
        dispatch(
          setMessage({
            display: true,
            severity: "error",
            message: getErrorMessage(error),
          })
        );
      }
      setActiveTask(null);
    }
  };

  return (
    <>
      {boardData ? (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <Grid container spacing={2} sx={{ my: 2 }}>
            {Object.entries(boardData).map(([columnId, tasks]) => (
              <Grid item xs={12} sm={6} md={3} key={columnId}>
                <Column
                  id={columnId as StatusValue}
                  statusList={statusList}
                  boardData={boardData}
                >
                  {tasks.map((task: TaskSummary) => (
                    <TaskCard key={task.taskId} task={task} />
                  ))}
                </Column>
              </Grid>
            ))}
          </Grid>

          {/* Floating overlay for active dragged task */}
          <DragOverlay>
            {activeTask ? <TaskCard task={activeTask} /> : null}
          </DragOverlay>
        </DndContext>
      ) : (
        <>shimmerui</>
      )}
    </>
  );
};

export default KanbanBoard;
