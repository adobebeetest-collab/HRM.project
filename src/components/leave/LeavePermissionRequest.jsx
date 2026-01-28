import React, { useState, useEffect } from "react";
import {
  FaCalendarPlus,
  FaTimes,
  FaUser,
  FaBuilding,
  FaBriefcase,
  FaCalendar,
  FaClock,
  FaTag,
  FaComment,
  FaCompass,
  FaPaperPlane,
} from "react-icons/fa";
import leaveAPI from "services/leaveAPI";
import employeeAPI from "services/employeeAPI";
import { showSuccess, showError } from "utils/toastHelper";

export default function LeavePermissionRequest({
  editData = null,
  onClose = null,
  leaveTypes: propsLeaveTypes = [],
  requestTypes: propsRequestTypes = [],
}) {
  // Declare leaveTypes state at the top before any usage
  const [leaveTypes, setLeaveTypes] = useState(propsLeaveTypes || []);

  // Helper function to format date for input type="date"
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    } catch (error) {
      return dateString;
    }
  };

  // ✅ STEP 1: CREATE STATE FOR BACKEND DATA AND USER SELECTION
  const [requestTypes, setRequestTypes] = useState(propsRequestTypes || []);
  const [requestTypeId, setRequestTypeId] = useState(
    editData?.request_type || null
  );

  const [isOpen, setIsOpen] = useState(!!editData);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(!!editData);
  useEffect(() => {
    setIsEditMode(!!editData);
    // Fix: When editing, set correct requestTypeId so update API triggers
    if (editData && requestTypes.length > 0) {
      const matchingType = requestTypes.find(
        (type) =>
          type.request_type === editData.request_type ||
          type.requestid === editData.request_type ||
          type.requestid === editData.request_typeid
      );
      if (matchingType) {
        setRequestTypeId(matchingType.requestid);
      }
    }
  }, [editData, requestTypes]);
  console.log("Edit Data:", editData);

  // Leave Form State
  const [leaveForm, setLeaveForm] = useState({
    leave_type:
      (editData?.leave_typeid || editData?.leave_type || "")?.toString() ?? "",
    request_type: editData?.request_type || "",
    from_date: formatDateForInput(editData?.from_date) || "",
    to_date: formatDateForInput(editData?.to_date) || "",
    end_date: formatDateForInput(editData?.to_date) || "",
    leave_duration: editData?.duration_type || "",
    half_day_type: editData?.half_day_type || "first",
    leave_reason: editData?.reason || "",
    requestType: 0,
  });

  // Sync leave_type and leave_duration with editData for edit mode
  useEffect(() => {
    if (
      isEditMode &&
      editData &&
      Array.isArray(leaveTypes) &&
      leaveTypes.length > 0
    ) {
      // Try to match by id or name
      let matchId = "";
      if (editData.leave_typeid) {
        matchId = editData.leave_typeid.toString();
      } else if (editData.leave_type) {
        // Try to match by id (number or string)
        const byId = leaveTypes.find(
          (type) =>
            type.leave_typeid?.toString() === editData.leave_type?.toString()
        );
        if (byId) matchId = byId.leave_typeid.toString();
        else {
          // Try to match by name
          const byName = leaveTypes.find(
            (type) =>
              type.leave_type_name?.toLowerCase() ===
              editData.leave_type?.toLowerCase()
          );
          if (byName) matchId = byName.leave_typeid.toString();
        }
      } else if (editData.leave_type_name) {
        const byName = leaveTypes.find(
          (type) =>
            type.leave_type_name?.toLowerCase() ===
            editData.leave_type_name?.toLowerCase()
        );
        if (byName) matchId = byName.leave_typeid.toString();
      }

      // Always set leave_type and leave_duration from editData in edit mode
      setLeaveForm((prev) => ({
        ...prev,
        leave_type: matchId,
        leave_duration: editData.duration_type || "fullday",
      }));
    } else if (
      !isEditMode &&
      Array.isArray(leaveTypes) &&
      leaveTypes.length > 0
    ) {
      // Set default leave_duration to 'fullday' if not set in create mode
      setLeaveForm((prev) => ({
        ...prev,
        leave_duration: prev.leave_duration || "fullday",
      }));
    }
  }, [isEditMode, editData?.duration_type, editData, leaveTypes]);

  // Permission Form State
  const [permissionForm, setPermissionForm] = useState({
    from_date: formatDateForInput(editData?.from_date) || "",
    start_time: editData?.start_time || "",
    end_time: editData?.end_time || "",
    reason: editData?.reason || "",
    requestType: 0,
  });

  useEffect(() => {
    // Only load if not provided as props
    if (propsLeaveTypes.length === 0) {
      loadLeaveTypes();
    }

    if (propsRequestTypes.length === 0) {
      loadRequestTypes();
    } else {
      setRequestTypes(propsRequestTypes);
    }
  }, []);

  // When requestTypes are loaded and we're in edit mode, find and set the correct request type ID
  useEffect(() => {
    if (isEditMode && editData?.request_type && requestTypes.length > 0) {
      // Find the request type ID that matches the editData request_type name
      const matchingType = requestTypes.find(
        (type) => type.request_type === editData.request_type
      );
      if (matchingType) {
        setRequestTypeId(matchingType.requestid);
      }
    }
  }, [requestTypes, isEditMode, editData]);

  // Load departments and roles when modal opens

  const loadLeaveTypes = () => {
    leaveAPI.getLeaveTypes(
      (data) => {
        const types = Array.isArray(data)
          ? data
          : data?.results || data?.data || [];
        setLeaveTypes(types);
      },
      (error) => {
        setLeaveTypes([]);
      }
    );
  };

  const loadRequestTypes = () => {
    leaveAPI.getRequestTypes(
      (data) => {
        const types = Array.isArray(data)
          ? data
          : data?.results || data?.data || [];
        setRequestTypes(types);
        // Set Leave as default (first request type)
        if (types.length > 0) {
          setRequestTypeId(types[0].requestid);
        }
      },
      (error) => {
        setRequestTypes([]);
      }
    );
  };

  const handleLeaveInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveForm({
      ...leaveForm,
      [name]: name === "leave_type" ? value : value,
    });
  };

  // Handle Tab key to submit leave form
  const handleLeaveKeyDown = (e) => {
    if (e.key === "Tab" && e.shiftKey === false) {
      // Check if all required fields are filled
      if (leaveForm.leave_type && leaveForm.from_date) {
        e.preventDefault();
        handleSubmitLeave(e);
      }
    }
  };

  const handlePermissionInputChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...permissionForm, [name]: value };

    // Auto-calculate end time when start_time changes (always 2 hours)
    if (name === "start_time" && value) {
      const [hour, minute] = value.split(":").map(Number);
      const totalMinutes = hour * 60 + minute + 2 * 60; // Add 2 hours
      const endHour = Math.floor(totalMinutes / 60) % 24;
      const endMinute = totalMinutes % 60;
      updatedForm.end_time = `${String(endHour).padStart(2, "0")}:${String(
        endMinute
      ).padStart(2, "0")}`;
    }

    setPermissionForm(updatedForm);
  };

  // Handle Tab key to submit permission form
  const handlePermissionKeyDown = (e) => {
    if (e.key === "Tab" && e.shiftKey === false) {
      // Check if all required fields are filled
      if (permissionForm.from_date && permissionForm.start_time) {
        e.preventDefault();
        handleSubmitPermission(e);
      }
    }
  };

  const handleSubmitLeave = (e) => {
    e.preventDefault();

    if (!leaveForm.leave_type || !leaveForm.from_date) {
      showError("Please fill in all required fields");
      return;
    }

    setLoading(true);

    const submitData = {
      leave_type: leaveForm.leave_type,
      from_date: leaveForm.from_date,
      to_date:
        leaveForm.leave_duration === "fullday" ||
        leaveForm.leave_duration === "halfday"
          ? leaveForm.from_date
          : leaveForm.end_date,
      reason: leaveForm.leave_reason,
      duration_type: leaveForm.leave_duration,
      half_day_type: leaveForm.half_day_type,
      request_type: requestTypeId,
      employee: localStorage.getItem("user_id"),
    };

    // Debug log to help user see why update is not triggered
    console.log("isEditMode:", isEditMode, "editData:", editData);

    if (isEditMode && editData?.id) {
      // Update existing leave request using updateLeaveAction (correct endpoint)
      leaveAPI.updateLeaveAction(
        editData.id,
        { ...submitData, status: "Updated" },
        (response) => {
          // Show SweetAlert2 popup
          if (window.Swal) {
            window.Swal.fire({
              icon: "success",
              title: "Success",
              text: "Leave request updated successfully!",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "OK",
            }).then(() => {
              setIsOpen(false);
              setLoading(false);
              if (onClose) onClose();
            });
          } else {
            showSuccess("Leave request updated successfully!");
            setIsOpen(false);
            setLoading(false);
            if (onClose) onClose();
          }
        },
        (error) => {
          showError("Failed to update leave request");
          setLoading(false);
        }
      );
    } else {
      // Create new leave request
      leaveAPI.applyLeave(
        submitData,
        (response) => {
          setLeaveForm({
            leave_type: "",
            from_date: "",
            to_date: "",
            half_day_type: "first",
            leave_reason: "",
          });
          setIsOpen(false);
          setLoading(false);
          if (onClose) onClose();
        },
        (error) => {
          showError(error?.message || "Failed to submit leave request");
          setLoading(false);
        }
      );
    }
  };

  const handleSubmitPermission = (e) => {
    e.preventDefault();

    if (!permissionForm.from_date || !permissionForm.start_time) {
      showError("Please fill in all required fields");
      return;
    }

    setLoading(true);

    const submitData = {
      request_type: requestTypeId,
      from_date: permissionForm.from_date,
      duration_hours: 2,
      start_time: permissionForm.start_time,
      reason: permissionForm.permission_reason,
      employee: localStorage.getItem("user_id"),
    };

    if (isEditMode && editData?.id) {
      // Update existing permission request using updateLeaveAction
      leaveAPI.updateLeaveAction(
        editData.id,
        { ...submitData, status: "Updated" },
        (response) => {
          if (window.Swal) {
            window.Swal.fire({
              icon: "success",
              title: "Success",
              text: "Permission request updated successfully!",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "OK",
            }).then(() => {
              setIsOpen(false);
              setLoading(false);
              if (onClose) onClose();
            });
          } else {
            showSuccess("Permission request updated successfully!");
            setIsOpen(false);
            setLoading(false);
            if (onClose) onClose();
          }
        },
        (error) => {
          showError("Failed to update permission request");
          setLoading(false);
        }
      );
    } else {
      // Create new permission request
      leaveAPI.applyLeave(
        submitData,
        (response) => {
          setPermissionForm({
            from_date: "",
            start_time: "",
            permission_reason: "",
            permission_description: "",
          });
          setIsOpen(false);
          setLoading(false);
          if (onClose) onClose();
        },
        (error) => {
          showError(error?.message || "Failed to submit permission request");
          setLoading(false);
        }
      );
    }
  };

  return (
    <>
      {/* Open Button - Only show when not in edit mode */}
      {!isEditMode && (
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-8 py-2 font-bold text-white transition duration-200 hover:bg-brand-600"
        >
          <FaCalendarPlus /> Leave & Permission Request
        </button>
      )}

      {/* Modal Overlay */}
      {isOpen && (
        <div className="bg-black/50 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-navy-800">
            {/* Modal Header */}
            <div className="sticky top-0 border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-navy-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaCalendarPlus className="text-xl text-brand-500" />
                  <h2 className="text-2xl font-bold text-navy-700 dark:text-white">
                    {isEditMode
                      ? "Update Leave & Permission Request"
                      : "Leave & Permission Request"}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    if (onClose) onClose();
                  }}
                  className="text-2xl font-bold text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="space-y-6 p-6">
              {/* Request Type Selection - Only show when creating new request */}
              {!isEditMode && (
                <div className="rounded-lg bg-gray-50 p-4 dark:bg-navy-700">
                  <h3 className="mb-4 text-sm font-bold text-navy-700 dark:text-white">
                    Select Request Type
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    {/* ✅ STEP 3: DYNAMIC RADIO BUTTONS FROM BACKEND */}
                    {requestTypes.map((type) => (
                      <label
                        key={type.requestid}
                        className="relative flex cursor-pointer items-center rounded-lg border-2 border-gray-200 p-4 transition hover:border-brand-500 dark:border-gray-700 dark:hover:border-brand-500"
                      >
                        <input
                          type="radio"
                          name="request_type"
                          value={type.requestid}
                          checked={requestTypeId === type.requestid}
                          onChange={() => setRequestTypeId(type.requestid)}
                          className="h-4 w-4 cursor-pointer"
                        />
                        <span className="ml-3 font-bold text-navy-700 dark:text-white">
                          {type.request_type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Leave Request Form */}
              {requestTypeId === requestTypes[0]?.requestid && (
                <form
                  onSubmit={handleSubmitLeave}
                  onKeyDown={handleLeaveKeyDown}
                  className="space-y-6"
                >
                  {/* Leave Details Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <FaCalendar className="text-navy-700 dark:text-white" />
                      <h3 className="text-lg font-bold text-navy-700 dark:text-white">
                        Leave Details
                      </h3>
                    </div>

                    <div className="space-y-4 rounded-lg bg-gray-50 p-4 dark:bg-navy-700">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                            Leave Type <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="leave_type"
                            value={leaveForm.leave_type?.toString() ?? ""}
                            onChange={handleLeaveInputChange}
                            required
                            className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-2.5 text-navy-700 transition focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-navy-700 dark:text-white"
                          >
                            <option value="">Select Leave Type</option>
                            {Array.isArray(leaveTypes) &&
                              leaveTypes.map((type) => (
                                <option
                                  key={type.leave_typeid}
                                  value={type.leave_typeid.toString()}
                                >
                                  {type.leave_type_name}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                            Duration <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="leave_duration"
                            value={leaveForm.leave_duration?.toString() ?? ""}
                            onChange={handleLeaveInputChange}
                            required
                            className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-2.5 text-navy-700 transition focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-navy-700 dark:text-white"
                          >
                            <option value="">Select Duration</option>
                            <option value="fullday">Full Day</option>
                            <option value="halfday">Half Day</option>
                            <option value="multiple">Multiple Days</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                            Start Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            name="from_date"
                            value={leaveForm.from_date}
                            onChange={handleLeaveInputChange}
                            required
                            className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-2.5 text-navy-700 transition focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-navy-700 dark:text-white"
                          />
                        </div>
                        {leaveForm.leave_duration === "multiple" && (
                          <div>
                            <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                              End Date <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="date"
                              name="end_date"
                              value={leaveForm.end_date}
                              onChange={handleLeaveInputChange}
                              required
                              className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-2.5 text-navy-700 transition focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-navy-700 dark:text-white"
                            />
                          </div>
                        )}
                      </div>

                      {leaveForm.leave_duration === "halfday" && (
                        <div>
                          <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                            Half Day Type{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="half_day_type"
                            value={leaveForm.half_day_type}
                            onChange={handleLeaveInputChange}
                            className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-2.5 text-navy-700 transition focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-navy-700 dark:text-white"
                          >
                            <option value="first">First Half</option>
                            <option value="second">Second Half</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Request Information Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-navy-700 dark:text-white">
                        Request Information
                      </h3>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                        Reason
                      </label>
                      <textarea
                        name="leave_reason"
                        value={leaveForm.leave_reason}
                        onChange={handleLeaveInputChange}
                        rows="4"
                        placeholder="Enter reason for leave request..."
                        className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-2.5 text-navy-700 placeholder-gray-400 transition focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-navy-700 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 border-t border-gray-200 pt-6 dark:border-gray-700">
                    <button
                      type="submit"
                      className="flex-1 rounded-lg bg-brand-500 px-4 py-3 font-bold text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-500"
                      disabled={loading}
                    >
                      {loading
                        ? isEditMode
                          ? "Updating..."
                          : "Submitting..."
                        : isEditMode
                        ? "Update Request"
                        : "Submit Request"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        if (onClose) onClose();
                      }}
                      className="flex-1 rounded-lg border-2 border-gray-200 bg-white px-4 py-3 font-bold text-navy-700 transition duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-navy-700 dark:text-white dark:hover:bg-navy-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Permission Request Form */}
              {requestTypeId === requestTypes[1]?.requestid && (
                <form
                  onSubmit={handleSubmitPermission}
                  onKeyDown={handlePermissionKeyDown}
                  className="space-y-6"
                >
                  {/* Employee Information Section */}
                  {/* <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <FaUser className="text-navy-700 dark:text-white" />
                                            <h3 className="text-lg font-bold text-navy-700 dark:text-white">
                                                Employee Information
                                            </h3>
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                                                Employee Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="employee_name"
                                                value={permissionForm.employee_name}
                                                onChange={handlePermissionInputChange}
                                                
                                               
                                                placeholder="Enter employee name"
                                                className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-2.5 text-navy-700 placeholder-gray-400 transition focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-navy-700 dark:text-white"
                                            />
                                        </div>
                                    </div> */}

                  {/* Permission Details Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <FaClock className="text-navy-700 dark:text-white" />
                      <h3 className="text-lg font-bold text-navy-700 dark:text-white">
                        Permission Details
                      </h3>
                    </div>

                    <div className="space-y-4 rounded-lg bg-gray-50 p-4 dark:bg-navy-700">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                            Permission Date{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            name="from_date"
                            value={permissionForm.from_date}
                            onChange={handlePermissionInputChange}
                            className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-2.5 text-navy-700 transition focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-navy-700 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                            Duration <span className="text-red-500">*</span>
                          </label>
                          <div className="flex w-full items-center rounded-lg border-2 border-gray-300 bg-gray-100 px-4 py-2.5 font-bold text-navy-700 dark:border-gray-600 dark:bg-navy-600 dark:text-white">
                            2 Hours (Fixed)
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                            Start Time <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="time"
                            name="start_time"
                            value={permissionForm.start_time}
                            onChange={handlePermissionInputChange}
                            className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-2.5 text-navy-700 transition focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-navy-700 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                            End Time <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="time"
                            name="end_time"
                            value={permissionForm.end_time}
                            readOnly
                            className="w-full cursor-not-allowed rounded-lg border-2 border-gray-300 bg-gray-100 px-4 py-2.5 text-navy-700 dark:border-gray-600 dark:bg-navy-600 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Request Information Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-navy-700 dark:text-white">
                        Request Information
                      </h3>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                        Reason
                      </label>
                      <textarea
                        name="permission_reason"
                        value={permissionForm.permission_reason}
                        onChange={handlePermissionInputChange}
                        rows="4"
                        placeholder="Enter reason for permission request..."
                        className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-2.5 text-navy-700 placeholder-gray-400 transition focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-navy-700 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 border-t border-gray-200 pt-6 dark:border-gray-700">
                    <button
                      type="submit"
                      className="flex-1 rounded-lg bg-brand-500 px-4 py-3 font-bold text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-500"
                      disabled={loading}
                    >
                      {loading
                        ? isEditMode
                          ? "Updating..."
                          : "Submitting..."
                        : isEditMode
                        ? "Update Request"
                        : "Submit Request"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        if (onClose) onClose();
                      }}
                      className="flex-1 rounded-lg border-2 border-gray-200 bg-white px-4 py-3 font-bold text-navy-700 transition duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-navy-700 dark:text-white dark:hover:bg-navy-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
