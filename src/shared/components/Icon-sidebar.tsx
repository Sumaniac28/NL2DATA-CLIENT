import type { FC, ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { useMutation } from "@apollo/client";
import { LOGOUT_USER } from "../../features/auth/graphql/auth";
import { deleteLocalStorageItem } from "../utils/utils";
import { updateLogout } from "../../features/auth/reducers/logout.reducer";
import clsx from "clsx";

interface MenuItem {
  icon: string;
  className?: string;
  label: string;
  route: string;
}

const menuItems: MenuItem[] = [
  {
    icon: "fas fa-home",
    label: "Dashboard",
    route: "/dashboard",
  },
  {
    icon: "fa-regular fa-chart-bar",
    label: "Charts",
    route: "/charts",
  },
  {
    icon: "fas fa-database",
    label: "Datasources",
    route: "/datasources",
  },
  {
    icon: "fa-solid fa-right-from-bracket",
    className: "mt-auto",
    label: "Logout",
    route: "/",
  },
];

const IconSidebar: FC = (): ReactElement => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logout] = useMutation(LOGOUT_USER);

  const navigateToIndexPage = (label: string, route: string): void => {
    if (label === "Logout") {
      logoutUser();
    } else {
      navigate(route);
    }
  };

  const logoutUser = async (): Promise<void> => {
    try {
      await logout();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      deleteLocalStorageItem("activeProject");
    } finally {
      deleteLocalStorageItem("activeProject");
      dispatch(updateLogout({}));
      navigate("/");
    }
  };

  const isLinkActive = (path: string): boolean => {
    if (path === "/") return false;
    return location.pathname === path || location.pathname.includes(path);
  };

  return (
    <nav className="fixed left-0 top-0 h-screen w-16 bg-[#1d1f1f] flex flex-col items-center py-4 shadow-lg border-r border-[#1AA8BD]/20">
      <ul className="flex flex-col gap-6 w-full">
        {menuItems.map((item: MenuItem) => (
          <li
            key={item.route}
            className={`group relative ${item.className || ""}`}
          >
            <div
              onClick={() => navigateToIndexPage(item.label, item.route)}
              className={clsx(
                "flex justify-center items-center w-full p-3 cursor-pointer text-[#AEB4C0] hover:text-white hover:bg-[#1AA8BD]/20 rounded-md transition-all duration-300 ease-in-out",
                {
                  "bg-[#21C1D6] text-white": isLinkActive(item.route),
                }
              )}
            >
              <i
                className={`text-xl ${item.icon} group-hover:text-[#FACC15]`}
              ></i>
              <span
                className="absolute z-50 left-16 top-1/2 -translate-y-1/2 bg-[#FEF3C733] text-white px-3 py-1 rounded-md text-sm 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300 
              whitespace-nowrap pointer-events-none shadow-md backdrop-blur-md border border-[#EAB308]/40"
              >
                {item.label}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default IconSidebar;
