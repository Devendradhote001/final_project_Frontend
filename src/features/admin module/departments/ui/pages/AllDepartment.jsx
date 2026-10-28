import React, { useMemo, useState } from "react";
import { useDepartment } from "../../hooks/useDepartment";
import {
  Building2,
  Search,
  Users,
  UserRound,
  CalendarDays,
  Pencil,
  Trash2,
  ArrowUpRight,
  RefreshCw,
  Plus,
  Mail,
  X,
} from "lucide-react";

const AllDepartment = () => {
  const { data, isPending, navigate } = useDepartment();

  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [deleteDepartment, setDeleteDepartment] = useState(null);

  const departments = Array.isArray(data?.data) ? data.data : [];

  const filteredDepartments = useMemo(() => {
    const query = search.toLowerCase().trim();

    return departments.filter((department) => {
      const name = department.name || "";
      const description = department.description || "";
      const managerName = department.manager?.name || "";

      return (
        name.toLowerCase().includes(query) ||
        description.toLowerCase().includes(query) ||
        managerName.toLowerCase().includes(query)
      );
    });
  }, [departments, search]);

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getInitials = (name = "") =>
    name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const cardClass =
    "rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-[var(--shadow-md)]";

  const buttonClass =
    "flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition";

  if (isPending) {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] p-6 text-[var(--text-primary)]">
        <div className="mx-auto max-w-7xl">
          <div className="h-8 w-64 animate-pulse rounded-lg bg-[var(--bg-card)]" />
          <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded bg-[var(--bg-card)]" />

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className={`${cardClass} animate-pulse p-5`}>
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-xl bg-[var(--bg-card)]" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 rounded bg-[var(--bg-card)]" />
                    <div className="h-3 w-24 rounded bg-[var(--bg-card)]" />
                  </div>
                </div>
                <div className="mt-6 h-3 rounded bg-[var(--bg-card)]" />
                <div className="mt-3 h-3 w-2/3 rounded bg-[var(--bg-card)]" />
                <div className="mt-6 h-16 rounded-xl bg-[var(--bg-card)]" />
                <div className="mt-5 flex gap-3">
                  <div className="h-10 flex-1 rounded-xl bg-[var(--bg-card)]" />
                  <div className="h-10 flex-1 rounded-xl bg-[var(--bg-card)]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-main)] p-4 text-[var(--text-primary)] transition-colors duration-300 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-7">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <span>Admin</span>
              <span>/</span>
              <span className="text-[var(--tertiary)]">Departments</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              All Departments
            </h1>

            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Manage departments, assigned managers, and team members.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/home/department")}
            className={`${buttonClass} bg-[var(--tertiary)] px-5 py-3 font-semibold text-[var(--primary)] hover:brightness-110`}
          >
            <Plus size={18} />
            Add Department
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className={`${cardClass} flex items-center gap-4 p-5`}>
            <div className="flex size-12 items-center justify-center rounded-xl bg-[var(--tertiary)]/15 text-[var(--tertiary)]">
              <Building2 size={23} />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)]">
                Total Departments
              </p>
              <h2 className="mt-1 text-2xl font-bold">
                {departments.length.toString().padStart(2, "0")}
              </h2>
            </div>
          </div>

          <div className={`${cardClass} flex items-center gap-4 p-5`}>
            <div className="flex size-12 items-center justify-center rounded-xl bg-[var(--success)]/10 text-[var(--success)]">
              <Users size={23} />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)]">
                Assigned Employees
              </p>
              <h2 className="mt-1 text-2xl font-bold">
                {departments.reduce(
                  (total, department) =>
                    total + (department.employees?.length || 0),
                  0,
                )}
              </h2>
            </div>
          </div>

          <div className={`${cardClass} flex items-center gap-4 p-5`}>
            <div className="flex size-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <UserRound size={23} />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)]">
                Assigned Managers
              </p>
              <h2 className="mt-1 text-2xl font-bold">
                {
                  new Set(
                    departments
                      .map((department) => department.manager?._id)
                      .filter(Boolean),
                  ).size
                }
              </h2>
            </div>
          </div>
        </div>

        {/* Search and Results */}
        <section className={cardClass}>
          <div className="flex flex-col justify-between gap-4 border-b border-[var(--border-color)] p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold">Department Directory</h2>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Browse and manage your organization.
              </p>
            </div>

            <div className="relative w-full sm:max-w-sm">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search departments..."
                className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] py-3 pl-10 pr-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--tertiary)]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 px-5 pt-5">
            <p className="text-sm text-[var(--text-muted)]">
              Showing{" "}
              <span className="font-semibold text-[var(--text-primary)]">
                {filteredDepartments.length}
              </span>{" "}
              departments
            </p>

            <button
              type="button"
              onClick={() => setSearch("")}
              className="flex items-center gap-2 text-xs text-[var(--text-muted)] transition hover:text-[var(--tertiary)]"
            >
              <RefreshCw size={14} />
              Clear search
            </button>
          </div>

          {/* Department Cards */}
          <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 2xl:grid-cols-3">
            {filteredDepartments.map((department, index) => (
              <article
                key={department._id}
                className="group flex min-w-0 flex-col rounded-2xl border border-[var(--border-color)] bg-[var(--bg-main)] p-5 transition duration-200 hover:-translate-y-1 hover:border-[var(--tertiary)]/60 hover:shadow-[var(--shadow-md)]"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[var(--tertiary)]/15 text-[var(--tertiary)] transition group-hover:bg-[var(--tertiary)]/25">
                      <Building2 size={23} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-semibold">
                        {department.name}
                      </h3>
                      <p className="mt-1 text-xs text-[var(--text-muted)]">
                        Department #{index + 1}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] px-2.5 py-1 text-xs text-[var(--text-secondary)]">
                    {department.employees?.length || 0} members
                  </span>
                </div>

                {/* Description */}
                <p className="mt-5 min-h-[60px] text-sm leading-6 text-[var(--text-muted)]">
                  {department.description ||
                    "No description provided for this department."}
                </p>

                {/* Manager */}
                <div className="mt-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-3">
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                    Department Manager
                  </p>

                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--tertiary)]/15 text-sm font-semibold text-[var(--tertiary)]">
                      {getInitials(department.manager?.name || "NA")}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {department.manager?.name || "Not assigned"}
                      </p>

                      <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-[var(--text-muted)]">
                        <Mail size={12} className="shrink-0" />
                        {department.manager?.email || "No email available"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="mt-4 flex items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={14} />
                    Created {formatDate(department.createdAt)}
                  </span>

                  <span className="flex items-center gap-1 text-[var(--success)]">
                    <span className="size-1.5 rounded-full bg-[var(--success)]" />
                    Active
                  </span>
                </div>

                {/* Actions: UI only */}
                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[var(--border-color)] pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedDepartment(department)}
                    className={`${buttonClass} border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--tertiary)] hover:bg-[var(--tertiary)]/10 hover:text-[var(--tertiary)]`}
                  >
                    <Pencil size={15} />
                    Update
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteDepartment(department)}
                    className={`${buttonClass} border border-[var(--danger)]/25 text-[var(--danger)] hover:bg-[var(--danger)]/10`}
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {filteredDepartments.length === 0 && (
            <div className="px-5 py-16 text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-[var(--bg-card)] text-[var(--text-muted)]">
                <Building2 size={30} />
              </div>

              <h3 className="mt-4 text-lg font-semibold">
                No departments found
              </h3>

              <p className="mt-2 text-sm text-[var(--text-muted)]">
                {search
                  ? "Try searching with a different department name."
                  : "Your departments will appear here."}
              </p>
            </div>
          )}

          <div className="border-t border-[var(--border-color)] px-5 py-4 text-xs text-[var(--text-muted)]">
            Showing {filteredDepartments.length} of {departments.length}{" "}
            departments
          </div>
        </section>

        {/* Update Modal: UI only */}
        {selectedDepartment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
            <div className="my-auto w-full max-w-lg rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-md)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold">Update Department</h2>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    Department details preview
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedDepartment(null)}
                  className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--bg-hover)]"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-[var(--text-secondary)]">
                    Department Name
                  </label>
                  <input
                    defaultValue={selectedDepartment.name}
                    className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] px-4 py-3 text-sm outline-none focus:border-[var(--tertiary)]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-[var(--text-secondary)]">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    defaultValue={selectedDepartment.description}
                    className="w-full resize-y rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] px-4 py-3 text-sm outline-none focus:border-[var(--tertiary)]"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedDepartment(null)}
                  className={`${buttonClass} border border-[var(--border-color)]`}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedDepartment(null)}
                  className={`${buttonClass} bg-[var(--tertiary)] text-[var(--primary)]`}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation: UI only */}
        {deleteDepartment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-md)]">
              <div className="flex size-12 items-center justify-center rounded-xl bg-[var(--danger)]/10 text-[var(--danger)]">
                <Trash2 size={23} />
              </div>

              <h2 className="mt-5 text-xl font-bold">Delete Department?</h2>

              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-[var(--text-primary)]">
                  {deleteDepartment.name}
                </span>
                ? This action cannot be undone.
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteDepartment(null)}
                  className={`${buttonClass} border border-[var(--border-color)]`}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => setDeleteDepartment(null)}
                  className={`${buttonClass} bg-[var(--danger)] text-white hover:brightness-110`}
                >
                  <Trash2 size={15} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllDepartment;
