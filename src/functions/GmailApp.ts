import { createDraft } from '../lib/GmailApp';

/**
 * Creates a new draft email
 */
export const createDraftMsg = (): void => {
  const email = 'alex@maiburg.com';
  const subject = 'Hello from Google Apps Script';
  const message = 'This is a test email sent from Google Apps Script.';

  createDraft(email, subject, message);
};
