import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ pagination, onPageChange }) => {
  const { page, totalPages, total, limit } = pagination;

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="flex items-center justify-between px-6 py-5 border-t border-[var(--border-color)] bg-[var(--bg-surface)]">
      {/* LEFT */}
      <div className="text-sm text-[var(--text-secondary)]">
        Showing{" "}
        <span className="font-semibold text-[var(--text-primary)]">
          {start}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-[var(--text-primary)]">{end}</span>{" "}
        of{" "}
        <span className="font-semibold text-[var(--text-primary)]">
          {total}
        </span>{" "}
        employees
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        {/* PREV */}
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all
            ${
              page === 1
                ? "opacity-40 cursor-not-allowed border-[var(--border-color)]"
                : "border-[var(--border-color)] hover:bg-[var(--bg-hover)]"
            }`}
        >
          <ChevronLeft size={18} />
        </button>

        {/* PAGE NUMBERS */}
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;

          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`w-11 h-11 rounded-xl font-medium transition-all
                ${
                  page === pageNumber
                    ? "bg-[var(--primary)] text-white"
                    : "border border-[var(--border-color)] hover:bg-[var(--bg-hover)] text-[var(--text-primary)]"
                }`}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* NEXT */}
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all
            ${
              page === totalPages
                ? "opacity-40 cursor-not-allowed border-[var(--border-color)]"
                : "border-[var(--border-color)] hover:bg-[var(--bg-hover)]"
            }`}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
