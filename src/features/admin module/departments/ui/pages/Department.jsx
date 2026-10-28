import React, { useState } from "react";
import {
  Building2,
  Users,
  UserRound,
  FileText,
  Plus,
  ChevronDown,
  Search,
  X,
  RotateCcw,
} from "lucide-react";
import { useEmployee } from "../../../employees/hooks/useEmployees";
import { createDepartmentApi } from "../../api/departmentApi";
import { useNavigate } from "react-router";

const DepartmentPage = () => {
  let navigate = useNavigate();
  let { data, isPending } = useEmployee();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    manager: "",
    employees: [],
  });

  const employees = [
    { id: "1", name: "Rahul Sharma", email: "rahul@company.com" },
    { id: "2", name: "Priya Verma", email: "priya@company.com" },
    { id: "3", name: "Amit Patel", email: "amit@company.com" },
    { id: "4", name: "Sneha Gupta", email: "sneha@company.com" },
    { id: "5", name: "Vikas Singh", email: "vikas@company.com" },
  ];

  // Dummy data for UI preview only

  const [search, setSearch] = useState("");

  const inputClass =
    "w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition focus:border-[var(--tertiary)] focus:ring-2 focus:ring-[var(--tertiary)]/20";

  const labelClass =
    "mb-2 block text-sm font-medium text-[var(--text-secondary)]";

  const filteredEmployees = data?.employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase()),
  );

  const handleEmployeeToggle = (id) => {
    setFormData((prev) => ({
      ...prev,
      employees: prev.employees.includes(id)
        ? prev.employees.filter((item) => item !== id)
        : [...prev.employees, id],
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      manager: "",
      employees: [],
    });
    setSearch("");
  };

  const selectedManager = data?.employees.find(
    (employee) => employee.id === formData.manager,
  );

  if (isPending) return <h1>Loading employees</h1>;

  let handleDepartmentFormSubmit = async (e) => {
    e.preventDefault();
    let response = await createDepartmentApi(formData);
    console.log(response);
    resetForm();
    alert("Department created successfully");
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] p-4 text-[var(--text-primary)] transition-colors duration-300 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-7">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <span>Admin</span>
              <span>/</span>
              <span className="text-[var(--tertiary)]">Departments</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Department Management
            </h1>

            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Create and organize your departments and team members.
            </p>
          </div>

          <div className="flex gap-5">
            <div className="flex items-center gap-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4">
              <div className="flex size-11 items-center justify-center rounded-xl bg-[var(--tertiary)]/15 text-[var(--tertiary)]">
                <Building2 size={23} />
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)]">Departments</p>
                <p className="text-xl font-bold">04</p>
              </div>
            </div>
            <div className="flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--tertiary)]/15 text-[var(--tertiary)]">
                <Building2 size={20} />
              </div>
              <div onClick={() => navigate('/home/all-departments')}>
                <p className="text-xs text-[var(--text-muted)]">
                  All Departments
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          {/* Form */}
          <section className="overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-[var(--shadow-md)]">
            <div className="flex items-center gap-4 border-b border-[var(--border-color)] p-5 sm:p-6">
              <div className="flex size-12 items-center justify-center rounded-xl bg-[var(--tertiary)]/15 text-[var(--tertiary)]">
                <Plus size={24} />
              </div>

              <div>
                <h2 className="text-lg font-semibold">Create Department</h2>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  Fill in the details to set up a new department.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleDepartmentFormSubmit}
              className="space-y-7 p-5 sm:p-6"
            >
              {/* Basic Details */}
              <div>
                <div className="mb-5 flex items-center gap-2">
                  <FileText size={18} className="text-[var(--tertiary)]" />
                  <h3 className="font-semibold">Basic Information</h3>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className={labelClass}>
                      Department Name
                      <span className="ml-1 text-[var(--danger)]">*</span>
                    </label>

                    <input
                      type="text"
                      placeholder="e.g. Engineering"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Description</label>

                    <textarea
                      rows={4}
                      placeholder="Describe the department's purpose and responsibilities..."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className={`${inputClass} resize-y`}
                    />

                    <p className="mt-2 text-right text-xs text-[var(--text-muted)]">
                      {formData.description.length}/500
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-px bg-[var(--border-color)]" />

              {/* Manager */}
              <div>
                <div className="mb-5 flex items-center gap-2">
                  <UserRound size={18} className="text-[var(--tertiary)]" />
                  <h3 className="font-semibold">Department Manager</h3>
                </div>

                <label className={labelClass}>
                  Select Manager
                  <span className="ml-1 text-[var(--danger)]">*</span>
                </label>

                <div className="relative">
                  <select
                    value={formData.manager}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        manager: e.target.value,
                      })
                    }
                    className={`${inputClass} appearance-none pr-10`}
                  >
                    <option value="">Choose a manager</option>
                    {data?.employees?.map((employee) => (
                      <option key={employee._id} value={employee._id}>
                        {employee.name}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                  />
                </div>

                {selectedManager && (
                  <div className="mt-3 flex items-center gap-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] p-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-[var(--tertiary)]/15 font-semibold text-[var(--tertiary)]">
                      {selectedManager.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium">
                        {selectedManager.name}
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">
                        {selectedManager.email}
                      </p>
                    </div>

                    <span className="ml-auto rounded-full bg-[var(--success)]/10 px-2.5 py-1 text-xs text-[var(--success)]">
                      Manager
                    </span>
                  </div>
                )}
              </div>

              <div className="h-px bg-[var(--border-color)]" />

              {/* Employees */}
              <div>
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-[var(--tertiary)]" />
                    <h3 className="font-semibold">Assign Employees</h3>
                  </div>

                  <span className="rounded-full bg-[var(--tertiary)]/15 px-3 py-1 text-xs font-semibold text-[var(--tertiary)]">
                    {formData.employees.length} selected
                  </span>
                </div>

                <div className="relative mb-4">
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

                <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
                  {filteredEmployees.map((employee) => {
                    const selected = formData.employees.includes(employee.id);

                    return (
                      <label
                        key={employee._id}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                          selected
                            ? "border-[var(--tertiary)] bg-[var(--tertiary)]/10"
                            : "border-[var(--border-color)] hover:bg-[var(--bg-hover)]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => handleEmployeeToggle(employee._id)}
                          className="size-4 accent-[var(--tertiary)]"
                        />

                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--bg-card)] text-xs font-semibold">
                          {employee.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {employee.name}
                          </p>
                          <p className="truncate text-xs text-[var(--text-muted)]">
                            {employee.email}
                          </p>
                        </div>

                        {selected && (
                          <span className="text-xs font-medium text-[var(--tertiary)]">
                            Selected
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>

                {/* Selected Employee Chips */}
                {formData.employees.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-3 text-xs font-medium text-[var(--text-muted)]">
                      SELECTED EMPLOYEES
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {employees
                        .filter((employee) =>
                          formData.employees.includes(employee.id),
                        )
                        .map((employee) => (
                          <span
                            key={employee.id}
                            className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-main)] px-3 py-2 text-xs"
                          >
                            {employee.name}
                            <button
                              type="button"
                              onClick={() => handleEmployeeToggle(employee.id)}
                              className="text-[var(--text-muted)] hover:text-[var(--danger)]"
                            >
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Buttons: UI only */}
              <div className="flex flex-col-reverse gap-3 border-t border-[var(--border-color)] pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center justify-center gap-2 rounded-xl border border-[var(--border-color)] px-5 py-3 text-sm font-medium transition hover:bg-[var(--bg-hover)]"
                >
                  <RotateCcw size={16} />
                  Reset
                </button>

                <button className="flex items-center justify-center gap-2 rounded-xl bg-[var(--tertiary)] px-6 py-3 text-sm font-semibold text-[var(--primary)] transition hover:brightness-110">
                  <Plus size={18} />
                  Create Department
                </button>
              </div>
            </form>
          </section>

          {/* Preview Sidebar */}
          <aside className="space-y-5 xl:sticky xl:top-6">
            <section className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 shadow-[var(--shadow-md)]">
              <h3 className="font-semibold">Department Preview</h3>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Preview your department details.
              </p>

              <div className="mt-6 flex size-14 items-center justify-center rounded-2xl bg-[var(--tertiary)]/15 text-[var(--tertiary)]">
                <Building2 size={28} />
              </div>

              <h2 className="mt-4 break-words text-xl font-bold">
                {formData.name || "Department Name"}
              </h2>

              <p className="mt-2 min-h-12 break-words text-sm leading-6 text-[var(--text-muted)]">
                {formData.description ||
                  "Your department description will appear here."}
              </p>

              <div className="my-5 h-px bg-[var(--border-color)]" />

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--bg-card)]">
                    <UserRound size={18} className="text-[var(--tertiary)]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-[var(--text-muted)]">
                      Department Manager
                    </p>
                    <p className="truncate text-sm font-medium">
                      {selectedManager?.name || "Not assigned"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--bg-card)]">
                    <Users size={18} className="text-[var(--tertiary)]" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">
                      Team Members
                    </p>
                    <p className="text-sm font-medium">
                      {formData.employees.length} employees
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Setup Checklist */}
            <section className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
              <h3 className="font-semibold">Setup Checklist</h3>

              <div className="mt-5 space-y-4">
                {[
                  {
                    label: "Department name",
                    done: Boolean(formData.name.trim()),
                  },
                  {
                    label: "Manager assigned",
                    done: Boolean(formData.manager),
                  },
                  {
                    label: "Employees selected",
                    done: formData.employees.length > 0,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span
                      className={`flex size-5 items-center justify-center rounded-full text-xs ${
                        item.done
                          ? "bg-[var(--success)]/15 text-[var(--success)]"
                          : "bg-[var(--bg-card)] text-[var(--text-muted)]"
                      }`}
                    >
                      {item.done ? "✓" : "○"}
                    </span>
                    <span
                      className={
                        item.done
                          ? "text-[var(--text-primary)]"
                          : "text-[var(--text-muted)]"
                      }
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DepartmentPage;
