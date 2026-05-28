import { Users, BriefcaseBusiness, Activity, UserPlus } from "lucide-react";
import StatCard from "../StatCard";

const EmployeeStats = ({ employees }) => {
  const activeEmployees = employees.filter((emp) => emp.status === "active");

  return (
    <div className="grid grid-cols-4 gap-6 mt-8">
      <StatCard
        title="Total Employees"
        value={employees.length}
        icon={<Users />}
        badge="+2.4%"
      />

      <StatCard
        title="Active Now"
        value={activeEmployees.length}
        icon={<Activity />}
        badge="82%"
      />

      <StatCard
        title="Departments"
        value="12"
        icon={<BriefcaseBusiness />}
        badge="Updated"
      />

      <StatCard title="New Hires" value="42" icon={<UserPlus />} badge="+12" />
    </div>
  );
};

export default EmployeeStats;
