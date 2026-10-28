import { CheckCircle2, CircleDashed, ClipboardList, Flame } from "lucide-react";
import { parseAnalytics } from "../../utils/taskHelpers";

const StatTile = ({ title, value, icon, hint, accent }) => (
  <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
    <div className="flex items-center justify-between">
      <div
        className={`flex size-11 items-center justify-center rounded-xl ${accent}`}
      >
        {icon}
      </div>
      {hint && (
        <span className="text-xs font-medium text-[var(--text-muted)]">
          {hint}
        </span>
      )}
    </div>

    <p className="mt-5 text-sm text-[var(--text-muted)]">{title}</p>
    <p className="mt-1 text-3xl font-bold text-[var(--text-primary)]">{value}</p>
  </div>
);

const TaskStats = ({ analytics, isPending }) => {
  if (isPending) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="h-[150px] animate-pulse rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)]"
          />
        ))}
      </div>
    );
  }

  let { total, completed, pending, byStatus, byPriority } =
    parseAnalytics(analytics);
  let completion = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          title="Total Tasks"
          value={total}
          icon={<ClipboardList size={22} />}
          accent="bg-[var(--tertiary)]/15 text-[var(--tertiary)]"
        />
        <StatTile
          title="Pending"
          value={pending}
          hint={`${byStatus["in-progress"] || 0} in progress`}
          icon={<CircleDashed size={22} />}
          accent="bg-[var(--warning)]/15 text-[var(--warning)]"
        />
        <StatTile
          title="Completed"
          value={completed}
          hint={`${completion}% done`}
          icon={<CheckCircle2 size={22} />}
          accent="bg-[var(--success)]/15 text-[var(--success)]"
        />
        <StatTile
          title="High Priority"
          value={byPriority.high || 0}
          hint={`${byPriority.medium || 0} medium · ${byPriority.low || 0} low`}
          icon={<Flame size={22} />}
          accent="bg-[var(--danger)]/15 text-[var(--danger)]"
        />
      </div>

      {/* PROGRESS */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-medium">Overall progress</span>
          <span className="text-[var(--text-muted)]">
            {completed} of {total} tasks completed
          </span>
        </div>

        <div className="flex h-2.5 overflow-hidden rounded-full bg-[var(--bg-main)]">
          {total > 0 && (
            <>
              <div
                className="bg-[var(--success)]"
                style={{ width: `${((byStatus.completed || 0) / total) * 100}%` }}
              />
              <div
                className="bg-[var(--tertiary)]"
                style={{
                  width: `${((byStatus["in-progress"] || 0) / total) * 100}%`,
                }}
              />
            </>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-5 text-xs text-[var(--text-muted)]">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[var(--success)]" />
            Completed {byStatus.completed || 0}
          </span>
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[var(--tertiary)]" />
            In Progress {byStatus["in-progress"] || 0}
          </span>
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[var(--bg-card)]" />
            To Do {byStatus.todo || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;
