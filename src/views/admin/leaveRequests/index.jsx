import React from "react";
import LeaveRequestsList from "components/leave/LeaveRequestsList";

export default function LeaveRequestsView() {
  return (
    <div className="min-h-screen bg-white-100 p-2 dark:bg-navy-900">
      <div className="mx-auto w-full">
        <LeaveRequestsList />
      </div>
    </div>
  );
}
