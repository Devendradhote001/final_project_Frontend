import { ChevronDown } from "lucide-react";
import { STATUS_STYLES, TASK_STATUSES } from "../../constants/taskConstants";

// inline status changer, styled like the status badge
const TaskStatusSelect = ({ status, onChange, disabled }) => (
  <div className="relative inline-flex">
    <select
      value={status}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className={`cursor-pointer appearance-none rounded-full py-1.5 pl-3 pr-8 text-xs font-semibold outline-none transition disabled:cursor-wait disabled:opacity-60 ${
        STATUS_STYLES[status] || STATUS_STYLES.todo
      }`}
    >
      {TASK_STATUSES.map((item) => (
        <option
          key={item.value}
          value={item.value}
          className="bg-[var(--bg-surface)] text-[var(--text-primary)]"
        >
          {item.label}
        </option>
      ))}
    </select>
    <ChevronDown
      size={14}
      className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 opacity-70"
    />
  </div>
);

export default TaskStatusSelect;
