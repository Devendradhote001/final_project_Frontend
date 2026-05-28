import Attendance from "../../features/employee module/Attendance/ui/pages/Attendance";
import MyTask from "../../features/employee module/MyTask/ui/pages/MyTask";
import Profile from "../../features/employee module/profile/ui/pages/Profile";

export let employeeRoutes = [
  {
    path: "/home/myTask",
    element: <MyTask />,
  },

  {
    path: "/home/attendance",
    element: <Attendance />,
  },

  {
    path: "/home/profile",
    element: <Profile />,
  },
];
