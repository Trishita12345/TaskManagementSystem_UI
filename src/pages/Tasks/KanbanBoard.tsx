import React, { useState } from "react";
import {
  closestCenter,
  closestCorners,
  DndContext,
  DragOverlay,
  PointerSensor,
  pointerWithin,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"; // Define columns

// Define columns
const columns = ["Todo", "In Progress", "QA", "Done"];

// Initial data
const initialTasks: Record<string, string[]> = {
  Todo: ["Task 1", "Task 2"],
  "In Progress": ["Task 3"],
  QA: ["Task 4"],
  Done: ["Task 5"],
};

// Sortable Item Component
function SortableItem({ id }: { id: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "8px 12px",
    margin: "4px 0",
    border: "1px solid #ddd",
    borderRadius: "6px",
    background: "#fff",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {id}
    </div>
  );
}

// Main Kanban Board
export default function KanbanBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [collisionAlgo, setCollisionAlgo] = useState(() => rectIntersection);

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  function handleDragOver(event: any) {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (!activeContainer || !overContainer) return;

    if (activeContainer !== overContainer) {
      setTasks((prev) => {
        const activeItems = [...prev[activeContainer]];
        const overItems = [...prev[overContainer]];

        activeItems.splice(activeItems.indexOf(active.id), 1);
        overItems.push(active.id);

        return {
          ...prev,
          [activeContainer]: activeItems,
          [overContainer]: overItems,
        };
      });
    }
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (!activeContainer || !overContainer) return;

    if (activeContainer === overContainer) {
      const oldIndex = tasks[activeContainer].indexOf(active.id);
      const newIndex = tasks[activeContainer].indexOf(over.id);

      setTasks((prev) => ({
        ...prev,
        [activeContainer]: arrayMove(prev[activeContainer], oldIndex, newIndex),
      }));
    }
    setActiveId(null);
  }

  function findContainer(id: string) {
    if (columns.includes(id)) return id;
    return Object.keys(tasks).find((key) => tasks[key].includes(id));
  }

  return (
    <div style={{ display: "flex", gap: "20px", paddingTop: "10px" }}>
      <DndContext
        sensors={sensors}
        collisionDetection={collisionAlgo}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {columns.map((col) => (
          <div
            key={col}
            style={{
              flex: 1,
              background: "#f5f5f5",
              borderRadius: "8px",
              padding: "12px",
              minHeight: "300px",
            }}
          >
            <h3>{col}</h3>
            <SortableContext items={tasks[col]}>
              {tasks[col].map((task) => (
                <SortableItem key={task} id={task} />
              ))}
            </SortableContext>
          </div>
        ))}

        <DragOverlay>
          {activeId ? (
            <div
              style={{
                padding: "8px 12px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                background: "#eee",
              }}
            >
              {activeId}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Collision algorithm selector */}
      <div style={{ position: "absolute", bottom: 20, left: 20 }}>
        <h4>Collision detection algorithm</h4>
        <label>
          <input
            type="radio"
            checked={collisionAlgo === rectIntersection}
            onChange={() => setCollisionAlgo(rectIntersection)}
          />
          Rect Intersection
        </label>
        <br />
        <label>
          <input
            type="radio"
            checked={collisionAlgo === closestCenter}
            onChange={() => setCollisionAlgo(closestCenter)}
          />
          Closest Center
        </label>
        <br />
        <label>
          <input
            type="radio"
            checked={collisionAlgo === closestCorners}
            onChange={() => setCollisionAlgo(closestCorners)}
          />
          Closest Corners
        </label>
        <br />
        <label>
          <input
            type="radio"
            checked={collisionAlgo === pointerWithin}
            onChange={() => setCollisionAlgo(pointerWithin)}
          />
          Pointer Within
        </label>
      </div>
    </div>
  );
}
