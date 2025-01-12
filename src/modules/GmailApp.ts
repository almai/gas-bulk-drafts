/**
 * Google Apps Script Gmail manipulation utilities
 */

/**
 * Returns a new draft email
 * @param {string} email - The recipient email address
 * @param {string} subject - The email subject
 * @param {string} message - The email message
 */
export const getDraft = (email: string, subject: string, message: string): GoogleAppsScript.Gmail.GmailDraft => {
  return GmailApp.createDraft(email, subject, message);
};
