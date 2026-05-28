import EmployeeRow from "./EmployeeRow";


const EmployeeTable = ({ employees }) => {
  return (
    <div className="overflow-x-auto">

      <table className="w-full">

        <thead className="bg-[var(--bg-main)]">

          <tr className="text-left">

            <th className="px-6 py-5 text-[var(--text-secondary)]">
              Profile
            </th>

            <th className="px-6 py-5 text-[var(--text-secondary)]">
              Role
            </th>

            <th className="px-6 py-5 text-[var(--text-secondary)]">
              Department
            </th>

            <th className="px-6 py-5 text-[var(--text-secondary)]">
              Status
            </th>

            <th className="px-6 py-5 text-[var(--text-secondary)]">
              Joined Date
            </th>

            <th className="px-6 py-5 text-[var(--text-secondary)]">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {employees.map((employee) => (
            <EmployeeRow
              key={employee._id}
              employee={employee}
            />
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default EmployeeTable;