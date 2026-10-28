import { CalendarDays, ClipboardList, Eye, Trash2, UserPlus } from "lucide-react";
import { AssigneeAvatar, TaskPriorityBadge } from "./TaskBadges";
import TaskStatusSelect from "./TaskStatusSelect";
import {
  formatDate,
  getAssignee,
  isOverdue,
} from "../../utils/taskHelpers";

const IconButton = ({ label, onClick, danger, children }) => (
  <button
    type="button"
    title={label}
    aria-label={label}
    onClick={onClick}
    className={`flex size-9 items-center justify-center rounded-lg transition ${
      danger
        ? "text-[var(--text-muted)] hover:bg-[var(--danger)]/10 hover:text-[var(--danger)]"
        : "text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
    }`}
  >
    {children}
  </button>
);

const TaskTable = ({
  tasks = [],
  isAdmin,
  employees,
  pendingStatusId,
  onView,
  onAssign,
  onDelete,
  onStatusChange,
}) => {
  if (!tasks.length) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-[var(--tertiary)]/15 text-[var(--tertiary)]">
          <ClipboardList size={26} />
        </div>
        <h3 className="mt-4 font-semibold">No tasks found</h3>
        <p className="mt-1 max-w-sm text-sm text-[var(--text-muted)]">
          {isAdmin
            ? "Try changing your filters, or create a new task to get started."
            : "Nothing assigned to you matches these filters."}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[860px]">
        <thead className="bg-[var(--bg-main)]">
          <tr className="text-left text-xs uppercase tracking-wide text-[var(--text-muted)]">
            <th className="px-5 py-4 font-medium">Task</th>
            {isAdmin && <th className="px-5 py-4 font-medium">Assignee</th>}
            <th className="px-5 py-4 font-medium">Priority</th>
            <th className="px-5 py-4 font-medium">Status</th>
            <th className="px-5 py-4 font-medium">Due Date</th>
            <th className="px-5 py-4 text-right font-medium">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => {
            let overdue = isOverdue(task);

            return (
              <tr
                key={task._id}
                className="border-t border-[var(--border-color)] transition hover:bg-[var(--bg-hover)]/40"
              >
                {/* TITLE */}
                <td className="max-w-[340px] px-5 py-4">
                  <button
                    type="button"
                    onClick={() => onView(task)}
                    className="block max-w-full truncate text-left font-medium text-[var(--text-primary)] hover:text-[var(--tertiary)]"
                  >
                    {task.title}
                  </button>
                  {task.description && (
                    <p className="mt-1 truncate text-xs text-[var(--text-muted)]">
                      {task.description}
                    </p>
                  )}
                </td>

                {/* ASSIGNEE */}
                {isAdmin && (
                  <td className="max-w-[220px] px-5 py-4">
                    <AssigneeAvatar assignee={getAssignee(task, employees)} />
                  </td>
                )}

                {/* PRIORITY */}
                <td className="px-5 py-4">
                  <TaskPriorityBadge priority={task.priority} />
                </td>

                {/* STATUS */}
                <td className="px-5 py-4">
                  <TaskStatusSelect
                    status={task.status}
                    disabled={pendingStatusId === task._id}
                    onChange={(status) => onStatusChange(task, status)}
                  />
                </td>

                {/* DUE DATE */}
                <td className="px-5 py-4">
                  <span
                    className={`flex items-center gap-2 text-sm ${
                      overdue
                        ? "font-medium text-[var(--danger)]"
                        : "text-[var(--text-secondary)]"
                    }`}
                  >
                    <CalendarDays size={15} />
                    {formatDate(task.dueDate)}
                  </span>
                  {overdue && (
                    <span className="text-xs text-[var(--danger)]">Overdue</span>
                  )}
                </td>

                {/* ACTIONS */}
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <IconButton label="View details" onClick={() => onView(task)}>
                      <Eye size={17} />
                    </IconButton>

                    {isAdmin && (
                      <>
                        <IconButton
                          label="Reassign task"
                          onClick={() => onAssign(task)}
                        >
                          <UserPlus size={17} />
                        </IconButton>
                        <IconButton
                          label="Delete task"
                          danger
                          onClick={() => onDelete(task)}
                        >
                          <Trash2 size={17} />
                        </IconButton>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
