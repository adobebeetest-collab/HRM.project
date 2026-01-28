// Calendar API Service
import { apiGet, apiPost, apiUpdate, apiDelete } from "./apiHelper";

const calendarAPI = {
  // Calendar/Events APIs
  createEvent: (eventData, onSuccess, onError) => {
    apiPost("/calendar/post-calendar/", eventData, onSuccess, onError);
  },

  getAllEvents: (onSuccess, onError) => {
    apiGet("/calendar/get-all-calendar/", onSuccess, onError);
  },

  deleteEvent: (id, onSuccess, onError) => {
    apiDelete(`/calendar/delete-calendar/${id}/`, onSuccess, onError);
  },

  // Holiday APIs
  createHoliday: (holidayData, onSuccess, onError) => {
    apiPost("/holiday/post-holiday/", holidayData, onSuccess, onError);
  },

  getAllHolidays: (onSuccess, onError) => {
    apiGet("/holiday/get-all-holidays/", onSuccess, onError);
  },

  getHoliday: (id, onSuccess, onError) => {
    apiGet(`/holiday/get-holiday/${id}/`, onSuccess, onError);
  },

  updateHoliday: (id, holidayData, onSuccess, onError) => {
    apiUpdate(`/holiday/update-holiday/${id}/`, holidayData, onSuccess, onError);
  },

  deleteHoliday: (id, onSuccess, onError) => {
    apiDelete(`/holiday/delete-holiday/${id}/`, onSuccess, onError);
  },

  // Leave APIs
  getAllLeaves: (onSuccess, onError) => {
    const userId = localStorage.getItem('user_id');
    return apiGet(`/leave/get-all/?user_id=${userId}`, onSuccess, onError);
  },
};

export default calendarAPI;
