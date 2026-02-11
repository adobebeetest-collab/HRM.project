import { HiX } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import routes from "routes.js";

const Sidebar = ({ open, onClose }) => {
  const isSuperAdmin = localStorage.getItem("is_super_admin") === "true";

  const role = isSuperAdmin ? "super_admin" : "admin";

  return (
    <div
      className={`fixed z-50 flex min-h-full w-64 flex-col rounded-r-2xl border-r border-white/10 bg-white/90 pb-10 shadow-2xl shadow-white/10 transition-all duration-200 dark:bg-gradient-to-br dark:from-[#151e3a] dark:to-[#1a223f] dark:text-white
        ${open ? "translate-x-0" : "-translate-x-full"}
        xl:translate-x-0`}
    >
      <span
        className="absolute right-4 top-4 cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX className="text-gray-500 dark:text-gray-300" />
      </span>

      <div className="border-black/20 flex flex-col items-center gap-3 border-b px-6 pb-6 pt-8">
        <img
          src="https://www.sportstech.de/media/0c/c2/05/1710858131/logo_%285%29.svg"
          alt="Logo"
          className="mx-auto w-48 dark:hidden"
        />
        <img
          src="/Frame4.png"
          alt="SportsTech Logo Dark"
          className="mx-auto hidden w-48 dark:block"
        />
      </div>

      <ul className="mt-6 flex flex-col gap-2 px-2">
        {routes
          .filter(
            (route) =>
              route.layout === "/admin" &&
              (!route.roles || route.roles.includes(role))
          )
          .map((route, index) => (
            <li key={index}>
              <NavLink
                to={`${route.layout}/${route.path}`}
                onClick={() => {
                  // When navigating from sidebar to Leave Requests, show all leaves by default
                  if (route.path === "leave-requests") {
                    localStorage.setItem("leave_status_filter", "all");
                    localStorage.removeItem("leave_date_filter");
                  }
                  if (onClose) onClose();
                }}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-5 py-3 text-base font-medium transition-all duration-150
                  ${
                    isActive
                      ? "bg-blue-100/80 text-blue-700 shadow-sm dark:bg-blue-400/20 dark:text-blue-200"
                      : "text-gray-700 hover:bg-blue-50/60 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-blue-400/10 dark:hover:text-blue-200"
                  }`
                }
              >
                <span className="text-xl text-blue-500 transition-colors duration-150 dark:text-blue-400">
                  {route.icon}
                </span>
                <span className="tracking-normal">{route.name}</span>
              </NavLink>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
