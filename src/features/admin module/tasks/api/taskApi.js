import { axiosInstance } from "../../../../config/axiosInstance";

// drop empty filters so the backend doesn't receive `status=` etc.
const cleanParams = (params) =>
  Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== "" && value !== null && value !== undefined,
    ),
  );

export const getAllTasksApi = async ({
  page = 1,
  limit = 10,
  search = "",
  status = "",
  priority = "",
  assignedTo = "",
} = {}) => {
  let res = await axiosInstance.get("/tasks", {
    params: cleanParams({ page, limit, search, status, priority, assignedTo }),
  });
  return res.data.data;
};

export const getKanbanTasksApi = async () => {
  let res = await axiosInstance.get("/tasks/kanban");
  return res.data.data;
};

export const getTaskAnalyticsApi = async () => {
  let res = await axiosInstance.get("/tasks/analytics");
  return res.data.data;
};

export const getTaskByIdApi = async (taskId) => {
  let res = await axiosInstance.get(`/tasks/${taskId}`);
  return res.data.data;
};

export const createTaskApi = async (data) => {
  let res = await axiosInstance.post("/tasks/create", cleanParams(data));
  return res.data.data;
};

export const updateTaskStatusApi = async ({ taskId, status }) => {
  let res = await axiosInstance.patch(`/tasks/status/${taskId}`, { status });
  return res.data.data;
};

export const assignTaskApi = async ({ taskId, assignedTo }) => {
  let res = await axiosInstance.patch(`/tasks/assign/${taskId}`, {
    assignedTo,
  });
  return res.data.data;
};

export const deleteTaskApi = async (taskId) => {
  let res = await axiosInstance.delete(`/tasks/delete/${taskId}`);
  return res.data;
};
