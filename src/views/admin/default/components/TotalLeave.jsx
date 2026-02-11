// import React, { useEffect, useState } from "react";
// import { IoIosNotifications } from "react-icons/io";
// import Card from "components/card";
// import { useNavigate } from "react-router-dom";
// import { leaveAPI } from "services/leaveAPI";

// const TotalLeave = () => {
//   const [pendingLeaveCount, setPendingLeaveCount] = useState(0);
//   const [approvedLeaveCount, setApprovedLeaveCount] = useState(0);
//   const [rejectedLeaveCount, setRejectedLeaveCount] = useState(0);
//   const [totalLeaveCount, setTotalLeaveCount] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     leaveAPI.getAllLeaves((data) => {
//       let requests = [];
//       if (Array.isArray(data)) {
//         requests = data;
//       } else if (data?.results && Array.isArray(data.results)) {
//         requests = data.results;
//       } else if (data?.data && Array.isArray(data.data)) {
//         requests = data.data;
//       } else if (data?.leave_requests && Array.isArray(data.leave_requests)) {
//         requests = data.leave_requests;
//       }
//       const pending = requests.filter(
//         (req) => req.status && req.status.toLowerCase() === "pending"
//       );
//       const approved = requests.filter(
//         (req) => req.status && req.status.toLowerCase() === "approved"
//       );
//       const rejected = requests.filter(
//         (req) => req.status && req.status.toLowerCase() === "rejected"
//       );
//       setPendingLeaveCount(pending.length);
//       setApprovedLeaveCount(approved.length);
//       setRejectedLeaveCount(rejected.length);
//       setTotalLeaveCount(requests.length);
//     });
//   }, []);

//   return (
//     <Card extra="!p-4 sm:!p-5 lg:!p-6">
//       {/* Card Title */}
//       <div className="mb-4 flex items-center justify-between sm:mb-5">
//         <h4 className="text-lg font-bold text-navy-700 dark:text-white sm:text-xl">
//           Total Employees Leaves
//         </h4>
//       </div>
//       {/* 2x2 Grid of Leave Cards - ALL LEAVES */}
//       <div className="grid grid-cols-2 gap-3 sm:gap-4">
//         {/* All Leaves - Top Left */}
//         <div
//           className="w-full max-w-xs cursor-pointer overflow-hidden rounded-xl bg-white shadow-md"
//           onClick={() => {
//             localStorage.setItem("leave_status_filter", "all");
//             localStorage.removeItem("leave_date_filter"); // REMOVE DATE FILTER
//             navigate("/admin/leave-requests");
//           }}
//         >
//           <div className="flex flex-col items-center justify-center p-5">
//             <div className="text-3xl font-bold text-gray-800">
//               {totalLeaveCount}
//             </div>
//             <div className="text-sm text-gray-500">Total Leaves</div>
//           </div>
//           <div className="bg-blue-500 py-3 text-center font-semibold text-white mt-5">
//             All Leave
//           </div>
//         </div>
//         {/* Pending Leaves - Top Right */}
//         <div
//           className="w-full max-w-xs cursor-pointer overflow-hidden rounded-xl bg-white shadow-md"
//           onClick={() => {
//             localStorage.setItem("leave_status_filter", "pending");
//             localStorage.removeItem("leave_date_filter"); // REMOVE DATE FILTER
//             navigate("/admin/leave-requests");
//           }}
//         >
//           <div className="flex flex-col items-center justify-center p-5">
//             <div className="text-3xl font-bold text-gray-800">
//               {pendingLeaveCount}
//             </div>
//             <div className="text-sm text-gray-500">Pending Leaves</div>
//           </div>
//           <div className="bg-yellow-500 py-3 text-center font-semibold text-white lg:mt-5">
//             Leave Requests
//           </div>
//         </div>
//         {/* Approved Leaves - Bottom Left */}
//         <div
//           className="w-full max-w-xs cursor-pointer overflow-hidden rounded-xl bg-white shadow-md"
//           onClick={() => {
//             localStorage.setItem("leave_status_filter", "approved");
//             localStorage.removeItem("leave_date_filter"); // REMOVE DATE FILTER
//             navigate("/admin/leave-requests");
//           }}
//         >
//           <div className="flex flex-col items-center justify-center p-5">
//             <div className="text-3xl font-bold text-gray-800">
//               {approvedLeaveCount}
//             </div>
//             <div className="text-sm text-gray-500">Approved Leaves</div>
//           </div>
//           <div className="bg-green-500 py-3 text-center font-semibold text-white">
//             Approved Leaves
//           </div>
//         </div>
//         {/* Rejected Leaves - Bottom Right */}
//         <div
//           className="w-full max-w-xs cursor-pointer overflow-hidden rounded-xl bg-white shadow-md"
//           onClick={() => {
//             localStorage.setItem("leave_status_filter", "rejected");
//             localStorage.removeItem("leave_date_filter"); // REMOVE DATE FILTER
//             navigate("/admin/leave-requests");
//           }}
//         >
//           <div className="flex flex-col items-center justify-center p-5">
//             <div className="text-3xl font-bold text-gray-800">
//               {rejectedLeaveCount}
//             </div>
//             <div className="text-sm text-gray-500">Rejected Leaves</div>
//           </div>
//           <div className="bg-red-500 py-3 text-center font-semibold text-white">
//             Rejected Leaves
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default TotalLeave;
