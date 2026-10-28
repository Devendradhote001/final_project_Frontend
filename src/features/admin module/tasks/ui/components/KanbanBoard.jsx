import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, GripVertical } from "lucide-react";
import { TASK_STATUSES } from "../../constants/taskConstants";
import { AssigneeAvatar, TaskPriorityBadge } from "./TaskBadges";
import { formatDate, getAssignee, isOverdue } from "../../utils/taskHelpers";

const COLUMN_DOT = {
  todo: "bg-[var(--text-muted)]",
  "in-progress": "bg-[var(--tertiary)]",
  completed: "bg-[var(--success)]",
};

const KanbanCard = ({ task, statusIndex, employees, onView, onMove }) => {
  let prev = TASK_STATUSES[statusIndex - 1];
  let next = TASK_STATUSES[statusIndex + 1];
  let overdue = isOverdue(task);

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", task._id);
        e.dataTransfer.effectAllowed = "move";
      }}
      className="group cursor-grab rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 transition hover:border-[var(--tertiary)]/60 active:cursor-grabbing"
    >
      <div className="flex items-start gap-2">
        <GripVertical
          size={16}
          className="mt-0.5 shrink-0 text-[var(--text-muted)] opacity-50 group-hover:opacity-100"
        />
        <button
          type="button"
          onClick={() => onView(task)}
          className="text-left text-sm font-medium leading-5 text-[var(--text-primary)] hover:text-[var(--tertiary)]"
        >
          {task.title}
        </button>
      </div>

      {(task.priority || task.dueDate) && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <TaskPriorityBadge priority={task.priority} />
          {task.dueDate && (
            <span
              className={`flex items-center gap-1.5 text-xs ${
                overdue ? "text-[var(--danger)]" : "text-[var(--text-muted)]"
              }`}
            >
              <CalendarDays size={13} />
              {formatDate(task.dueDate)}
            </span>
          )}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-[var(--border-color)] pt-3">
        <AssigneeAvatar assignee={getAssignee(task, employees)} size="sm" />

        {/* keyboard / click friendly alternative to drag and drop */}
        <div className="flex shrink-0 gap-1">
          {prev && (
            <button
              type="button"
              title={`Move to ${prev.label}`}
              aria-label={`Move to ${prev.label}`}
              onClick={() => onMove(task, prev.value)}
              className="flex size-7 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
            >
              <ChevronLeft size={15} />
            </button>
          )}
          {next && (
            <button
              type="button"
              title={`Move to ${next.label}`}
              aria-label={`Move to ${next.label}`}
              onClick={() => onMove(task, next.value)}
              className="flex size-7 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
            >
              <ChevronRight size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const KanbanBoard = ({ board, isPending, employees, onView, onStatusChange }) => {
  const [dragOver, setDragOver] = useState(null);

  if (isPending) {
    return (
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {TASK_STATUSES.map((status) => (
          <div
            key={status.value}
            className="h-80 animate-pulse rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)]"
          />
        ))}
      </div>
    );
  }

  const allTasks = Object.values(board || {}).flat();

  const handleDrop = (e, status) => {
    e.preventDefault();
    setDragOver(null);
    let taskId = e.dataTransfer.getData("text/plain");
    let task = allTasks.find((item) => item._id === taskId);
    if (task && task.status !== status) onStatusChange(task, status);
  };

  return (
    <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-3">
      {TASK_STATUSES.map((status, statusIndex) => {
        let tasks = board?.[status.column] || [];

        return (
          <section
            key={status.value}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(status.value);
            }}
            onDragLeave={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setDragOver(null);
            }}
            onDrop={(e) => handleDrop(e, status.value)}
            className={`flex min-h-[420px] flex-col rounded-2xl border bg-[var(--bg-main)] transition ${
              dragOver === status.value
                ? "border-[var(--tertiary)] bg-[var(--tertiary)]/5"
                : "border-[var(--border-color)]"
            }`}
          >
            <div className="flex items-center justify-between border-b border-[var(--border-color)] px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <span className={`size-2.5 rounded-full ${COLUMN_DOT[status.value]}`} />
                <h3 className="text-sm font-semibold">{status.label}</h3>
              </div>
              <span className="rounded-full bg-[var(--bg-surface)] px-2.5 py-0.5 text-xs font-semibold text-[var(--text-muted)]">
                {tasks.length}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-3 p-3">
              {tasks.map((task) => (
                <KanbanCard
                  key={task._id}
                  task={task}
                  statusIndex={statusIndex}
                  employees={employees}
                  onView={onView}
                  onMove={onStatusChange}
                />
              ))}

              {!tasks.length && (
                <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-[var(--border-color)] p-6 text-center text-xs text-[var(--text-muted)]">
                  Drop tasks here
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
