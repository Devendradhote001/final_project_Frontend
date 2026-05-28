import Chat from "../../features/chats/ui/pages/Chat";
import Home from "../../features/dashboard/ui/pages/Home";
import Setting from "../../features/settings/ui/pages/Setting";

export let commonRoutes = [
  {
    path: "",
    element: <Home />,
  },
  {
    path: "chat",
    element: <Chat />,
  },
  {
    path: "setting",
    element: <Setting />,
  },
];
