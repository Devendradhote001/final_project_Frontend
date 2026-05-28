import { BriefcaseBusiness } from "lucide-react";

const EmploymentDetailsForm = ({
  register,
  errors,
}) => {
  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl p-8 mt-8">

      {/* TITLE */}
      <div className="flex items-center gap-4 pb-6 border-b border-[var(--border-color)]">

        <BriefcaseBusiness
          size={28}
          className="text-[var(--primary)]"
        />

        <h2 className="text-4xl font-bold text-[var(--text-primary)]">
          Employment Details
        </h2>

      </div>

      {/* FORM */}
      <div className="grid grid-cols-2 gap-6 mt-8">

        {/* DEPARTMENT */}
        <div>

          <label className="block mb-3 text-sm font-semibold text-[var(--text-secondary)]">
            Department
          </label>

          <select
            {...register("department")}
            className="w-full h-16 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-main)] px-5 outline-none"
          >
            <option value="">
              Select Department
            </option>

            <option value="developer">
              Developer
            </option>

            <option value="administrative">
              Administrative
            </option>

            <option value="security">
              Security
            </option>

            <option value="management">
              Management
            </option>

          </select>

        </div>

        {/* ROLE */}
        <div>

          <label className="block mb-3 text-sm font-semibold text-[var(--text-secondary)]">
            Role
          </label>

          <select
            {...register("role")}
            className="w-full h-16 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-main)] px-5 outline-none"
          >
            <option value="">
              Select Role
            </option>

            <option value="admin">
              Admin
            </option>

            <option value="employee">
              Employee
            </option>

          </select>

        </div>

        {/* JOINING DATE */}
        <div>

          <label className="block mb-3 text-sm font-semibold text-[var(--text-secondary)]">
            Joining Date
          </label>

          <input
            type="date"
            {...register("joiningDate")}
            className="w-full h-16 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-main)] px-5 outline-none"
          />

        </div>

        {/* STATUS */}
        <div>

          <label className="block mb-4 text-sm font-semibold text-[var(--text-secondary)]">
            Status
          </label>

          <div className="flex items-center gap-8">

            <label className="flex items-center gap-3">

              <input
                type="radio"
                value="active"
                {...register("status")}
              />

              Active

            </label>

            <label className="flex items-center gap-3">

              <input
                type="radio"
                value="inactive"
                {...register("status")}
              />

              Inactive

            </label>

          </div>

        </div>

      </div>
    </div>
  );
};

export default EmploymentDetailsForm;