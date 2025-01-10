/**
 * Base utility functions for Google Apps Script
 * @module base
 */

/**
 * Gets the email address of the currently active user
 * @returns {string} The email address of the active user
 * @throws {Error} If unable to get active user email
 */
export const getActiveUserEmail = (): string => {
  const email = Session.getActiveUser().getEmail();
  if (!email) {
    throw new Error('Unable to get active user email');
  }
  return email;
};
