import { Download, UserPlus } from "lucide-react";
import Button from "../Button";
import { useNavigate } from "react-router";

const EmployeeHeader = () => {
  let navigate = useNavigate();

  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-5xl font-bold text-[var(--text-primary)]">
          Employee Directory
        </h1>

        <p className="mt-2 text-lg text-[var(--text-secondary)]">
          Manage your organization's workforce and roles.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="secondary" icon={<Download size={18} />}>
          Export
        </Button>

        <Button
          handleClick={() => navigate("/home/add-employee")}
          icon={<UserPlus size={18} />}
        >
          Add Employee
        </Button>
      </div>
    </div>
  );
};

export default EmployeeHeader;
