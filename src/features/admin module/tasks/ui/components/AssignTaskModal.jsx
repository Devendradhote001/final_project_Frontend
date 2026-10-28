import { useState } from "react";
import { Search, UserPlus } from "lucide-react";
import TaskModal from "./TaskModal";
import { AssigneeAvatar } from "./TaskBadges";
import { inputClass } from "../../constants/taskConstants";
import { getAssignee, getErrorMessage } from "../../utils/taskHelpers";

const AssignTaskModal = ({ task, employees, assignTask, onClose, onAssigned }) => {
  let currentAssignee = getAssignee(task, employees);

  const [selected, setSelected] = useState(currentAssignee?._id || "");
  const [search, setSearch] = useState("");

  let filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAssign = () => {
    assignTask.mutate(
      { taskId: task._id, assignedTo: selected },
      { onSuccess: () => onAssigned(employees.find((e) => e._id === selected)) },
    );
  };

  return (
    <TaskModal
      title="Reassign Task"
      subtitle={task.title}
      icon={<UserPlus size={24} />}
      onClose={onClose}
      width="max-w-lg"
    >
      <div className="space-y-4 p-5 sm:p-6">
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] p-3">
          <p className="mb-2 text-xs font-medium text-[var(--text-muted)]">
            CURRENTLY ASSIGNED
          </p>
          <AssigneeAvatar assignee={currentAssignee} />
        </div>

        <div className="relative">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            type="search"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`${inputClass} pl-11`}
          />
        </div>

        <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
          {filteredEmployees.map((employee) => {
            let isSelected = selected === employee._id;

            return (
              <label
                key={employee._id}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                  isSelected
                    ? "border-[var(--tertiary)] bg-[var(--tertiary)]/10"
                    : "border-[var(--border-color)] hover:bg-[var(--bg-hover)]"
                }`}
              >
                <input
                  type="radio"
                  name="assignee"
                  checked={isSelected}
                  onChange={() => setSelected(employee._id)}
                  className="size-4 accent-[var(--tertiary)]"
                />
                <AssigneeAvatar assignee={employee} />
                {employee._id === currentAssignee?._id && (
                  <span className="ml-auto shrink-0 text-xs font-medium text-[var(--tertiary)]">
                    Current
                  </span>
                )}
              </label>
            );
          })}

          {!filteredEmployees.length && (
            <p className="py-6 text-center text-sm text-[var(--text-muted)]">
              No employees match "{search}".
            </p>
          )}
        </div>

        {assignTask.isError && (
          <p className="rounded-xl border border-[var(--danger)]/30 bg-[var(--danger)]/10 px-4 py-3 text-sm text-[var(--danger)]">
            {getErrorMessage(assignTask.error)}
          </p>
        )}

        <div className="flex flex-col-reverse gap-3 border-t border-[var(--border-color)] pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[var(--border-color)] px-5 py-3 text-sm font-medium transition hover:bg-[var(--bg-hover)]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAssign}
            disabled={
              !selected ||
              selected === currentAssignee?._id ||
              assignTask.isPending
            }
            className="flex items-center justify-center gap-2 rounded-xl bg-[var(--tertiary)] px-6 py-3 text-sm font-semibold text-[var(--bg-surface)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <UserPlus size={18} />
            {assignTask.isPending ? "Assigning..." : "Assign Task"}
          </button>
        </div>
      </div>
    </TaskModal>
  );
};

export default AssignTaskModal;
