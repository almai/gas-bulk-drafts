/**
 * Facade to interact with Google Apps Script GmailApp service
 */

/**
 * Creates a draft email in Gmail with the specified recipient, subject, and message.
 * Adds the user's signature to the email message.
 * @param {string} email - The recipient email address
 * @param {string} subject - The email subject
 * @param {string} message - The email message
 * @returns { gmailId: string; messageId: string } - The Gmail ID and message ID of the draft
 */
export const createDraft = (
  email: string,
  subject: string,
  message: string
): { gmailId: string; messageId: string } => {
  const { signature } = Gmail.Users.Settings.SendAs.list('me').sendAs.find(account => account.isDefault);
  const htmlBody = message.concat(signature);
  const draft = GmailApp.createDraft(email, subject, null, { htmlBody });
  const gmailId = draft.getId();
  const messageId = draft.getMessageId();

  return { gmailId, messageId };
};
