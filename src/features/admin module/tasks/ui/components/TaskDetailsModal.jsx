import {
  CalendarDays,
  ClipboardList,
  Clock,
  Trash2,
  UserPlus,
  UserRound,
} from "lucide-react";
import TaskModal from "./TaskModal";
import TaskStatusSelect from "./TaskStatusSelect";
import { AssigneeAvatar, TaskPriorityBadge } from "./TaskBadges";
import { useTaskDetails } from "../../hooks/useTasks";
import {
  formatDate,
  getAssignee,
  getErrorMessage,
  isOverdue,
} from "../../utils/taskHelpers";

const DetailRow = ({ icon, label, children }) => (
  <div className="flex items-start gap-3">
    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--bg-card)] text-[var(--tertiary)]">
      {icon}
    </div>
    <div className="min-w-0 flex-1">
      <p className="mb-1 text-xs text-[var(--text-muted)]">{label}</p>
      {children}
    </div>
  </div>
);

const TaskDetailsModal = ({
  task: listTask,
  isAdmin,
  employees,
  isUpdatingStatus,
  onClose,
  onStatusChange,
  onAssign,
  onDelete,
}) => {
  let { data, isPending, isError, error } = useTaskDetails(listTask._id);

  // single-task api returns ids, the list row has populated users — merge both
  let task = { ...listTask, ...(data || {}) };
  let assignee = getAssignee(task, employees) || getAssignee(listTask, employees);
  let createdBy =
    typeof listTask.createdBy === "object" ? listTask.createdBy : null;
  let overdue = isOverdue(task);

  return (
    <TaskModal
      title="Task Details"
      subtitle={isPending ? "Loading latest details..." : undefined}
      icon={<ClipboardList size={24} />}
      onClose={onClose}
    >
      <div className="space-y-6 p-5 sm:p-6">
        {isError && (
          <p className="rounded-xl border border-[var(--danger)]/30 bg-[var(--danger)]/10 px-4 py-3 text-sm text-[var(--danger)]">
            {getErrorMessage(error)}
          </p>
        )}

        {!isPending && !isError && data === null ? (
          <p className="py-10 text-center text-sm text-[var(--text-muted)]">
            This task no longer exists.
          </p>
        ) : (
          <>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <TaskPriorityBadge priority={task.priority} />
                <TaskStatusSelect
                  status={task.status}
                  disabled={isUpdatingStatus}
                  onChange={(status) => onStatusChange(task, status)}
                />
              </div>

              <h2 className="mt-4 break-words text-xl font-bold">{task.title}</h2>
              <p className="mt-2 whitespace-pre-line break-words text-sm leading-6 text-[var(--text-muted)]">
                {task.description || "No description provided."}
              </p>
            </div>

            <div className="h-px bg-[var(--border-color)]" />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <DetailRow icon={<UserRound size={18} />} label="Assigned To">
                <AssigneeAvatar assignee={assignee} size="sm" />
              </DetailRow>

              <DetailRow icon={<UserPlus size={18} />} label="Created By">
                {createdBy ? (
                  <AssigneeAvatar assignee={createdBy} size="sm" />
                ) : (
                  <p className="text-sm text-[var(--text-muted)]">—</p>
                )}
              </DetailRow>

              <DetailRow icon={<CalendarDays size={18} />} label="Due Date">
                <p
                  className={`text-sm font-medium ${
                    overdue ? "text-[var(--danger)]" : ""
                  }`}
                >
                  {formatDate(task.dueDate)}
                  {overdue && " · Overdue"}
                </p>
              </DetailRow>

              <DetailRow icon={<Clock size={18} />} label="Created On">
                <p className="text-sm font-medium">
                  {task.createdAt ? formatDate(task.createdAt) : "—"}
                </p>
              </DetailRow>
            </div>

            {isAdmin && (
              <div className="flex flex-col-reverse gap-3 border-t border-[var(--border-color)] pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => onDelete(task)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-[var(--danger)]/40 px-5 py-3 text-sm font-medium text-[var(--danger)] transition hover:bg-[var(--danger)]/10"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => onAssign(listTask)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[var(--tertiary)] px-6 py-3 text-sm font-semibold text-[var(--bg-surface)] transition hover:brightness-110"
                >
                  <UserPlus size={18} />
                  Reassign
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </TaskModal>
  );
};

export default TaskDetailsModal;
