import { Bell, Lightbulb, Menu, Moon, Search } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../../shared/state/themeSlice";
import { logoutApi } from "../../../auth/apis/authApi";
import { removeEmployee } from "../../../auth/state/auth/authSlice";

const TopNav = () => {
  let dispatch = useDispatch();

  let { mode } = useSelector((store) => store.theme);

  let handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  let handleLogout = async () => {
    await logoutApi();
    dispatch(removeEmployee());
  };

  return (
    <div className="flex justify-between bg-[--bg-card] items-center">
      <div className="flex gap-4 items-center w-[30%] rounded px-3 py-2 bg-[var(--bg-surface)] border border-gray-600">
        <Search size={23} />
        <input
          className="outline-0 w-full text-[var(--text-primary)]"
          type="text"
          placeholder="Search workspace.."
        />
      </div>
      <div className="flex gap-4 items-center">
        {mode === "light" ? (
          <Moon onClick={handleThemeChange} size={23} />
        ) : (
          <Lightbulb onClick={handleThemeChange} size={23} />
        )}

        <Bell size={23} />
        <Menu size={23} />
        <button
          onClick={handleLogout}
          className="text-white bg-black rounded px-5 py-2 cursor-pointer"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default TopNav;
