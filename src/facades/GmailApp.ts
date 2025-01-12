/**
 * Facade to interact with Google Apps Script GmailApp service
 */

/**
 * Returns a new draft email
 * @param {string} email - The recipient email address
 * @param {string} subject - The email subject
 * @param {string} message - The email message
 * @returns { gmailId: string; messageId: string } - The Gmail ID and message ID of the draft
 */
export const getDraft = (email: string, subject: string, message: string): { gmailId: string; messageId: string } => {
  const draft = GmailApp.createDraft(email, subject, message);
  const gmailId = draft.getId();
  const messageId = draft.getMessageId();

  return { gmailId, messageId };
};
