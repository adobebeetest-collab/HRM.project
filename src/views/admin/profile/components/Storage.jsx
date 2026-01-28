import Card from "components/card";
import React, { useEffect, useState } from "react";
import leaveAPI from "services/leaveAPI";
import LeavePermissionRequest from "components/leave/LeavePermissionRequest";

const LeaveDetails = () => {
  const [summary, setSummary] = useState(null);
  const [breakdown, setBreakdown] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    const isSuper = localStorage.getItem("is_super_admin") === "true";
    setIsSuperAdmin(isSuper);
    fetchLeaveSummary();
  }, [year]);

  const fetchLeaveSummary = () => {
    setLoading(true);
    // You may need to adjust the API endpoint to get summary for all users if super admin
    leaveAPI.getAllLeaves(
      (data) => {
        // Aggregate leave data
        let leaves = Array.isArray(data)
          ? data
          : data?.results || data?.data || [];
        // Filter by year
        leaves = leaves.filter(
          (l) =>
            l.from_date && new Date(l.from_date).getFullYear() === Number(year)
        );

        // Summary
        const summary = {
          total: leaves.length,
          taken: leaves.filter(
            (l) => String(l.status).toLowerCase() === "approved"
          ).length,
          absent: leaves.filter(
            (l) => String(l.status).toLowerCase() === "absent"
          ).length,
          request: leaves.filter(
            (l) => String(l.status).toLowerCase() === "pending"
          ).length,
          workedDays: leaves.reduce(
            (acc, l) => acc + (l.worked_days ? Number(l.worked_days) : 0),
            0
          ),
          lossOfPay: leaves.reduce(
            (acc, l) => acc + (l.loss_of_pay ? Number(l.loss_of_pay) : 0),
            0
          ),
        };

        // Breakdown by leave type
        const breakdownMap = {};
        leaves.forEach((l) => {
          const type = l.leave_type || "Other";
          if (!breakdownMap[type]) breakdownMap[type] = 0;
          breakdownMap[type] += 1;
        });
        const breakdown = Object.entries(breakdownMap).map(([type, count]) => ({
          type,
          count,
        }));

        setSummary(summary);
        setBreakdown(breakdown);
        setLoading(false);
      },
      (error) => {
        setSummary(null);
        setBreakdown([]);
        setLoading(false);
      }
    );
  };

  return (
    <Card extra="w-full h-full p-4">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-lg font-bold text-navy-700 dark:text-white">
          Leave Details
        </h4>
        <button
          className="flex items-center gap-2 rounded border border-gray-300 px-2 py-1 text-xs font-semibold text-navy-700 dark:border-gray-600 dark:text-white"
          onClick={() => setYear((y) => y - 1)}
        >
          &lt;
        </button>
        <span className="font-semibold text-navy-700 dark:text-white">
          {year}
        </span>
        <button
          className="flex items-center gap-2 rounded border border-gray-300 px-2 py-1 text-xs font-semibold text-navy-700 dark:border-gray-600 dark:text-white"
          onClick={() => setYear((y) => y + 1)}
        >
          &gt;
        </button>
      </div>
      <hr className="mb-2" />
      {loading ? (
        <div className="py-8 text-center text-gray-500">Loading...</div>
      ) : summary ? (
        <>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500">Total Leaves</div>
              <div className="text-xl font-bold text-navy-700 dark:text-white">
                {summary.total}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Taken</div>
              <div className="text-xl font-bold text-navy-700 dark:text-white">
                {summary.taken}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Absent</div>
              <div className="text-xl font-bold text-navy-700 dark:text-white">
                {summary.absent}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Request</div>
              <div className="text-xl font-bold text-navy-700 dark:text-white">
                {summary.request}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Worked Days</div>
              <div className="text-xl font-bold text-navy-700 dark:text-white">
                {summary.workedDays}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Loss of Pay</div>
              <div className="text-xl font-bold text-navy-700 dark:text-white">
                {summary.lossOfPay}
              </div>
            </div>
          </div>
          <div className="mb-2 mt-2">
            <div className="mb-1 text-xs font-semibold text-gray-500">
              Leave Type Breakdown
            </div>
            <ul className="text-xs">
              {breakdown.map((b, i) => (
                <li key={i} className="flex justify-between py-0.5">
                  <span>{b.type}</span>
                  <span className="font-bold text-navy-700 dark:text-white">
                    {b.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* <button className="mt-4 w-full rounded bg-navy-700 py-2 font-bold text-white dark:bg-white dark:text-navy-700">
            Apply New Leave
          </button> */}
           <LeavePermissionRequest />
        </>
      ) : (
        <div className="py-8 text-center text-gray-500">
          No leave data found.
        </div>
      )}
    </Card>
  );
};

export default LeaveDetails;
