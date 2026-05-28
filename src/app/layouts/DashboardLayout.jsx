import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import AsideNav from "../../features/dashboard/ui/components/AsideNav";
import TopNav from "../../features/dashboard/ui/components/TopNav";

const DashboardLayout = () => {
  let { mode } = useSelector((store) => store.theme);

  useEffect(() => {
    if (mode === "light") {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [mode]);

  return (
    <div className="h-screen grid grid-cols-[1fr_7fr]">
      <div className="border-r border-gray-500">
        <AsideNav />
      </div>
      <div className="flex flex-col gap-5 px-6 py-4 bg-[--primary] overflow-auto">
        <TopNav />

        <div className="h-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
