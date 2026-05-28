import { updateEmployee } from "../../../api/employeeApis";
import EmployeeActions from "./EmployeeActions";
import StatusBadge from "./StatusBadge";

const EmployeeRow = ({ employee }) => {
  return (
    <tr className="border-b border-[var(--border-color)]">
      {/* PROFILE */}
      <td className="py-6 px-6">
        <div className="flex items-center gap-4">
          <img
            src={
              employee.avatar ||
              "https://ui-avatars.com/api/?name=" + employee.name
            }
            alt=""
            className="w-14 h-14 rounded-full object-cover"
          />

          <div>
            <h3 className="font-semibold text-lg text-[var(--text-primary)]">
              {employee.name}
            </h3>

            <p className="text-[var(--text-secondary)]">{employee.email}</p>
          </div>
        </div>
      </td>

      {/* ROLE */}
      <td className="px-6">
        <span className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-medium text-sm">
          {employee.role}
        </span>
      </td>

      {/* DEPARTMENT */}
      <td className="px-6 text-[var(--text-primary)] capitalize">
        {employee.department}
      </td>

      {/* STATUS */}
      <td className="px-6">
        <StatusBadge status={employee.status} />
      </td>

      {/* DATE */}
      <td className="px-6 text-[var(--text-secondary)]">
        {new Date(employee.createdAt).toDateString()}
      </td>

      {/* ACTIONS */}
      <td className="px-6">
        <EmployeeActions
          employee={employee}
          onEdit={() => console.log("Edit", employee)}
          onDelete={() => console.log("Delete", employee)}
          onInactive={async () => {
            if (
              employee.status === "inactive"
                ? await updateEmployee(employee?._id, { status: "active" })
                : await updateEmployee(employee?._id, { status: "inactive" })
            )
              alert("employee status updated");
          }}
        />
      </td>
    </tr>
  );
};

export default EmployeeRow;
