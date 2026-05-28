import {
  Building,
  ChartArea,
  File,
  LayoutDashboard,
  List,
  PersonStanding,
  Presentation,
  Settings,
  UserPen,
} from "lucide-react";

export let employeeNavigation = [
  {
    path: "/home",
    title: "Dashboard",
    icon: <LayoutDashboard />,
  },
  {
    path: "/home/myTask",
    title: "My-Task",
    icon: <List />,
  },
  {
    path: "/home/chat",
    title: "Chats",
    icon: <ChartArea />,
  },
  {
    path: "/home/attendance",
    title: "Attendance",
    icon: <Presentation />,
  },
  {
    path: "/home/profile",
    title: "Profile",
    icon: <UserPen />,
  },
  {
    path: "/home/setting",
    title: "Settings",
    icon: <Settings />,
  },
];

export let adminNavigation = [
  {
    path: "/home",
    title: "Dashboard",
    icon: <LayoutDashboard />,
  },
  {
    path: "/home/task",
    title: "Task",
    icon: <List />,
  },
  {
    path: "/home/chat",
    title: "Chats",
    icon: <ChartArea />,
  },
  {
    path: "/home/department",
    title: "Departments",
    icon: <Building />,
  },
  {
    path: "/home/employee",
    title: "Employee",
    icon: <PersonStanding />,
  },
  {
    path: "/home/document",
    title: "Documents",
    icon: <File />,
  },
  {
    path: "/home/setting",
    title: "Settings",
    icon: <Settings />,
  },
];
