/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import { useState } from "react";

import SidebarCard from "components/sidebar/componentsrtl/SidebarCard";
import routes from "routes.js";

const Sidebar = ({ open, onClose }) => {
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute right-4 top-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`m-6 flex h-20 items-center border-b-2`}>
        {/* Normal mode logo */}
        <img
          src="https://www.sportstech.de/media/0c/c2/05/1710858131/logo_%285%29.svg"
          alt="SportsTech Logo"
          className="h-73 block w-56 dark:hidden"
        />
        {/* Dark mode logo (replace with your dark logo URL) */}
        <img
          src="/Frame4.png"
          alt="SportsTech Logo Dark"
          className="hidden h-12 w-60 dark:block"
        />
      </div>

      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={routes} onClose={onClose} />
      </ul>

      {/* Free Horizon Card */}
      <div className="flex justify-center">{/* <SidebarCard /> */}</div>

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
