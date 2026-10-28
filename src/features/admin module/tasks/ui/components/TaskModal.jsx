import { useEffect } from "react";
import { X } from "lucide-react";

const TaskModal = ({ title, subtitle, icon, onClose, children, width = "max-w-2xl" }) => {
  // close on escape
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={`flex max-h-[90vh] w-full ${width} flex-col overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-[var(--shadow-md)]`}
      >
        {/* HEADER */}
        <div className="flex items-center gap-4 border-b border-[var(--border-color)] p-5 sm:p-6">
          {icon && (
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[var(--tertiary)]/15 text-[var(--tertiary)]">
              {icon}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-lg font-semibold">{title}</h2>
            {subtitle && (
              <p className="mt-1 text-sm text-[var(--text-muted)]">{subtitle}</p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-10 items-center justify-center rounded-xl text-[var(--text-muted)] transition hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default TaskModal;
