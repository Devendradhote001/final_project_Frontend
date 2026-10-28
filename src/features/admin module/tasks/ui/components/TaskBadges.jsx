import { Flag } from "lucide-react";
import { PRIORITY_STYLES, STATUS_STYLES } from "../../constants/taskConstants";
import {
  getInitials,
  getPriorityLabel,
  getStatusLabel,
} from "../../utils/taskHelpers";

export const TaskStatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
      STATUS_STYLES[status] || STATUS_STYLES.todo
    }`}
  >
    <span className="size-1.5 rounded-full bg-current" />
    {getStatusLabel(status)}
  </span>
);

export const TaskPriorityBadge = ({ priority }) => {
  if (!priority) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        PRIORITY_STYLES[priority] || PRIORITY_STYLES.medium
      }`}
    >
      <Flag size={12} />
      {getPriorityLabel(priority)}
    </span>
  );
};

export const AssigneeAvatar = ({ assignee, size = "md", showName = true }) => {
  let sizes = { sm: "size-7 text-[10px]", md: "size-9 text-xs" };

  if (!assignee) {
    return (
      <span className="text-sm text-[var(--text-muted)]">Unassigned</span>
    );
  }

  return (
    <div className="flex min-w-0 items-center gap-3">
      {assignee.avatar ? (
        <img
          src={assignee.avatar}
          alt=""
          className={`${sizes[size]} shrink-0 rounded-full object-cover`}
        />
      ) : (
        <div
          className={`${sizes[size]} flex shrink-0 items-center justify-center rounded-full bg-[var(--tertiary)]/15 font-semibold text-[var(--tertiary)]`}
        >
          {getInitials(assignee.name)}
        </div>
      )}

      {showName && (
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-[var(--text-primary)]">
            {assignee.name}
          </p>
          {assignee.email && (
            <p className="truncate text-xs text-[var(--text-muted)]">
              {assignee.email}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
