import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AlertCircle, CheckCircle2, Loader2, X } from "lucide-react";
import {
  useAssignableEmployees,
  useKanbanTasks,
  useTaskAnalytics,
  useTaskList,
  useTaskMutations,
} from "../../hooks/useTasks";
import { getErrorMessage, getStatusLabel } from "../../utils/taskHelpers";
import TaskHeader from "./TaskHeader";
import TaskStats from "./TaskStats";
import TaskFilters from "./TaskFilters";
import TaskTable from "./TaskTable";
import TaskPagination from "./TaskPagination";
import KanbanBoard from "./KanbanBoard";
import CreateTaskModal from "./CreateTaskModal";
import AssignTaskModal from "./AssignTaskModal";
import TaskDetailsModal from "./TaskDetailsModal";

const Toast = ({ toast, onClose }) => {
  if (!toast) return null;
  let isError = toast.type === "error";

  return (
    <div
      role="status"
      className={`fixed bottom-6 right-6 z-[60] flex max-w-sm items-center gap-3 rounded-xl border bg-[var(--bg-surface)] px-4 py-3 text-sm shadow-[var(--shadow-md)] ${
        isError ? "border-[var(--danger)]/40" : "border-[var(--success)]/40"
      }`}
    >
      {isError ? (
        <AlertCircle size={18} className="shrink-0 text-[var(--danger)]" />
      ) : (
        <CheckCircle2 size={18} className="shrink-0 text-[var(--success)]" />
      )}
      <span className="text-[var(--text-primary)]">{toast.message}</span>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={onClose}
        className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
      >
        <X size={16} />
      </button>
    </div>
  );
};

// shared by the admin Task page and the employee MyTask page —
// the backend already scopes tasks to the logged in employee
const TaskWorkspace = () => {
  let { employee } = useSelector((store) => store.auth);
  let isAdmin = employee?.role === "admin";

  const [view, setView] = useState("list");
  const [showCreate, setShowCreate] = useState(false);
  const [assigningTask, setAssigningTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);
  const [toast, setToast] = useState(null);

  let list = useTaskList();
  let analytics = useTaskAnalytics();
  let kanban = useKanbanTasks(view === "board");
  let employeesQuery = useAssignableEmployees(isAdmin);
  let { createTask, updateStatus, assignTask, deleteTask } = useTaskMutations();

  let employees = employeesQuery.data?.employees || [];

  useEffect(() => {
    if (!toast) return;
    let timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const notify = (type, message) => setToast({ type, message, id: Date.now() });

  const handleStatusChange = (task, status) => {
    if (task.status === status) return;

    updateStatus.mutate(
      { taskId: task._id, status },
      {
        onSuccess: () =>
          notify("success", `"${task.title}" moved to ${getStatusLabel(status)}`),
        onError: (error) => notify("error", getErrorMessage(error)),
      },
    );
  };

  const handleDelete = (task) => {
    if (!window.confirm(`Delete "${task.title}"? This cannot be undone.`)) return;

    deleteTask.mutate(task._id, {
      onSuccess: () => {
        setViewingTask(null);
        notify("success", "Task deleted");
      },
      onError: (error) => notify("error", getErrorMessage(error)),
    });
  };

  const openCreate = () => {
    createTask.reset();
    setShowCreate(true);
  };

  const openAssign = (task) => {
    assignTask.reset();
    setViewingTask(null);
    setAssigningTask(task);
  };

  let pendingStatusId = updateStatus.isPending
    ? updateStatus.variables?.taskId
    : null;

  return (
    <div className="min-h-full bg-[var(--bg-main)] p-4 text-[var(--text-primary)] transition-colors duration-300 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-7">
        {/* HEADER */}
        <TaskHeader
          isAdmin={isAdmin}
          view={view}
          onViewChange={setView}
          onCreate={openCreate}
        />

        {/* ANALYTICS */}
        <TaskStats analytics={analytics.data} isPending={analytics.isPending} />

        {/* LIST VIEW */}
        {view === "list" && (
          <section className="overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-[var(--shadow-md)]">
            <TaskFilters
              filters={list.filters}
              onFilterChange={list.handleFilterChange}
              onReset={list.resetFilters}
              isAdmin={isAdmin}
              employees={employees}
            />

            {list.isFetching && !list.isPending && (
              <div className="flex items-center gap-2 border-b border-[var(--border-color)] px-5 py-2 text-xs text-[var(--text-muted)]">
                <Loader2 size={14} className="animate-spin" />
                Refreshing tasks...
              </div>
            )}

            {list.isPending ? (
              <div className="space-y-3 p-5">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="h-14 animate-pulse rounded-xl bg-[var(--bg-main)]"
                  />
                ))}
              </div>
            ) : list.isError ? (
              <div className="flex items-center gap-3 p-6 text-sm text-[var(--danger)]">
                <AlertCircle size={18} />
                {getErrorMessage(list.error)}
              </div>
            ) : (
              <>
                <TaskTable
                  tasks={list.data?.tasks}
                  isAdmin={isAdmin}
                  employees={employees}
                  pendingStatusId={pendingStatusId}
                  onView={setViewingTask}
                  onAssign={openAssign}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                />
                <TaskPagination
                  pagination={list.data?.pagination}
                  onPageChange={list.handlePageChange}
                />
              </>
            )}
          </section>
        )}

        {/* BOARD VIEW */}
        {view === "board" &&
          (kanban.isError ? (
            <div className="flex items-center gap-3 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 text-sm text-[var(--danger)]">
              <AlertCircle size={18} />
              {getErrorMessage(kanban.error)}
            </div>
          ) : (
            <KanbanBoard
              board={kanban.data}
              isPending={kanban.isPending}
              employees={employees}
              onView={setViewingTask}
              onStatusChange={handleStatusChange}
            />
          ))}
      </div>

      {/* MODALS */}
      {showCreate && isAdmin && (
        <CreateTaskModal
          employees={employees}
          isLoadingEmployees={employeesQuery.isPending}
          createTask={createTask}
          onClose={() => setShowCreate(false)}
          onCreated={(task) => {
            setShowCreate(false);
            notify("success", `Task "${task?.title || ""}" created`);
          }}
        />
      )}

      {assigningTask && isAdmin && (
        <AssignTaskModal
          task={assigningTask}
          employees={employees}
          assignTask={assignTask}
          onClose={() => setAssigningTask(null)}
          onAssigned={(assignee) => {
            setAssigningTask(null);
            notify("success", `Task assigned to ${assignee?.name || "employee"}`);
          }}
        />
      )}

      {viewingTask && (
        <TaskDetailsModal
          task={viewingTask}
          isAdmin={isAdmin}
          employees={employees}
          isUpdatingStatus={pendingStatusId === viewingTask._id}
          onClose={() => setViewingTask(null)}
          onStatusChange={handleStatusChange}
          onAssign={openAssign}
          onDelete={handleDelete}
        />
      )}

      <Toast key={toast?.id} toast={toast} onClose={() => setToast(null)} />
    </div>
  );
};

export default TaskWorkspace;
