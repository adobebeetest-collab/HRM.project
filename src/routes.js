import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";
import Employee from "views/admin/employee/index.jsx";
import LeaveRequests from "views/admin/leaveRequests/index.jsx";
import Assets from "views/admin/assets/index.jsx";
import CalendarPage from "views/admin/calendar/index.jsx";
import { HiUserGroup } from "react-icons/hi";
// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";
import { FaCalendar, FaBox } from "react-icons/fa";

const isSuperAdmin = localStorage.getItem("is_super_admin") === "true" || localStorage.getItem("is_super_admin") === true;

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "Dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  //   {
  //   name: "Dashboard",
  //   layout: "/admin",
  //   path: "employee-dashboard",
  //   icon: <MdHome className="h-6 w-6" />,
  //   component: <MainDashboard />,
  // },
  {
    name: "Employee",
    layout: "/admin",
    path: "employee",
    icon: <HiUserGroup className="h-6 w-6" />,
    component: <Employee />,
    secondary: true,
  },
  {
    name: "Leave Requests",
    layout: "/admin",
    path: "leave-requests",
    icon: <FaCalendar className="h-6 w-6" />,
    component: <LeaveRequests />,
  },
  // Only show Assets if super admin
  ...(isSuperAdmin ? [
    {
      name: "Assets",
      layout: "/admin",
      path: "assets",
      icon: <FaBox className="h-6 w-6" />,
      component: <Assets />,
    }
  ] : []),
  {
    name: "Calendar",
    layout: "/admin",
    path: "calendar",
    icon: <FaCalendar className="h-6 w-6" />,
    component: <CalendarPage />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
];
export default routes;
