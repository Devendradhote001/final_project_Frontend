import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  assignTaskApi,
  createTaskApi,
  deleteTaskApi,
  getAllTasksApi,
  getKanbanTasksApi,
  getTaskAnalyticsApi,
  getTaskByIdApi,
  updateTaskStatusApi,
} from "../api/taskApi";
import { getAllEmployees } from "../../employees/api/employeeApis";
import { TASK_LIST_LIMIT, TASK_STATUSES } from "../constants/taskConstants";

const KANBAN_KEY = ["tasks", "kanban"];

export const useTaskList = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    assignedTo: "",
  });
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // wait for the user to stop typing before hitting the api
  useEffect(() => {
    let timer = setTimeout(() => setDebouncedSearch(filters.search), 400);
    return () => clearTimeout(timer);
  }, [filters.search]);

  let queryFilters = { ...filters, search: debouncedSearch };

  let { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: ["tasks", "list", page, queryFilters],
    queryFn: () =>
      getAllTasksApi({ page, limit: TASK_LIST_LIMIT, ...queryFilters }),
    placeholderData: (prev) => prev,
  });

  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    if (newPage > data?.pagination?.totalPages) return;
    setPage(newPage);
  };

  const handleFilterChange = (name, value) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setPage(1);
    setFilters({ search: "", status: "", priority: "", assignedTo: "" });
  };

  return {
    data,
    isPending,
    isFetching,
    isError,
    error,
    filters,
    handleFilterChange,
    handlePageChange,
    resetFilters,
  };
};

export const useKanbanTasks = (enabled = true) =>
  useQuery({
    queryKey: KANBAN_KEY,
    queryFn: getKanbanTasksApi,
    enabled,
  });

export const useTaskAnalytics = () =>
  useQuery({
    queryKey: ["tasks", "analytics"],
    queryFn: getTaskAnalyticsApi,
  });

export const useTaskDetails = (taskId) =>
  useQuery({
    queryKey: ["tasks", "detail", taskId],
    queryFn: () => getTaskByIdApi(taskId),
    enabled: Boolean(taskId),
  });

// employees to pick from when creating / assigning a task (admin only)
export const useAssignableEmployees = (enabled = true) =>
  useQuery({
    queryKey: ["employees", "assignable"],
    queryFn: () => getAllEmployees({ page: 1, limit: 100, status: "active" }),
    enabled,
    staleTime: 100000,
  });

export const useTaskMutations = () => {
  let queryClient = useQueryClient();

  const invalidateTasks = () =>
    queryClient.invalidateQueries({ queryKey: ["tasks"] });

  let createTask = useMutation({
    mutationFn: createTaskApi,
    onSuccess: invalidateTasks,
  });

  let updateStatus = useMutation({
    mutationFn: updateTaskStatusApi,
    // move the card on the board right away, roll back if the api fails
    onMutate: async ({ taskId, status }) => {
      await queryClient.cancelQueries({ queryKey: KANBAN_KEY });
      let previous = queryClient.getQueryData(KANBAN_KEY);

      if (previous) {
        let movedTask;
        let next = {};

        for (let [column, tasks] of Object.entries(previous)) {
          next[column] = (tasks || []).filter((task) => {
            if (task._id === taskId) {
              movedTask = task;
              return false;
            }
            return true;
          });
        }

        let target = TASK_STATUSES.find((s) => s.value === status)?.column;
        if (movedTask && target) {
          next[target] = [{ ...movedTask, status }, ...(next[target] || [])];
        }

        queryClient.setQueryData(KANBAN_KEY, next);
      }

      return { previous };
    },
    onError: (_error, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(KANBAN_KEY, context.previous);
      }
    },
    onSettled: invalidateTasks,
  });

  let assignTask = useMutation({
    mutationFn: assignTaskApi,
    onSuccess: invalidateTasks,
  });

  let deleteTask = useMutation({
    mutationFn: deleteTaskApi,
    onSuccess: invalidateTasks,
  });

  return { createTask, updateStatus, assignTask, deleteTask };
};
