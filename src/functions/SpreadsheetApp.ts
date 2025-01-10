/**
 * @file This file contains functions to interact with Google Sheets using Google Apps Script.
 */

import { createDraft } from '../lib/GmailApp';
import {
  getRangeByCellToLastRow,
  getSheetByName,
  getValuesFromRange,
  showAlert,
  showPrompt
} from '../lib/SpreadsheetApp';

const DOC_ID = '1LKgyifuAPKvM99jZKIaRlI3BdtwGVmEgl0BTr5pKlQs';

/**
 * Displays a simple hello message in a popup dialog.
 * @returns {void}
 */
export const sayHelloSpreadsheet = (): void => {
  showAlert("Hello, I'm a Google Sheet!");
};

/**
 * Prompts the user to enter a document ID.
 * @returns {string | null} The document ID or null if the user cancels the prompt
 */
export const promptForDocId = (): string | null => {
  return showPrompt('Document ID', 'Please enter the target document ID:', 'document ID');
};

/**
 * Creates draft emails for each email address in the specified range.
 * @returns {void}
 */
export const createDraftEmailsFromRange = (): void => {
  const sheet = getSheetByName('contacts');
  const range = getRangeByCellToLastRow(sheet, 'C2');
  const values = getValuesFromRange(range);

  values.forEach(row => {
    const email = row[0];
    if (email) {
      createDraft(email, 'Subject', 'Message body');
    }
  });
};
