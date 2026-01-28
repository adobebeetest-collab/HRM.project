import { toast } from 'react-toastify';

/**
 * Show success toast notification
 * @param {string} message - Success message
 * @param {object} options - Optional toast configuration
 */
export const showSuccess = (message, options = {}) => {
  return toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options,
  });
};

/**
 * Show error toast notification
 * @param {string} message - Error message
 * @param {object} options - Optional toast configuration
 */
export const showError = (message, options = {}) => {
  return toast.error(message, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options,
  });
};

/**
 * Show info toast notification
 * @param {string} message - Info message
 * @param {object} options - Optional toast configuration
 */
export const showInfo = (message, options = {}) => {
  return toast.info(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options,
  });
};

/**
 * Show warning toast notification
 * @param {string} message - Warning message
 * @param {object} options - Optional toast configuration
 */
export const showWarning = (message, options = {}) => {
  return toast.warning(message, {
    position: 'top-right',
    autoClose: 3500,
    ...options,
  });
};

/**
 * Show loading toast (returns toast ID for later dismissal)
 * @param {string} message - Loading message
 * @returns {string} - Toast ID
 */
export const showLoading = (message = 'Loading...') => {
  return toast.loading(message, {
    icon: '⏳',
  });
};

/**
 * Dismiss a specific toast by ID
 * @param {string} toastId - Toast ID to dismiss
 */
export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};

/**
 * Dismiss all toasts
 */
export const dismissAllToasts = () => {
  toast.dismiss();
};

/**
 * Show a promise-based toast (great for async operations)
 * @param {Promise} promise - The promise to track
 * @param {object} messages - {loading, success, error} messages
 * @param {object} options - Optional toast configuration
 */
export const showPromise = (promise, messages, options = {}) => {
  return toast.promise(
    promise,
    {
      loading: messages.loading || 'Processing...',
      success: messages.success || 'Success!',
      error: messages.error || 'Error occurred!',
      ...options,
    }
  );
};

export default {
  success: showSuccess,
  error: showError,
  info: showInfo,
  warning: showWarning,
  loading: showLoading,
  dismiss: dismissToast,
  dismissAll: dismissAllToasts,
  promise: showPromise,
};
