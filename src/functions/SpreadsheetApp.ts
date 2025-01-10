/**
 * @file This file contains functions to interact with Google Sheets using Google Apps Script.
 */

import { showAlert, showPrompt } from '../lib/SpreadsheetApp';

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
