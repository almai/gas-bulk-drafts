import { createDraftMsg } from '../functions/GmailApp';
import {
  createDraftEmailsFromContacts,
  createDraftEmailsFromRange,
  sayHelloSpreadsheet
} from '../functions/SpreadsheetApp';

/**
 * Creates the custom menu in the Google Spreadsheet UI.
 * @returns {GoogleAppsScript.Base.Menu} The custom menu.
 */
export const getMenu = () => {
  const ui = SpreadsheetApp.getUi();

  return ui
    .createMenu('Advanced')
    .addItem('Say Hello', 'sayHello')
    .addItem('Create Draft Message', 'createDraftMsg')
    .addItem('Create Drafts from Range', 'createDraftEmailsFromRange')
    .addItem('Create Drafts from Contacts', 'createDraftEmailsFromContacts')
    .addToUi();
};

// Export functions to make them available in the Apps Script environment
(global as any).sayHello = sayHelloSpreadsheet;
(global as any).createDraftMsg = createDraftMsg;
(global as any).createDraftEmailsFromRange = createDraftEmailsFromRange;
(global as any).createDraftEmailsFromContacts = createDraftEmailsFromContacts;
