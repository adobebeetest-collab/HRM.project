import React, { useState, useEffect } from "react";
import { MdCloudUpload } from "react-icons/md";
import { FaEye, FaEyeSlash, FaCamera, FaCloudUploadAlt } from "react-icons/fa";
import { IoDocumentAttach } from "react-icons/io5";
import { MdAccountBox } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import employeeAPI from "services/employeeAPI";
import { MdEdit } from "react-icons/md";
import { showSuccess, showError } from "utils/toastHelper";

const AddEmployeeModal = ({
  isOpen,
  onClose,
  onSubmit,
  isEditMode = false,
  editingEmployee = null,
}) => {
  // State to store all form data
  const [formData, setFormData] = useState({
    email: "",
    user_name: "",
    first_name: "",
    last_name: "",
    emp_code: "",
    dob_date: "",
    doj_date: "",
    address: "",
    mobile: "",
    gender: "",
    profile_picture: null,
    department: {},
    role: "",
    password: "",
    confirm_password: "",
    sslcCertificate: null,
    relieving_letter: null,
    bank_passbook: null,
    salary_slips: null,
    aadhaar_card: null,
    pan_card: null,
  });

  // State for preview images
  const [imagePreview, setImagePreview] = useState(null);
  const [documentPreviews, setDocumentPreviews] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const isSuperAdmin =
    localStorage.getItem("is_super_admin") === "true" ||
    localStorage.getItem("is_super_admin") === true;

  // Document definitions
  const documents = {
    sslcCertificate: { label: "SSLC Certificate", required: true },
    relieving_letter: { label: "Relieving Letter", required: false },
    bank_passbook: { label: "Bank Passbook", required: true },
    salary_slips: { label: "Pay Slips (Last 3 months)", required: false },
    aadhaar_card: { label: "Aadhaar Card", required: true },
    pan_card: { label: "PAN Card", required: true },
  };

  // Load departments and roles when modal opens
  useEffect(() => {
    if (isOpen) {
      // Load departments
      employeeAPI.getAllDepartments(
        (data) => {
          let deptArray = [];

          // Handle multiple response formats
          if (Array.isArray(data)) {
            deptArray = data;
          } else if (data?.results && Array.isArray(data.results)) {
            deptArray = data.results;
          } else if (data?.data && Array.isArray(data.data)) {
            deptArray = data.data;
          } else if (data?.department && Array.isArray(data.department)) {
            deptArray = data.department;
          }

          setDepartments(deptArray);
        },
        (error) => {
          setDepartments([]);
        }
      );

      // Load roles
      employeeAPI.getAllRoles(
        (data) => {
          let roleArray = [];

          // Handle multiple response formats
          if (Array.isArray(data)) {
            roleArray = data;
          } else if (data?.results && Array.isArray(data.results)) {
            roleArray = data.results;
          } else if (data?.data && Array.isArray(data.data)) {
            roleArray = data.data;
          } else if (data?.role && Array.isArray(data.role)) {
            roleArray = data.role;
          }

          setRoles(roleArray);
        },
        (error) => {
          setRoles([]);
        }
      );

      // If editing, populate form with employee data
      if (isEditMode && editingEmployee) {
        // Extract department ID (handle both object and string formats)
        let deptValue = "";
        if (editingEmployee.department) {
          if (typeof editingEmployee.department === "object") {
            deptValue = editingEmployee.department.id || "";
          } else {
            deptValue = editingEmployee.department;
          }
        }
        // Extract role ID (handle both object and string formats)
        let roleValue = "";
        if (editingEmployee.role) {
          if (typeof editingEmployee.role === "object") {
            roleValue = editingEmployee.role.id || "";
          } else {
            roleValue = editingEmployee.role;
          }
        }
        // Handle is_active value (convert string/boolean to boolean)
        let isActive = true;
        if (editingEmployee.is_active !== undefined) {
          if (typeof editingEmployee.is_active === "string") {
            isActive =
              editingEmployee.is_active === "true" ||
              editingEmployee.is_active === "1";
          } else {
            isActive = Boolean(editingEmployee.is_active);
          }
        }
        setFormData({
          email: editingEmployee.email || "",
          user_name: editingEmployee.user_name || "",
          first_name: editingEmployee.first_name || "",
          last_name: editingEmployee.last_name || "",
          emp_code: editingEmployee.emp_code || "",
          dob_date: editingEmployee.dob_date || "",
          doj_date: editingEmployee.doj_date || "",
          address: editingEmployee.address || "",
          mobile: editingEmployee.mobile || "",
          gender: editingEmployee.gender || "",
          profile_picture: editingEmployee.profile_picture || null,
          department: deptValue,
          role: roleValue,
          password: "",
          confirm_password: "",
          sslcCertificate: editingEmployee.sslcCertificate,
          relieving_letter: editingEmployee.relieving_letter,
          bank_passbook: editingEmployee.bank_passbook,
          salary_slips: editingEmployee.salary_slips,
          aadhaar_card: editingEmployee.aadhaar_card,
          pan_card: editingEmployee.pan_card,
        });
        // Load profile picture preview if exists
        if (editingEmployee.profile_picture) {
          setImagePreview(editingEmployee.profile_picture);
        }
        // Initialize document previews for old images
        const docPreviewObj = {};
        Object.keys(documents).forEach((docKey) => {
          const value = editingEmployee[docKey];
          if (value && typeof value === "string") {
            if (value.match(/\.(jpg|jpeg|png|webp)$/i)) {
              docPreviewObj[docKey] = {
                type: "image",
                src: value.startsWith("http")
                  ? value
                  : `https://insoluble-unseparately-delena.ngrok-free.dev/api${value}`,
              };
            } else if (value.match(/\.pdf$/i)) {
              docPreviewObj[docKey] = {
                type: "pdf",
                name: value.split("/").pop(),
              };
            }
          }
        });
        setDocumentPreviews(docPreviewObj);
      }
    }
  }, [isOpen, isEditMode, editingEmployee]);

  // Handle image upload (profile picture)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (4MB max)
      if (file.size > 4 * 1024 * 1024) {
        alert("Image should be below 4 MB");
        return;
      }
      setFormData({ ...formData, profile_picture: file });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle document upload
  const handleDocumentChange = (e, docKey) => {
    const file = e.target.files[0];
    if (file) {
      // Allow only PDF and images
      const validTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
      ];
      if (!validTypes.includes(file.type)) {
        alert(`Only PDF and image files are allowed`);
        return;
      }

      // Check file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert(`File should be below 10 MB`);
        return;
      }

      setFormData({ ...formData, [docKey]: file });

      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setDocumentPreviews({
            ...documentPreviews,
            [docKey]: { type: "image", src: reader.result },
          });
        };
        reader.readAsDataURL(file);
      } else {
        // For PDFs, just show the filename
        setDocumentPreviews({
          ...documentPreviews,
          [docKey]: { type: "pdf", name: file.name },
        });
      }
    }
  };

  // Handle regular input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (isSuperAdmin) {
      // Only Account Information required for super admin (when adding, not editing)
      if (!isEditMode) {
        if (!formData.gender) newErrors.gender = "Gender is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.user_name.trim())
          newErrors.user_name = "Username is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password !== formData.confirm_password) {
          newErrors.confirm_password = "Passwords do not match";
        }
      }
    } else {
      // For non-super admin, all fields required
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.first_name.trim())
        newErrors.first_name = "First Name is required";
      if (!formData.emp_code.trim())
        newErrors.emp_code = "Employee ID is required";
      if (!formData.dob_date) newErrors.dob_date = "Date of Birth is required";
      if (!formData.doj_date) newErrors.doj_date = "Joining Date is required";
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.mobile.trim())
        newErrors.mobile = "Phone Number is required";
      if (!isEditMode) {
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.user_name.trim())
          newErrors.user_name = "Username is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password !== formData.confirm_password) {
          newErrors.confirm_password = "Passwords do not match";
        }
      }
      // Check required documents
      Object.keys(documents).forEach((docKey) => {
        if (documents[docKey].required && !formData[docKey]) {
          newErrors[docKey] = `${documents[docKey].label} is required`;
        }
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const submitData = new FormData();
      if (isEditMode && editingEmployee) {
        // Only send changed fields for edit
        Object.keys(formData).forEach((key) => {
          if (key === "confirm_password") return;
          // For files: only send if a new file is selected
          if (formData[key] instanceof File) {
            submitData.append(key, formData[key]);
            return;
          }
          // For other fields: only send if changed
          let original = editingEmployee[key];
          // For department/role, compare as string or id
          if (
            (key === "department" || key === "role") &&
            original &&
            typeof original === "object"
          ) {
            original = original.id || "";
          }
          // For null/undefined, treat as empty string
          const current = formData[key] ?? "";
          const originalVal = original ?? "";
          if (String(current) !== String(originalVal)) {
            // Convert department/role to int if needed
            if (key === "department" || key === "role") {
              const intValue = parseInt(current, 10);
              if (!isNaN(intValue)) {
                submitData.append(key, intValue);
              }
            } else {
              submitData.append(key, current);
            }
          }
        });
      } else {
        // For add, send all non-empty fields as before
        Object.keys(formData).forEach((key) => {
          if (key === "confirm_password") return;
          if (formData[key] !== null && formData[key] !== "") {
            if (formData[key] instanceof File) {
              submitData.append(key, formData[key]);
            } else if (key === "department" || key === "role") {
              const intValue = parseInt(formData[key], 10);
              if (!isNaN(intValue)) {
                submitData.append(key, intValue);
              }
            } else if (key === "is_active") {
              submitData.append(
                key,
                formData[key] === true || formData[key] === "true"
              );
            } else {
              submitData.append(key, formData[key]);
            }
          } else if (key === "is_active") {
            submitData.append(
              key,
              formData[key] === true || formData[key] === "true"
            );
          }
        });
      }

      for (let [key, value] of submitData.entries()) {
        console.log(
          `  ${key}: ${value instanceof File ? `File: ${value.name}` : value}`
        );
      }

      // Determine if we're adding or updating
      const submitFunction = isEditMode
        ? () =>
            employeeAPI.updateEmployee(
              editingEmployee.id,
              submitData,
              handleSubmitSuccess,
              handleSubmitError
            )
        : () =>
            employeeAPI.postEmployee(
              submitData,
              handleSubmitSuccess,
              handleSubmitError
            );

      submitFunction();
    } else {
      console.log("Form validation failed:", errors);
    }
  };

  // Handle successful submission (add or update)
  const handleSubmitSuccess = (response) => {
    setDepartments(response?.departments);
    setRoles(response?.role_name);
    const message = isEditMode
      ? "Employee updated successfully! ✏️"
      : "Employee added successfully! 🎉";

    showSuccess(response?.message || message);

    // Reset form
    resetForm();

    // Call parent callback to refresh employee list
    if (onSubmit) {
      onSubmit();
    }

    // Close modal after brief delay
    setTimeout(() => {
      onClose();
    }, 500);
  };

  // Handle submission errors (add or update)
  const handleSubmitError = (error) => {
    const action = isEditMode ? "updating" : "adding";

    // Handle field-specific errors from backend
    let fieldErrors = {};
    let errorMessages = [];

    // Check if error has field-specific errors in message property
    if (error?.message && typeof error.message === "object") {
      Object.keys(error.message).forEach((field) => {
        const fieldError = error.message[field];
        let errorMsg = "";

        if (Array.isArray(fieldError)) {
          errorMsg = fieldError[0] || fieldError.join(", ");
        } else if (typeof fieldError === "string") {
          errorMsg = fieldError;
        }

        if (errorMsg) {
          fieldErrors[field] = errorMsg;
          // Format field name (convert snake_case to Title Case)
          const fieldLabel = field
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          errorMessages.push(`${fieldLabel}: ${errorMsg}`);
        }
      });
    }
    // Fallback: check if errors are in data property
    else if (error?.data && typeof error.data === "object") {
      Object.keys(error.data).forEach((field) => {
        const fieldError = error.data[field];
        let errorMsg = "";

        if (Array.isArray(fieldError)) {
          errorMsg = fieldError[0] || fieldError.join(", ");
        } else if (typeof fieldError === "string") {
          errorMsg = fieldError;
        }

        if (errorMsg) {
          fieldErrors[field] = errorMsg;
          const fieldLabel = field
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          errorMessages.push(`${fieldLabel}: ${errorMsg}`);
        }
      });
    }

    // If we found field-specific errors, set them
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      errorMessages.forEach((msg) => showError(msg.status));
    } else {
      // Show generic error message
      showError(
        error?.message || `Failed to ${action} employee. Please try again.`
      );
    }
  };

  // OLD CODE - KEEPING FOR REFERENCE, WILL BE REMOVED
  const handleSubmitOld = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "confirm_password") return;

        if (formData[key] !== null && formData[key] !== "") {
          if (formData[key] instanceof File) {
            submitData.append(key, formData[key]);
          } else {
            submitData.append(key, formData[key]);
          }
        }
      });

      employeeAPI.postEmployee(
        submitData,
        (response) => {
          // Show success message

          // Reset form
          resetForm();

          // Call parent callback to refresh employee list
          if (onSubmit) {
            onSubmit();
          }

          // Close modal after brief delay to show success message
          setTimeout(() => {
            onClose();
          }, 500);
        },
        (error) => {
          // Handle field-specific errors from backend
          let fieldErrors = {};
          let errorMessages = [];

          // Check if error has field-specific errors in message property
          if (error?.message && typeof error.message === "object") {
            Object.keys(error.message).forEach((field) => {
              const fieldError = error.message[field];
              let errorMsg = "";

              if (Array.isArray(fieldError)) {
                errorMsg = fieldError[0] || fieldError.join(", ");
              } else if (typeof fieldError === "string") {
                errorMsg = fieldError;
              }

              if (errorMsg) {
                fieldErrors[field] = errorMsg;
                // Format field name (convert snake_case to Title Case)
                const fieldLabel = field
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");
                errorMessages.push(`${fieldLabel}: ${errorMsg}`);
              }
            });
          }
          // Fallback: check if errors are in data property
          else if (error?.data && typeof error.data === "object") {
            Object.keys(error.data).forEach((field) => {
              const fieldError = error.data[field];
              let errorMsg = "";

              if (Array.isArray(fieldError)) {
                errorMsg = fieldError[0] || fieldError.join(", ");
              } else if (typeof fieldError === "string") {
                errorMsg = fieldError;
              }

              if (errorMsg) {
                fieldErrors[field] = errorMsg;
                const fieldLabel = field
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");
                errorMessages.push(`${fieldLabel}: ${errorMsg}`);
              }
            });
          }

          setErrors(fieldErrors);

          // Show error messages as toast
          if (errorMessages.length > 0) {
            showError("Failed to add employee");
          } else {
            const errorMessage =
              error?.message || error?.detail || "Failed to add employee";
            showError("Failed to add employee");
          }
        }
      );
    } else {
      console.log("Form validation failed:", errors);
    }
  };
  const handleCancel = () => {
    resetForm();
    onClose();
  };

  // Reset and close modal
  const resetForm = () => {
    setFormData({
      email: "",
      user_name: "",
      first_name: "",
      last_name: "",
      emp_code: "",
      dob_date: "",
      doj_date: "",
      address: "",
      mobile: "",
      gender: "",
      profile_picture: null,
      department: "",
      role: "",
      password: "",
      confirm_password: "",
      sslcCertificate: null,
      relieving_letter: null,
      bank_passbook: null,
      salary_slips: null,
      aadhaar_card: null,
      pan_card: null,
    });
    setImagePreview(null);
    setDocumentPreviews({});
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="bg-black/50 fixed inset-0 z-50 flex max-h-screen items-center justify-center overflow-y-auto p-4 backdrop-blur-sm">
      <div className="relative max-h-screen w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-navy-800">
        {/* Modal Header */}
        <div className="sticky top-0 border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-navy-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <MdEdit className="h-6 w-6" />
              <h2 className="text-2xl font-bold text-navy-700 dark:text-white">
                {isEditMode ? " Edit Employee" : "Add New Employee"}
              </h2>
            </div>
            <button
              onClick={handleCancel}
              className="text-2xl font-bold text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* ===== PROFILE PICTURE SECTION ===== */}
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-navy-700">
            <div className="flex items-center space-x-2">
              <FaCamera />
              <h3 className=" text-lg font-bold text-navy-700 dark:text-white">
                Profile Picture
              </h3>
            </div>
            <div className="flex gap-6">
              {/* Image Preview */}
              <label className="flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-white transition hover:border-brand-500 dark:border-gray-600 dark:bg-navy-800">
                {imagePreview ? (
                  <img
                    src={
                      imagePreview.startsWith("http") ||
                      imagePreview.startsWith("data:")
                        ? imagePreview
                        : `https://insoluble-unseparately-delena.ngrok-free.dev/api${imagePreview}`
                    }
                    alt="Profile Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <MdCloudUpload className="mx-auto text-4xl text-gray-400" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  className=""
                />
              </label>

              {/* Upload Section */}
              <div className="flex flex-1 flex-col justify-center">
                <label className="mb-3 block text-sm font-bold text-navy-700 dark:text-white">
                  Upload Image (Max 4MB)
                </label>
                <label className="inline-block cursor-pointer rounded-lg bg-brand-500 px-6 py-2 text-sm font-bold text-white transition hover:bg-brand-600">
                  Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    cons
                    style={{ display: "none" }}
                  />
                </label>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData({ ...formData, profile_picture: null });
                    }}
                    className="mt-2 text-sm font-bold text-red-500 hover:text-red-600"
                  >
                    Remove Image
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ===== ACCOUNT INFORMATION - Only show when adding new employee ===== */}
          {(isSuperAdmin || !isEditMode) && (
            <div className="space-y-4">
              <div className="flex items-center space-x-1">
                <FaInfoCircle className="h-5 w-5" />
                <h3 className="text-lg font-bold text-navy-700 dark:text-white">
                  Account Information
                </h3>
              </div>

              {/* Gender Radio Buttons */}
              <div>
                <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-6">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={handleInputChange}
                      className="form-radio text-brand-500"
                    />
                    <span className="ml-2 text-navy-700 dark:text-white">
                      Male
                    </span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleInputChange}
                      className="form-radio text-brand-500"
                    />
                    <span className="ml-2 text-navy-700 dark:text-white">
                      Female
                    </span>
                  </label>
                </div>
              </div>

              {/* Email & Username */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                    className={`w-full rounded-lg border-2 bg-white px-4 py-2.5 text-navy-700 placeholder-gray-400 transition dark:bg-navy-700 dark:text-white ${
                      errors.email
                        ? "border-red-500"
                        : "border-gray-200 focus:border-brand-500 dark:border-gray-700"
                    } focus:outline-none`}
                  />
                  {errors.email && (
                    <span className="mt-1 block text-sm text-red-500">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleInputChange}
                    placeholder="Enter username"
                    className={`w-full rounded-lg border-2 bg-white px-4 py-2.5 text-navy-700 placeholder-gray-400 transition dark:bg-navy-700 dark:text-white ${
                      errors.user_name
                        ? "border-red-500"
                        : "border-gray-200 focus:border-brand-500 dark:border-gray-700"
                    } focus:outline-none`}
                  />
                  {errors.user_name && (
                    <span className="mt-1 block text-sm text-red-500">
                      {errors.user_name}
                    </span>
                  )}
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter password"
                      className={`w-full rounded-lg border-2 bg-white px-4 py-2.5 pr-10 text-navy-700 placeholder-gray-400 transition dark:bg-navy-700 dark:text-white ${
                        errors.password
                          ? "border-red-500"
                          : "border-gray-200 focus:border-brand-500 dark:border-gray-700"
                      } focus:outline-none`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-4  hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="mt-1 block text-sm text-red-500">
                      {errors.password}
                    </span>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirm_password"
                      value={formData.confirm_password}
                      onChange={handleInputChange}
                      placeholder="Confirm password"
                      className={`w-full rounded-lg border-2 bg-white px-4 py-2.5 pr-10 text-navy-700 placeholder-gray-400 transition dark:bg-navy-700 dark:text-white ${
                        errors.confirm_password
                          ? "border-red-500"
                          : "border-gray-200 focus:border-brand-500 dark:border-gray-700"
                      } focus:outline-none`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-4  hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                  {errors.confirm_password && (
                    <span className="mt-1 block text-sm text-red-500">
                      {errors.confirm_password}
                    </span>
                  )}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                    Employee ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="emp_code"
                    value={formData.emp_code}
                    onChange={handleInputChange}
                    placeholder="Enter employee ID"
                    className={`w-full rounded-lg border-2 bg-white px-4 py-2.5 text-navy-700 placeholder-gray-400 transition dark:bg-navy-700 dark:text-white ${
                      errors.emp_code
                        ? "border-red-500"
                        : "border-gray-200 focus:border-brand-500 dark:border-gray-700"
                    } focus:outline-none`}
                  />
                  {errors.emp_code && (
                    <span className="mt-1 block text-sm text-red-500">
                      {errors.emp_code}
                    </span>
                  )}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                    Joining Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="doj_date"
                    value={formData.doj_date}
                    onChange={handleInputChange}
                    className={`w-full cursor-pointer rounded-lg border-2 bg-white px-4 py-2.5 text-navy-700 transition dark:bg-navy-700 dark:text-white ${
                      errors.doj_date
                        ? "border-red-500"
                        : "border-gray-200 focus:border-brand-500 dark:border-gray-700"
                    } focus:outline-none`}
                  />
                  {errors.doj_date && (
                    <span className="mt-1 block text-sm text-red-500">
                      {errors.doj_date}
                    </span>
                  )}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                    Department
                  </label>
                  <select
                    name="department"
                    value={String(formData.department)}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-2.5 text-navy-700 transition focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-navy-700 dark:text-white"
                  >
                    <option value="">Select Department</option>
                    {Array.isArray(departments) &&
                      departments.map((dept) => (
                        <option key={dept.departid} value={dept.departid}>
                          {dept.department_name}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="role"
                    value={String(formData.role)}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      setFormData({ ...formData, [name]: value });
                    }}
                    className={`w-full rounded-lg border-2 bg-white px-4 py-2.5 text-navy-700 transition dark:bg-navy-700 dark:text-white ${
                      errors.role
                        ? "border-red-500"
                        : "border-gray-200 focus:border-brand-500 dark:border-gray-700"
                    } focus:outline-none`}
                  >
                    <option value="">Select Role</option>
                    {Array.isArray(roles) &&
                      roles.map((role) => (
                        <option key={role.roleid} value={role.roleid}>
                          {role.role_name}
                        </option>
                      ))}
                  </select>
                  {errors.role && (
                    <span className="mt-1 block text-sm text-red-500">
                      {errors.role}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ===== PERSONAL INFORMATION ===== */}
          <div className="space-y-4">
            <div className="flex items-center space-x-1">
              <MdAccountBox className="h-5 w-5" />
              <h3 className="text-lg font-bold text-navy-700 dark:text-white">
                Personal Information
              </h3>
            </div>

            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                  className={`w-full rounded-lg border-2 bg-white px-4 py-2.5 text-navy-700 placeholder-gray-400 transition dark:bg-navy-700 dark:text-white ${
                    errors.first_name
                      ? "border-red-500"
                      : "border-gray-200 focus:border-brand-500 dark:border-gray-700"
                  } focus:outline-none`}
                />
                {errors.first_name && (
                  <span className="mt-1 block text-sm text-red-500">
                    {errors.first_name}
                  </span>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                  className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-2.5 text-navy-700 placeholder-gray-400 transition focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-navy-700 dark:text-white"
                />
              </div>
            </div>

            {/* Employee ID & Date of Birth */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dob_date"
                  value={formData.dob_date}
                  onChange={handleInputChange}
                  className={`w-full cursor-pointer rounded-lg border-2 bg-white px-4 py-2.5 text-navy-700 transition dark:bg-navy-700 dark:text-white ${
                    errors.dob_date
                      ? "border-red-500"
                      : "border-gray-200 focus:border-brand-500 dark:border-gray-700"
                  } focus:outline-none`}
                />
                {errors.dob_date && (
                  <span className="mt-1 block text-sm text-red-500">
                    {errors.dob_date}
                  </span>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter address"
                  className={`w-full rounded-lg border-2 bg-white px-4 py-2.5 text-navy-700 placeholder-gray-400 transition dark:bg-navy-700 dark:text-white ${
                    errors.address
                      ? "border-red-500"
                      : "border-gray-200 focus:border-brand-500 dark:border-gray-700"
                  } focus:outline-none`}
                />
                {errors.address && (
                  <span className="mt-1 block text-sm text-red-500">
                    {errors.address}
                  </span>
                )}
              </div>
            </div>

            {/* Joining Date & Address */}
            <div className="grid grid-cols-2 gap-4"></div>

            {/* Phone Number & Department */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  className={`w-full rounded-lg border-2 bg-white px-4 py-2.5 text-navy-700 placeholder-gray-400 transition dark:bg-navy-700 dark:text-white ${
                    errors.mobile
                      ? "border-red-500"
                      : "border-gray-200 focus:border-brand-500 dark:border-gray-700"
                  } focus:outline-none`}
                />
                {errors.mobile && (
                  <span className="mt-1 block text-sm text-red-500">
                    {errors.mobile}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ===== DOCUMENTS SECTION ===== */}
          <div className="space-y-4">
            <div className="flex items-center space-x-1">
              <IoDocumentAttach className="h-5 w-5" />
              <h3 className="text-lg font-bold text-navy-700 dark:text-white">
                Required Documents
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="text-red-500">*</span> indicates mandatory
              documents. Max 10MB per file (PDF or Image).
            </p>

            <div className="grid grid-cols-2 gap-4">
              {Object.entries(documents).map(([docKey, docInfo]) => (
                <div key={docKey}>
                  <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                    {docInfo.label}
                    {docInfo.required && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>

                  <div
                    className={`relative rounded-lg border-2 border-dashed bg-gray-50 p-4 text-center transition dark:bg-navy-700 ${
                      errors[docKey]
                        ? "border-red-500"
                        : "border-gray-300 hover:border-brand-500 dark:border-gray-600"
                    }`}
                  >
                    {formData[docKey] ? (
                      <div className="space-y-2">
                        {documentPreviews[docKey]?.type === "image" ? (
                          <img
                            src={documentPreviews[docKey].src}
                            alt={docInfo.label}
                            className="mx-auto h-32 w-full rounded object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center text-4xl">
                            📄
                          </div>
                        )}
                        <p className="text-xs font-bold text-navy-700 dark:text-white">
                          {formData[docKey].name}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, [docKey]: null });
                            setDocumentPreviews({
                              ...documentPreviews,
                              [docKey]: null,
                            });
                          }}
                          className="text-xs font-bold text-red-500 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <div className="space-y-2">
                          <MdCloudUpload className="mx-auto text-3xl text-gray-400" />
                          <p className="text-xs font-bold text-gray-600 dark:text-gray-400">
                            Click to upload
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            PDF or Image
                          </p>
                        </div>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png,.webp"
                          onChange={(e) => handleDocumentChange(e, docKey)}
                          style={{ display: "none" }}
                        />
                      </label>
                    )}
                  </div>
                  {errors[docKey] && (
                    <span className="mt-1 block text-sm text-red-500">
                      {errors[docKey]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 border-t border-gray-200 pt-6 dark:border-gray-700">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-brand-500 px-4 py-3 font-bold text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-500"
            >
              {isEditMode ? " Update Employee" : "Add Employee"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 rounded-lg border-2 border-gray-200 bg-white px-4 py-3 font-bold text-navy-700 transition duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-navy-700 dark:text-white dark:hover:bg-navy-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
