/**
 * Authentication helper functions
 */

/**
 * Check if user is logged in (from localStorage)
 * @returns {boolean}
 */
export const isUserLoggedIn = () => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  return !!(user && token);
};

/**
 * Get logged in user data
 * @returns {Object|null}
 */
export const getLoggedInUser = () => {
  const user = localStorage.getItem('user');
  if (user) {
    try {
      return JSON.parse(user);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }
  return null;
};

/**
 * Get auth token
 * @returns {string|null}
 */
export const getAuthToken = () => {
  return localStorage.getItem('token');
};
