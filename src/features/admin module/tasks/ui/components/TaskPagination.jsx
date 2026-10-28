import { ChevronLeft, ChevronRight } from "lucide-react";

const TaskPagination = ({ pagination, onPageChange }) => {
  if (!pagination?.total) return null;

  const { page, totalPages, total, limit } = pagination;
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  const navButton =
    "flex size-10 items-center justify-center rounded-xl border border-[var(--border-color)] transition hover:bg-[var(--bg-hover)] disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--border-color)] px-5 py-4 sm:flex-row">
      <p className="text-sm text-[var(--text-muted)]">
        Showing{" "}
        <span className="font-semibold text-[var(--text-primary)]">{start}</span>{" "}
        to <span className="font-semibold text-[var(--text-primary)]">{end}</span>{" "}
        of{" "}
        <span className="font-semibold text-[var(--text-primary)]">{total}</span>{" "}
        tasks
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className={navButton}
        >
          <ChevronLeft size={18} />
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;

          return (
            <button
              key={pageNumber}
              type="button"
              onClick={() => onPageChange(pageNumber)}
              className={`size-10 rounded-xl text-sm font-medium transition ${
                page === pageNumber
                  ? "bg-[var(--tertiary)] text-[var(--bg-surface)]"
                  : "border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          type="button"
          aria-label="Next page"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className={navButton}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default TaskPagination;
