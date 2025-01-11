/**
 * Google Apps Script Gmail manipulation utilities
 */

/**
 * Creates a new draft email
 * @param {string} email - The email address of the recipient
 * @param {string} subject - The subject of the email
 * @param {string} message - The body of the email
 */
export const createDraft = (email: string, subject: string, message: string): void => {
  GmailApp.createDraft(email, subject, message);
};
