import React, { useState, useEffect, useMemo } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaUserClock,
} from "react-icons/fa";
import { MdClose, MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
import calendarAPI from "../../services/calendarAPI";
import { MdDelete } from "react-icons/md";
import { useAuth } from "../../contexts/AuthContext";

export default function Calendar() {
  const { isSuperAdmin } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [viewMode, setViewMode] = useState("month");
  const [showHolidayModal, setShowHolidayModal] = useState(false);
  const [holidayForm, setHolidayForm] = useState({
    holiday_date: "",
    holiday_name: "",
    description: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingHoliday, setEditingHoliday] = useState(null);
  const [eventForm, setEventForm] = useState({
    date: "",
    name: "",
    time: "",
    category: "work",
    description: "",
  });

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const daysInPrevMonth = getDaysInMonth(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );

    const days = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        date: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          daysInPrevMonth - i
        ),
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), i),
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          i
        ),
      });
    }

    return days;
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const calendarDays = useMemo(() => generateCalendarDays(), [currentDate]);

  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Month navigation
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  // Week navigation
  const handlePrevWeek = () => {
    const prevWeek = new Date(currentDate);
    prevWeek.setDate(currentDate.getDate() - 7);
    setCurrentDate(prevWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);
    setCurrentDate(nextWeek);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const handleAddHoliday = () => {
    if (!holidayForm.holiday_date || !holidayForm.holiday_name) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill in both date and holiday name",
      });
      return;
    }

    // Prevent editing if not superadmin
    if (isEditMode && !isSuperAdmin) {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "You don't have permission to edit holidays",
      });
      return;
    }

    const holidayData = {
      holiday_date: holidayForm.holiday_date,
      holiday_name: holidayForm.holiday_name,
      description: holidayForm.description,
    };

    if (isEditMode && editingHoliday) {
      // Update existing holiday
      calendarAPI.updateHoliday(
        editingHoliday.holidayid,
        holidayData,
        (response) => {
          setHolidayForm({
            holiday_date: "",
            holiday_name: "",
            description: "",
          });
          setShowHolidayModal(false);
          setIsEditMode(false);
          setEditingHoliday(null);
          loadHolidays();

          Swal.fire({
            icon: "success",
            title: "Holiday Updated",
            text: `${holidayForm.holiday_name} has been updated`,
            timer: 2000,
          });
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to update holiday",
          });
        }
      );
    } else {
      // Create new holiday
      calendarAPI.createHoliday(
        holidayData,
        (response) => {
          setHolidayForm({
            holiday_date: "",
            holiday_name: "",
            description: "",
          });
          setShowHolidayModal(false);
          loadHolidays();

          Swal.fire({
            icon: "success",
            title: "Holiday Added",
            text: `${holidayForm.holiday_name} has been added to ${holidayForm.holiday_date}`,
            timer: 2000,
          });
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to add holiday",
          });
        }
      );
    }
  };

  const handleDeleteHoliday = (id) => {
    Swal.fire({
      title: "Delete Holiday?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        calendarAPI.deleteHoliday(
          id,
          (response) => {
            loadHolidays();
            Swal.fire({
              icon: "success",
              title: "Deleted",
              text: "Holiday removed successfully",
              timer: 1500,
            });
          },
          (error) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Failed to delete holiday",
            });
          }
        );
      }
    });
  };

  const handleEditHoliday = (holiday) => {
    setIsEditMode(true);
    setEditingHoliday(holiday);
    setHolidayForm({
      holiday_date: holiday.holiday_date,
      holiday_name: holiday.holiday_name,
      description: holiday.description || "",
    });
    setShowHolidayModal(true);
  };

  const handleAddEvent = () => {
    // Format selected date properly (YYYY-MM-DD)
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const defaultDateStr = `${year}-${month}-${day}`;

    const dateStr = eventForm.date || defaultDateStr;

    if (!dateStr || !eventForm.name) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill in both date and event name",
      });
      return;
    }

    const eventData = {
      date: dateStr,
      name: eventForm.name,
      time: eventForm.time || "",
      category: eventForm.category || "work",
      description: eventForm.description || "",
    };

    calendarAPI.createEvent(
      eventData,
      (response) => {
        // setEventForm({ date: "", name: "", time: "", category: "work", description: "" });
        setShowHolidayModal(false);
        loadEvents();

        Swal.fire({
          icon: "success",
          title: "Event Added",
          text: `${eventForm.name} has been added to ${dateStr}`,
          timer: 2000,
        });
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add event",
        });
      }
    );
  };

  const isHolidayDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;
    return holidays.find((h) => h.holiday_date === dateStr);
  };

  const isLeaveDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;
    return leaves.find((l) => l.from_date <= dateStr && l.to_date >= dateStr);
  };

  const isEventDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;
    return events.find((e) => e.date === dateStr);
  };

  const getWeekDays = () => {
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - currentDate.getDay());

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      weekDays.push(day);
    }
    return weekDays;
  };

  const weekDays = getWeekDays();

  // Load holidays and events from API on component mount
  useEffect(() => {
    loadHolidays();
    loadLeaves();
    loadEvents();
  }, []);

  // Set event form date when modal opens
  useEffect(() => {
    if (showHolidayModal && selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;
      setEventForm((prev) => ({ ...prev, date: dateStr }));
    }
  }, [showHolidayModal]);

  const loadHolidays = () => {
    calendarAPI.getAllHolidays(
      (response) => {
        if (response?.data) {
          const holidaysData = Array.isArray(response.data)
            ? response.data
            : response.data.results || [];
          setHolidays(holidaysData);
        }
      },
      (error) => {}
    );
  };

  const loadLeaves = () => {
    calendarAPI.getAllLeaves(
      (response) => {
        if (response?.data) {
          const leavesData = Array.isArray(response.data)
            ? response.data
            : response.data.results || [];
          setLeaves(leavesData);
        }
      },
      (error) => {}
    );
  };

  const loadEvents = () => {
    calendarAPI.getAllEvents(
      (response) => {
        if (response?.data) {
          const eventsData = Array.isArray(response.data)
            ? response.data
            : response.data.results || [];
          setEvents(eventsData);
        }
      },
      (error) => {}
    );
  };

  // Separate function for '+ Holiday' button - Always opens in ADD mode with no default date
  const handleAddHolidayButton = () => {
    setHolidayForm({ holiday_date: "", holiday_name: "", description: "" });
    setIsEditMode(false);
    setEditingHoliday(null);
    setShowHolidayModal(true);
  };

  // Separate function for calendar day click
  const handleCalendarDayClick = (dayObj) => {
    if (dayObj.isCurrentMonth && isSuperAdmin) {
      setSelectedDate(dayObj.date);
      const year = dayObj.date.getFullYear();
      const month = String(dayObj.date.getMonth() + 1).padStart(2, "0");
      const day = String(dayObj.date.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;

      // Check if there's already a holiday on this date
      const existingHoliday = holidays.find((h) => h.holiday_date === dateStr);

      if (existingHoliday) {
        // Edit existing holiday
        setHolidayForm({
          holiday_date: existingHoliday.holiday_date,
          holiday_name: existingHoliday.holiday_name,
          description: existingHoliday.description || "",
        });
        setIsEditMode(true);
        setEditingHoliday(existingHoliday);
      } else {
        // Add new holiday
        setHolidayForm({
          holiday_date: dateStr,
          holiday_name: "",
          description: "",
        });
        setIsEditMode(false);
        setEditingHoliday(null);
      }

      setShowHolidayModal(true);
    }
  };

  return (
    <div className="w-full">
      {/* Calendar Container */}
      <div className="overflow-hidden rounded-lg bg-white shadow-lg dark:bg-navy-800">
        {/* Calendar Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-navy-700 dark:text-white">
            {monthName}
          </h2>
          {/* Navigation Buttons */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1 rounded-lg bg-gray-100 p-1 dark:bg-navy-700">
              <button
                onClick={() => setViewMode("month")}
                className={`rounded px-3 py-1 text-sm font-semibold transition ${
                  viewMode === "month"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-navy-600"
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setViewMode("week")}
                className={`rounded px-3 py-1 text-sm font-semibold transition ${
                  viewMode === "week"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-navy-600"
                }`}
              >
                Week
              </button>
            </div>
            {/* Month or Week navigation */}
            {viewMode === "month" ? (
              <>
                <button
                  onClick={handlePrevMonth}
                  className="rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-navy-700"
                  title="Previous month"
                >
                  <FaChevronLeft className="text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={handleToday}
                  className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Today
                </button>
                <button
                  onClick={handleNextMonth}
                  className="rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-navy-700"
                  title="Next month"
                >
                  <FaChevronRight className="text-gray-600 dark:text-gray-400" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handlePrevWeek}
                  className="rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-navy-700"
                  title="Previous week"
                >
                  <FaChevronLeft className="text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={handleToday}
                  className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Today
                </button>
                <button
                  onClick={handleNextWeek}
                  className="rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-navy-700"
                  title="Next week"
                >
                  <FaChevronRight className="text-gray-600 dark:text-gray-400" />
                </button>
              </>
            )}
            {isSuperAdmin && (
              <button
                onClick={handleAddHolidayButton}
                className="ml-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
              >
                + Holiday
              </button>
            )}
          </div>
        </div>

        {/* Month View */}
        {viewMode === "month" && (
          <>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
              {/* Weekday Headers */}
              {weekdays.map((day) => (
                <div
                  key={day}
                  className="bg-gray-50 p-4 text-center text-sm font-semibold text-gray-600 dark:bg-navy-700 dark:text-gray-400"
                >
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {calendarDays.map((dayObj, index) => {
                const holiday = isHolidayDate(dayObj.date);
                const event = isEventDate(dayObj.date);
                const isTodayCell = isToday(dayObj.date);
                return (
                  <div
                    key={index}
                    onClick={() => handleCalendarDayClick(dayObj)}
                    className={`
                      relative min-h-24 cursor-pointer p-2 transition-all
                      ${
                        dayObj.isCurrentMonth
                          ? "bg-white hover:bg-gray-50 dark:bg-navy-800 dark:hover:bg-navy-700"
                          : "bg-gray-50 dark:bg-navy-700"
                      }
                      ${isTodayCell ? "bg-blue-50 dark:bg-blue-900" : ""}
                      ${
                        isSelected(dayObj.date)
                          ? "bg-blue-500 text-white dark:bg-blue-600"
                          : ""
                      }
                      ${
                        holiday
                          ? "border-2 border-blue-500"
                          : "border border-gray-200 dark:border-gray-700"
                      }
                    `}
                  >
                    <div
                      className={`
                        mb-1 text-right font-semibold
                        ${
                          !dayObj.isCurrentMonth
                            ? "text-gray-400 dark:text-gray-600"
                            : ""
                        }
                        ${
                          isTodayCell && !isSelected(dayObj.date)
                            ? "text-blue-600 dark:text-blue-400"
                            : ""
                        }
                        ${
                          isSelected(dayObj.date)
                            ? "text-gray-900"
                            : "text-gray-900 dark:text-white"
                        }
                      `}
                    >
                      {/* If today, show big blue number and 'Today' label */}
                      {isTodayCell ? (
                        <div className="flex flex-col items-center">
                          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {dayObj.day}
                          </span>
                          <span className="mt-2 w-full border-t border-blue-200"></span>
                          <span className="mt-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
                            Today
                          </span>
                        </div>
                      ) : (
                        dayObj.day
                      )}
                    </div>

                    {/* Holiday Badge */}
                    {holiday && (
                      <div className="mt-1 flex items-center gap-1 truncate rounded bg-blue-500 px-2 py-1 text-xs text-white">
                        <FaCalendarAlt size={10} />
                        {holiday.holiday_name}
                      </div>
                    )}

                    {/* Event Badge */}
                    {event && !holiday && (
                      <div className="mt-1 truncate rounded bg-blue-500 px-2 py-1 text-xs text-white">
                        {event.name}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Week View */}
        {viewMode === "week" && (
          <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
            {weekDays.map((day, index) => {
              const holiday = isHolidayDate(day);
              const event = isEventDate(day);
              // mimic dayObj for handleCalendarDayClick
              const dayObj = {
                day: day.getDate(),
                isCurrentMonth: true, // allow click for all days in week view
                date: day,
              };
              return (
                <div
                  key={index}
                  onClick={() => handleCalendarDayClick(dayObj)}
                  className="cursor-pointer bg-white p-4 dark:bg-navy-800"
                >
                  <div className="mb-3 text-center">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      {day.toLocaleDateString("en-US", { weekday: "short" })}
                    </p>
                    <p
                      className={`text-lg font-bold ${
                        isToday(day)
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {day.getDate()}
                    </p>
                  </div>

                  {holiday && (
                    <div className="flex items-center justify-center gap-1 rounded bg-red-100 p-2 text-center text-xs font-semibold text-red-800 dark:bg-red-900 dark:text-red-200">
                      <FaCalendarAlt size={12} />
                      {holiday.holiday_name}
                    </div>
                  )}

                  {event && !holiday && (
                    <div className="rounded bg-blue-100 p-2 text-center text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {event.name}
                    </div>
                  )}

                  {isToday(day) && (
                    <div className="mt-2 border-t border-blue-300 pt-2 dark:border-blue-700">
                      <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        Today
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Holidays by Month Count */}
      {holidays.length > 0 && (
        <div className="mt-6 rounded-lg bg-white p-6 shadow-lg dark:bg-navy-800">
          {(() => {
            // Group holidays by month
            const monthMap = {};
            holidays.forEach((h) => {
              const [year, month] = h.holiday_date.split("-");
              const key = `${year}-${month}`;
              if (!monthMap[key]) monthMap[key] = [];
              monthMap[key].push(h);
            });
            // Sort months chronologically
            const sortedMonths = Object.keys(monthMap).sort();
            return (
              <div>
                {sortedMonths.map((monthKey) => {
                  const [year, month] = monthKey.split("-");
                  const monthName = new Date(
                    year,
                    parseInt(month, 10) - 1
                  ).toLocaleString("en-US", { month: "long" });
                  return (
                    <div key={monthKey} className="mb-6">
                      <h4 className="text-md mb-2 font-bold text-navy-700 dark:text-white">
                        {monthName} {year}
                      </h4>
                      <div className="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-navy-800">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-navy-700">
                                <th className="px-4 py-4 text-left text-sm font-bold text-navy-700 dark:text-white sm:px-6">
                                  Holiday Name
                                </th>
                                <th className="px-4 py-4 text-left text-sm font-bold text-navy-700 dark:text-white sm:px-6">
                                  Date
                                </th>
                                <th className="px-4 py-4 text-left text-sm font-bold text-navy-700 dark:text-white sm:px-6">
                                  Description
                                </th>
                                {isSuperAdmin && (
                                  <th className="px-4 py-4 text-center text-sm font-bold text-navy-700 dark:text-white sm:px-6">
                                    Actions
                                  </th>
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {monthMap[monthKey].map((holiday) => (
                                <tr
                                  key={holiday.holidayid}
                                  className="border-b border-gray-200 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-navy-700"
                                >
                                  <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white sm:px-6">
                                    <div className="flex items-center gap-2">
                                      <FaCalendarAlt
                                        className="text-red-500"
                                        size={16}
                                      />
                                      {holiday.holiday_name}
                                    </div>
                                  </td>
                                  <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300 sm:px-6">
                                    {holiday.holiday_date}
                                  </td>
                                  <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300 sm:px-6">
                                    {holiday.description || "No description"}
                                  </td>
                                  {isSuperAdmin && (
                                    <td className="px-4 py-4 text-center sm:px-6">
                                      <div className="flex items-center justify-center gap-2">
                                        <button
                                          onClick={() =>
                                            handleEditHoliday(holiday)
                                          }
                                          className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900"
                                          title="Edit Holiday"
                                        >
                                          <MdEdit size={18} />
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleDeleteHoliday(
                                              holiday.holidayid
                                            )
                                          }
                                          className="rounded-lg p-2 text-red-600 transition hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900"
                                          title="Delete Holiday"
                                        >
                                          <MdDelete size={18} />
                                        </button>
                                      </div>
                                    </td>
                                  )}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      )}
      {/* Add Holiday Modal */}
      {/* This modal handles adding holidays to the calendar */}
      {showHolidayModal && (
        <div className="bg-black fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
          <div className="w-96 rounded-lg bg-white p-6 shadow-xl dark:bg-navy-800">
            {/* Modal Header with title and close button */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-navy-700 dark:text-white">
                {isEditMode ? "Edit Holiday" : "Add Holiday"}
              </h2>
              <button
                onClick={() => {
                  setShowHolidayModal(false);
                  setIsEditMode(false);
                  setEditingHoliday(null);
                  setHolidayForm({
                    holiday_date: "",
                    holiday_name: "",
                    description: "",
                  });
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <MdClose size={24} />
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Date Input Field */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Date
                </label>
                <input
                  type="date"
                  value={holidayForm.holiday_date}
                  onChange={(e) =>
                    setHolidayForm({
                      ...holidayForm,
                      holiday_date: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-navy-700 dark:text-white"
                />
              </div>

              {/* Holiday Name Input Field */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Holiday Name
                </label>
                <input
                  type="text"
                  value={holidayForm.holiday_name}
                  onChange={(e) =>
                    setHolidayForm({
                      ...holidayForm,
                      holiday_name: e.target.value,
                    })
                  }
                  placeholder="e.g., New Year"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-navy-700 dark:text-white"
                />
                {/* Removed invalid 'holiday' usage in modal form */}
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <input
                  type="text"
                  value={holidayForm.description}
                  onChange={(e) =>
                    setHolidayForm({
                      ...holidayForm,
                      description: e.target.value,
                    })
                  }
                  placeholder="e.g., Optional details about the holiday"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-navy-700 dark:text-white"
                />
              </div>
              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                {/* Add/Update Holiday Button - Validates form, saves holiday, shows success message, closes modal */}
                <button
                  onClick={handleAddHoliday}
                  disabled={isEditMode && !isSuperAdmin}
                  className={`flex-1 rounded-lg px-4 py-2 font-semibold transition ${
                    isEditMode && !isSuperAdmin
                      ? "cursor-not-allowed bg-gray-400 text-gray-200"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  {isEditMode ? "Update Holiday" : "Add Holiday"}
                </button>
                {/* Cancel Button - Closes modal without saving */}
                <button
                  onClick={() => {
                    setShowHolidayModal(false);
                    setIsEditMode(false);
                    setEditingHoliday(null);
                    setHolidayForm({
                      holiday_date: "",
                      holiday_name: "",
                      description: "",
                    });
                  }}
                  className="flex-1 rounded-lg bg-gray-300 px-4 py-2 font-semibold text-gray-900 transition hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
