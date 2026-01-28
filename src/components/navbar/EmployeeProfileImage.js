import { useEffect, useState } from "react";
import avatar from "assets/img/avatars/avatar4.png";
import employeeAPI from "services/employeeAPI";

const API_BASE = "https://insoluble-unseparately-delena.ngrok-free.dev";

export default function EmployeeProfileImage({ employeeId, ...props }) {
  const [profileUrl, setProfileUrl] = useState(avatar);

  useEffect(() => {
    if (!employeeId) return;
    employeeAPI.getEmployeeById(
      employeeId,
      (data) => {
        let emp = data?.data || data?.results || data;
        if (Array.isArray(emp)) emp = emp[0];
        if (emp && emp.profile_picture) {
          if (
            emp.profile_picture.startsWith("http") ||
            emp.profile_picture.startsWith("data:")
          ) {
            setProfileUrl(emp.profile_picture);
          } else {
            setProfileUrl(`${API_BASE}${emp.profile_picture}`);
          }
        } else {
          setProfileUrl(avatar);
        }
      },
      () => setProfileUrl(avatar)
    );
  }, [employeeId]);

  return (
    <img
      className="h-10 w-10 rounded-full"
      src={profileUrl}
      alt="Profile"
      {...props}
    />
  );
}
