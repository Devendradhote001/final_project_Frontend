import React from "react";

import NavigationTab from "./NavigationTab";
import { MessageCircle } from "lucide-react";
import { useSelector } from "react-redux";
import {
  adminNavigation,
  employeeNavigation,
} from "../../../../app/constants/navigations";

const AsideNav = () => {
  let { employee } = useSelector((store) => store.auth);

  let navigations =
    employee?.role === "admin" ? adminNavigation : employeeNavigation;

  return (
    <div>
      <div className="flex flex-col gap-1 p-4">
        <h1 className="text-3xl font-semibold text-[#CAB8F9]">team-sync</h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Enterprise workspace
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {navigations.map((route) => {
          return (
            <NavigationTab
              path={route.path}
              Icon={route.icon}
              title={route.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AsideNav;
