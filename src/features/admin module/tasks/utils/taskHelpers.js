import { TASK_PRIORITIES, TASK_STATUSES } from "../constants/taskConstants";

export const getStatusLabel = (status) =>
  TASK_STATUSES.find((item) => item.value === status)?.label || status;

export const getPriorityLabel = (priority) =>
  TASK_PRIORITIES.find((item) => item.value === priority)?.label || priority;

// assignedTo is populated in list/kanban responses but a plain id elsewhere
export const getAssignee = (task, employees = []) => {
  if (!task?.assignedTo) return null;
  if (typeof task.assignedTo === "object") return task.assignedTo;
  return employees.find((emp) => emp._id === task.assignedTo) || null;
};

export const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

export const formatDate = (date) => {
  if (!date) return "No due date";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const isOverdue = (task) => {
  if (!task?.dueDate || task.status === "completed") return false;
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(task.dueDate) < today;
};

export const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong";

// analytics returns counts as [{ count }] arrays, empty when the count is 0
export const parseAnalytics = (analytics) => {
  let countOf = (list) => list?.[0]?.count ?? 0;
  let byKey = (list = []) =>
    Object.fromEntries(list.map((item) => [item._id, item.count]));

  return {
    total: countOf(analytics?.totalTasks),
    completed: countOf(analytics?.completedTasks),
    pending: countOf(analytics?.pendingTasks),
    byStatus: byKey(analytics?.tasksByStatus),
    byPriority: byKey(analytics?.tasksByPriority),
  };
};
