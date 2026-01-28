import React from "react";
import LeaveRequestsList from "components/leave/LeaveRequestsList";

export default function LeaveRequestsView() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 dark:bg-navy-900">
      <div className="mx-auto max-w-7xl">
        <LeaveRequestsList />
      </div>
    </div>
  );
}
