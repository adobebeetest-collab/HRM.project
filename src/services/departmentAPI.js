import { apiGet } from "./apiHelper";

const departmentAPI = {
  /**
   * Get all departments
   */
  getAllDepartments: (onSuccess, onError) => {
    return apiGet("/employee/get-departments/", onSuccess, onError);
  },
  /**
   * Get department bar chart data
   */
  getDepartmentBarChartData: (onSuccess, onError) => {
    return apiGet("/dashboard/dash-dep-emp/", onSuccess, onError);
  }, 
};

export default departmentAPI;
