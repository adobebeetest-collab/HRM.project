import React, { useEffect, useState } from "react";
import avatar from "assets/img/avatars/avatar11.png";
import banner from "assets/img/profile/banner.png";
import Card from "components/card";
import employeeAPI from "services/employeeAPI";

const ProfileBanner = () => {
  const [employee, setEmployee] = useState(null);
  // Use the correct key for employee id
  const userId =
    localStorage.getItem("employee_id") || localStorage.getItem("user_id");

  useEffect(() => {
    if (userId) {
      employeeAPI.getEmployeeById(
        userId,
        (data) => {
          // Try to handle different API response shapes
          let emp = data?.data || data?.results || data;
          // If array, take first
          if (Array.isArray(emp)) emp = emp[0];
          setEmployee(emp);
        },
        (err) => {
          setEmployee({ error: true });
        }
      );
    }
  }, [userId]);
  console.log(userId, "2222222222222");

  if (!employee) {
    return (
      <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
        <div className="py-8 text-center text-gray-500">Loading profile...</div>
      </Card>
    );
  }
  if (employee.error) {
    return (
      <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
        <div className="py-8 text-center text-red-500">
          Unable to load employee details.
        </div>
      </Card>
    );
  }

  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <img
            className="h-full w-full rounded-full object-cover"
            src={
              employee && employee.profile_picture
                ? employee.profile_picture.startsWith("http") ||
                  employee.profile_picture.startsWith("data:")
                  ? employee.profile_picture
                  : `https://insoluble-unseparately-delena.ngrok-free.dev${employee.profile_picture}`
                : avatar
            }
            alt="Profile"
          />
        </div>
      </div>
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {(employee &&
            (employee.name || employee.username || employee.email)) ||
            "Employee Name"}
        </h4>
        <p className="text-base font-normal text-gray-600">
          {(employee &&
            (employee.role_name ||
              employee.position ||
              employee.role ||
              employee.designation)) ||
            "Designation"}
        </p>
      </div>
      <div className="mb-3 mt-6 flex gap-4 md:!gap-14">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            {(employee && (employee.posts || employee.total_posts)) || 17}
          </p>
          <p className="text-sm font-normal text-gray-600">Posts</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            {(employee && (employee.followers || employee.total_followers)) ||
              "9.7K"}
          </p>
          <p className="text-sm font-normal text-gray-600">Followers</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            {(employee && (employee.following || employee.total_following)) ||
              434}
          </p>
          <p className="text-sm font-normal text-gray-600">Following</p>
        </div>
      </div>
    </Card>
  );
};

export default ProfileBanner;
