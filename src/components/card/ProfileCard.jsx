import React, { useEffect, useState } from "react";
import Card from "./index";
import employeeAPI from "services/employeeAPI";

const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("employee_id");

  useEffect(() => {
    if (userId) {
      employeeAPI.getEmployeeById(
        userId,
        (data) => {
          setUser(data?.data || data?.results || data);
        },
        () => setUser(null)
      );
    }
  }, [userId]);

  if (!user) {
    return (
      <Card extra="w-full h-full p-4">
        <div className="py-8 text-center text-gray-500">Loading profile...</div>
      </Card>
    );
  }

  return (
    <Card extra="w-full h-full p-4">
      <div className="mb-2 flex items-center gap-3">
        <img
          src={user.profile_image || require("assets/img/avatars/avatar11.png")}
          alt="Profile"
          className="h-12 w-12 rounded-full border border-gray-300 object-cover"
        />
        <div>
          <div className="text-lg font-bold text-navy-700 dark:text-white">
            {user.name}
          </div>
          <div className="text-sm text-gray-600">
            {user.designation || user.role || "-"}
          </div>
        </div>
      </div>
      <div className="mb-1 mt-2">
        <div className="text-xs text-gray-500">Phone Number</div>
        <div className="text-base font-medium text-navy-700 dark:text-white">
          {user.phone || "-"}
        </div>
      </div>
      <div className="mb-1">
        <div className="text-xs text-gray-500">Email Address</div>
        <div className="text-base font-medium text-navy-700 dark:text-white">
          {user.email || "-"}
        </div>
      </div>
      <div className="mb-1">
        <div className="text-xs text-gray-500">Report Office</div>
        <div className="text-base font-medium text-navy-700 dark:text-white">
          {user.report_office || user.department || "-"}
        </div>
      </div>
      <div>
        <div className="text-xs text-gray-500">Joined on</div>
        <div className="text-base font-medium text-navy-700 dark:text-white">
          {user.joined_date
            ? new Date(user.joined_date).toLocaleDateString()
            : "-"}
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
