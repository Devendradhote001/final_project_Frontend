// ============================================
// CREATE A NEW COMPONENT
// components/employees/EmployeeActions.jsx
// ============================================

import { useEffect, useRef, useState } from "react";

import { MoreVertical, Pencil, Trash2, UserX } from "lucide-react";

const EmployeeActions = ({ onEdit, onDelete, onInactive, employee }) => {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef();

  // CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-xl hover:bg-[var(--bg-hover)] flex items-center justify-center transition-all"
      >
        <MoreVertical size={20} className="text-[var(--text-muted)]" />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 top-12 w-52 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-xl p-2 z-50">
          {/* UPDATE */}
          <button
            onClick={() => {
              onEdit?.();
              setOpen(false);
            }}
            className="w-full h-12 px-4 rounded-xl flex items-center gap-3 hover:bg-[var(--bg-hover)] transition-all text-[var(--text-primary)]"
          >
            <Pencil size={18} />
            Update Employee
          </button>

          {employee.status === "active" ? (
            <button
              onClick={() => {
                onInactive?.();
                setOpen(false);
              }}
              className="w-full h-12 px-4 rounded-xl flex items-center gap-3 hover:bg-[var(--bg-hover)] transition-all text-orange-500"
            >
              <UserX size={18} />
              Mark Inactive
            </button>
          ) : (
            <button
              onClick={() => {
                onInactive?.();
                setOpen(false);
              }}
              className="w-full h-12 px-4 rounded-xl flex items-center gap-3 hover:bg-[var(--bg-hover)] transition-all text-orange-500"
            >
              <UserX size={18} />
              Mark Active
            </button>
          )}

          {/* DELETE */}
          <button
            onClick={() => {
              onDelete?.();
              setOpen(false);
            }}
            className="w-full h-12 px-4 rounded-xl flex items-center gap-3 hover:bg-red-50 transition-all text-red-500"
          >
            <Trash2 size={18} />
            Delete Employee
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeActions;
