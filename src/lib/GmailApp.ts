/**
 * Google Apps Script Gmail manipulation utilities
 * @module document
 * @description
 * This module provides a collection of functions for working with Gmail.
 * @since 1.0.0
 */

/**
 * Creates a new draft email
 * @since 1.0.0
 * @param {string} email - The email address of the recipient
 * @param {string} subject - The subject of the email
 * @param {string} message - The body of the email
 */
export const createDraft = (email: string, subject: string, message: string): void => {
  GmailApp.createDraft(email, subject, message);
};
