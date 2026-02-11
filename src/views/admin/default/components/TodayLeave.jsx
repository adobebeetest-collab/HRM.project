import React, { useEffect, useState } from "react";
import Card from "components/card";
import { useNavigate } from "react-router-dom";
import dashboardAPI from "services/dashboard";

const TodayLeave = () => {
  const [pendingLeaveCount, setPendingLeaveCount] = useState(0);
  const [approvedLeaveCount, setApprovedLeaveCount] = useState(0);
  const [rejectedLeaveCount, setRejectedLeaveCount] = useState(0);
  const [todayLeaveCount, setTodayLeaveCount] = useState(0);
  const navigate = useNavigate();

const [todayDate, setTodayDate] = useState("");

useEffect(() => {
  dashboardAPI.getDashboardStats((res) => {
    const stats = res?.data;

    setTodayDate(stats?.date);
    setTodayLeaveCount(stats?.total_received_today || 0);
    setPendingLeaveCount(stats?.pending || 0);
    setApprovedLeaveCount(stats?.approved || 0);
    setRejectedLeaveCount(stats?.rejected || 0);
  });
}, []);


  return (
    <Card extra="!p-4 sm:!p-5 lg:!p-6">
      {/* Card Title */}
      <div className="mb-4 flex items-center justify-between sm:mb-5">
        <h4 className="text-lg font-bold text-navy-700 dark:text-white sm:text-xl">
          Today Leave requests
        </h4>
      </div>
      {/* 2x2 Grid of Leave Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* All Leaves - Top Left */}
        <div
          className="w-full max-w-xs cursor-pointer overflow-hidden rounded-xl bg-white shadow-md"
          onClick={() => {
            localStorage.setItem("leave_status_filter", "all");
            navigate("/admin/leave-requests");
          }}
        >
          <div className="flex flex-col items-center justify-center p-5">
            <div className="text-3xl font-bold text-gray-800">
              {todayLeaveCount}
            </div>
            <div className="text-sm text-gray-500">Total Leaves</div>
          </div>
          <div className="bg-blue-500 py-3 text-center font-semibold text-white">
            All Leaves
          </div>
        </div>
        {/* Pending Leaves - Top Right */}
        <div
          className="w-full max-w-xs cursor-pointer overflow-hidden rounded-xl bg-white shadow-md"
          onClick={() => {
            localStorage.setItem("leave_status_filter", "pending");
            navigate("/admin/leave-requests");
          }}
        >
          <div className="flex flex-col items-center justify-center p-5">
            <div className="text-3xl font-bold text-gray-800">
              {pendingLeaveCount}
            </div>
            <div className="text-sm text-gray-500">Pending Leaves</div>
          </div>
          <div className="bg-yellow-500 py-3 text-center font-semibold text-white">
            Leave Requests
          </div>
        </div>
        {/* Approved Leaves - Bottom Left */}
        <div
          className="w-full max-w-xs cursor-pointer overflow-hidden rounded-xl bg-white shadow-md"
          onClick={() => {
            localStorage.setItem("leave_status_filter", "approved");
            navigate("/admin/leave-requests");
          }}
        >
          <div className="flex flex-col items-center justify-center p-5">
            <div className="text-3xl font-bold text-gray-800">
              {approvedLeaveCount}
            </div>
            <div className="text-sm text-gray-500">Approved Leaves</div>
          </div>
          <div className="bg-green-500 py-3 text-center font-semibold text-white">
            Approved Leaves
          </div>
        </div>
        {/* Rejected Leaves - Bottom Right */}
        <div
          className="w-full max-w-xs cursor-pointer overflow-hidden rounded-xl bg-white shadow-md"
          onClick={() => {
            localStorage.setItem("leave_status_filter", "rejected");
            navigate("/admin/leave-requests");
          }}
        >
          <div className="flex flex-col items-center justify-center p-5">
            <div className="text-3xl font-bold text-gray-800">
              {rejectedLeaveCount}
            </div>
            <div className="text-sm text-gray-500">Rejected Leaves</div>
          </div>
          <div className="bg-red-500 py-3 text-center font-semibold text-white">
            Rejected Leaves
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TodayLeave;
