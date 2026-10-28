export const TASK_STATUSES = [
  { value: "todo", label: "To Do", column: "todo" },
  { value: "in-progress", label: "In Progress", column: "inProgress" },
  { value: "completed", label: "Completed", column: "completed" },
];

export const TASK_PRIORITIES = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const STATUS_STYLES = {
  todo: "bg-[var(--bg-card)] text-[var(--text-secondary)]",
  "in-progress": "bg-[var(--tertiary)]/15 text-[var(--tertiary)]",
  completed: "bg-[var(--success)]/15 text-[var(--success)]",
};

export const PRIORITY_STYLES = {
  low: "bg-[var(--success)]/10 text-[var(--success)]",
  medium: "bg-[var(--warning)]/15 text-[var(--warning)]",
  high: "bg-[var(--danger)]/15 text-[var(--danger)]",
};

export const TASK_LIST_LIMIT = 10;

export const inputClass =
  "w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition focus:border-[var(--tertiary)] focus:ring-2 focus:ring-[var(--tertiary)]/20";

export const labelClass =
  "mb-2 block text-sm font-medium text-[var(--text-secondary)]";
