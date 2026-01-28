import React from "react";
import Calendar from "../../../components/calendar/Calendar";

export default function CalendarPage() {
  return (
    <div className="flex flex-col gap-6 min-h-screen">
      {/* Page Header */}
      {/* <div className="mb-4">
        <h1 className="text-3xl font-bold text-navy-700 dark:text-white">
          Calendar
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your schedule and important dates
        </p>
      </div> */}

      {/* Calendar Component */}
      <Calendar />
    </div>
  );
}
