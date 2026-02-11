import {
  MdHome,
  MdPerson,
  MdLock,
} from "react-icons/md";
import { FaCalendar, FaBox } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";

import Dashboard from "views/admin/default";
import Employee from "views/admin/employee";
import LeaveRequests from "views/admin/leaveRequests";
import Assets from "views/admin/assets";
import CalendarPage from "views/admin/calendar";
import Profile from "views/admin/profile";
import SignIn from "views/auth/SignIn";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "dashboard",
    icon: <MdHome className="h-5 w-5"  color="blue"/>,
    component: <Dashboard />,
    roles: ["admin", "super_admin"],
  },
  {
    name: "Employee",
    layout: "/admin",
    path: "employee",
    icon: <HiUserGroup className="h-5 w-5"  color="blue"/>,
    component: <Employee />,
    roles: ["admin", "super_admin"],
  },
  {
    name: "Leave Requests",
    layout: "/admin",
    path: "leave-requests",
    icon: <FaCalendar className="h-5 w-5" color="blue" />,
    component: <LeaveRequests />,
    roles: ["admin", "super_admin"],
  },
  {
    name: "Assets",
    layout: "/admin",
    path: "assets",
    icon: <FaBox className="h-5 w-5"  color="blue" />,
    component: <Assets />,
    roles: ["super_admin"], 
  },
  {
    name: "Calendar",
    layout: "/admin",
    path: "calendar",
    icon: <FaCalendar className="h-5 w-5"  color="blue"/>,
    component: <CalendarPage />,
    roles: ["admin", "super_admin"],
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-5 w-5"  color="blue"/>,
    component: <Profile />,
    roles: ["admin", "super_admin"],
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-5 w-5"  color="blue" />,
    component: <SignIn />,
  },
];

export default routes;