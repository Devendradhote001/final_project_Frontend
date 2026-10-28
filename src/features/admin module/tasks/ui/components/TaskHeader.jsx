import { KanbanSquare, List, Plus } from "lucide-react";

const VIEWS = [
  { value: "list", label: "List", icon: <List size={16} /> },
  { value: "board", label: "Board", icon: <KanbanSquare size={16} /> },
];

const TaskHeader = ({ isAdmin, view, onViewChange, onCreate }) => {
  return (
    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
      <div>
        <div className="mb-2 flex items-center gap-2 text-sm text-[var(--text-muted)]">
          <span>{isAdmin ? "Admin" : "Workspace"}</span>
          <span>/</span>
          <span className="text-[var(--tertiary)]">
            {isAdmin ? "Tasks" : "My Tasks"}
          </span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {isAdmin ? "Task Management" : "My Tasks"}
        </h1>

        <p className="mt-2 text-sm text-[var(--text-muted)]">
          {isAdmin
            ? "Create, assign and track work across your organization."
            : "Track the work assigned to you and keep its status up to date."}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* VIEW TOGGLE */}
        <div className="flex rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-1">
          {VIEWS.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => onViewChange(item.value)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                view === item.value
                  ? "bg-[var(--tertiary)]/15 text-[var(--tertiary)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        {isAdmin && (
          <button
            type="button"
            onClick={onCreate}
            className="flex items-center justify-center gap-2 rounded-xl bg-[var(--tertiary)] px-5 py-3 text-sm font-semibold text-[var(--bg-surface)] transition hover:brightness-110"
          >
            <Plus size={18} />
            Create Task
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskHeader;
