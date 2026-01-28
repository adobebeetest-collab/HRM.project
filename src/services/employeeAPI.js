import { apiGet, apiPost, apiDelete, apiPostFormData, apiPutFormData, apiUpdate } from './apiHelper';

const employeeAPI = {
  // Get all employees from the backend
  getAllEmployees: (onSuccess, onError) => {
    return apiGet('/employee/get-all-employee/', onSuccess, onError);
  },

  // Get active employees only
  getActiveEmployees: (onSuccess, onError) => {
    return apiGet('/employee/active-employees/', onSuccess, onError);
  }, 

  // // Get single employee by ID
  getEmployeeById: (id, onSuccess, onError) => {
    return apiGet(`/employee/get-employee/${id}/`, onSuccess, onError);
  },

  // Create a new employee
  postEmployee: (formData, onSuccess, onError) => {
    return apiPostFormData('/employee/post-employee/', formData, onSuccess, onError);
  },
  // Delete an employee by ID

  getAllDepartments: (onSuccess, onError) => {
      return apiGet('/employee/get-departments/', onSuccess, onError);
  }, 

  getAllRoles: (onSuccess, onError) => {
      return apiGet('/employee/get-roles/', onSuccess, onError);
  }, 

  // Delete an employee by ID
  deleteEmployee: (id, onSuccess, onError) => {
    return apiDelete(`/employee/delete-employee/${id}/`, onSuccess, onError);
  },

  // Update an employee by ID
  updateEmployee: (id, formData, onSuccess, onError) => {
    return apiPutFormData(`/employee/update-employee/${id}/`, formData, onSuccess, onError);
  },

  // Update employee status (active/inactive)
  // Send data like: { is_active: true } or { is_active: false }
  updateEmployeeStatus: (id, statusData, onSuccess, onError) => {
    return apiGet(`/employee/employee-status/${id}/`, statusData, onSuccess, onError);
  },
  
};

export default employeeAPI;
