import { ChevronDown, RotateCcw, Search } from "lucide-react";
import {
  TASK_PRIORITIES,
  TASK_STATUSES,
  inputClass,
} from "../../constants/taskConstants";

const FilterSelect = ({ value, onChange, children }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputClass} min-w-[170px] appearance-none pr-10`}
    >
      {children}
    </select>
    <ChevronDown
      size={16}
      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
    />
  </div>
);

const TaskFilters = ({
  filters,
  onFilterChange,
  onReset,
  isAdmin,
  employees,
}) => {
  let hasFilters = Object.values(filters).some(Boolean);

  return (
    <div className="flex flex-col gap-4 border-b border-[var(--border-color)] p-5 xl:flex-row xl:items-center">
      {/* SEARCH */}
      <div className="relative w-full xl:max-w-[360px]">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
        />
        <input
          type="search"
          placeholder="Search tasks by title..."
          value={filters.search}
          onChange={(e) => onFilterChange("search", e.target.value)}
          className={`${inputClass} pl-11`}
        />
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap items-center gap-3">
        <FilterSelect
          value={filters.status}
          onChange={(value) => onFilterChange("status", value)}
        >
          <option value="">All Status</option>
          {TASK_STATUSES.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect
          value={filters.priority}
          onChange={(value) => onFilterChange("priority", value)}
        >
          <option value="">All Priorities</option>
          {TASK_PRIORITIES.map((priority) => (
            <option key={priority.value} value={priority.value}>
              {priority.label}
            </option>
          ))}
        </FilterSelect>

        {isAdmin && (
          <FilterSelect
            value={filters.assignedTo}
            onChange={(value) => onFilterChange("assignedTo", value)}
          >
            <option value="">All Assignees</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.name}
              </option>
            ))}
          </FilterSelect>
        )}

        {hasFilters && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-[var(--text-muted)] transition hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
          >
            <RotateCcw size={15} />
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskFilters;
