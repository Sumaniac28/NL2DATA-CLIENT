import clsx from "clsx";
import { Menu } from "lucide-react";
import { useState } from "react";
import type { FC, ReactElement } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { useMutation } from "@apollo/client";
import { LOGOUT_USER } from "../../features/auth/graphql/auth";
import { deleteLocalStorageItem } from "../utils/utils";
import { updateLogout } from "../../features/auth/reducers/logout.reducer";

const Sidebar: FC = (): ReactElement => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logout] = useMutation(LOGOUT_USER);

  const toggelCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const logoutUser = async (): Promise<void> => {
    try {
      await logout();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      deleteLocalStorageItem("activeProject");
    } finally {
      dispatch(updateLogout({}));
      deleteLocalStorageItem("activeProject");
      navigate("/");
    }
  };

  const isLinkActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <aside
      className={clsx(
        "min-h-screen bg-[#1d1f1f] text-[#AEB4C0] flex-shrink-0 transition-all duration-300 ease-in-out shadow-lg border-r border-[#4dbccd]",
        {
          "w-64": !isCollapsed,
          "w-16": isCollapsed,
        }
      )}
    >
      <div className="p-4 flex justify-between items-center">
        <h2
          className={clsx(
            "text-xl font-merriweather font-semibold tracking-wide text-white transition-all duration-300",
            {
              "opacity-0 w-0": isCollapsed,
              "opacity-100": !isCollapsed,
            }
          )}
        >
          NL2DATA
        </h2>
        <button
          onClick={toggelCollapse}
          className={clsx(
            "p-2 hover:bg-[#1AA8BD]/20 rounded-md transition-transform duration-300 text-[#21C1D6]",
            {
              "rotate-180": isCollapsed,
            }
          )}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <nav className="mt-4 space-y-1">
        <Link
          to="/dashboard"
          className={clsx(
            "flex gap-3 items-center px-4 py-3 rounded-md transition-all duration-300 group",
            {
              "bg-[#21C1D6] text-white": isLinkActive("/dashboard"),
              "hover:bg-[#1AA8BD]/20 hover:text-white":
                !isLinkActive("/dashboard"),
            }
          )}
        >
          <i className="fas fa-home text-lg group-hover:text-[#FACC15]"></i>
          <span
            className={clsx("transition-all duration-300", {
              "opacity-0 w-0": isCollapsed,
              "opacity-100": !isCollapsed,
            })}
          >
            Dashboard
          </span>
        </Link>

        <Link
          to="/charts"
          className={clsx(
            "flex gap-3 items-center px-4 py-3 rounded-md transition-all duration-300 group",
            {
              "bg-[#21C1D6] text-white": isLinkActive("/charts"),
              "hover:bg-[#1AA8BD]/20 hover:text-white":
                !isLinkActive("/charts"),
            }
          )}
        >
          <i className="fa-regular fa-chart-bar text-lg group-hover:text-[#FACC15]"></i>
          <span
            className={clsx("transition-all duration-300", {
              "opacity-0 w-0": isCollapsed,
              "opacity-100": !isCollapsed,
            })}
          >
            Charts
          </span>
        </Link>

        <Link
          to="/datasources"
          className={clsx(
            "flex gap-3 items-center px-4 py-3 rounded-md transition-all duration-300 group",
            {
              "bg-[#21C1D6] text-white": isLinkActive("/datasources"),
              "hover:bg-[#1AA8BD]/20 hover:text-white":
                !isLinkActive("/datasources"),
            }
          )}
        >
          <i className="fas fa-database text-lg group-hover:text-[#FACC15]"></i>
          <span
            className={clsx("transition-all duration-300", {
              "opacity-0 w-0": isCollapsed,
              "opacity-100": !isCollapsed,
            })}
          >
            Data Sources
          </span>
        </Link>

        <div className="flex-grow"></div>

        <button
          className={clsx(
            "flex gap-3 cursor-pointer items-center px-4 py-3 rounded-md transition-all duration-300 group absolute bottom-4",
            {
              "w-16": isCollapsed,
              "w-64": !isCollapsed,
            }
          )}
          onClick={logoutUser}
        >
          <i className="fa-solid fa-right-from-bracket text-lg group-hover:text-[#EAB308]"></i>
          <span
            className={clsx("transition-all duration-300", {
              "opacity-0 w-0": isCollapsed,
              "opacity-100": !isCollapsed,
            })}
          >
            Logout
          </span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
