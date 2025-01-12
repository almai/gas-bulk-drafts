/**
 * @file This file contains modules to interact with Google Sheets using Google Apps Script.
 */
import { contactKeys, templateData } from '../constants';
import { Contact, Log } from '../models';
import { getDraft } from './GmailApp';

let globalTemplateData: typeof templateData | null = null;
let globalDocId: string | null = null;

/**
 * Retrieves data from cell A1 to the last occupied row and column in the given sheet.
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - The sheet to retrieve data from.
 * @returns {any[][]} The data within the range from A1 to the last row and column.
 */
function getDataA1ToLastRowLastCol(sheet: GoogleAppsScript.Spreadsheet.Sheet): any[][] {
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  const range = sheet.getRange(1, 1, lastRow, lastColumn);
  return range.getValues();
}

/**
 * Retrieves a sheet by its name from the active spreadsheet.
 * @param {string} sheetName - The name of the sheet to retrieve.
 * @returns {GoogleAppsScript.Spreadsheet.Sheet} The sheet with the specified name.
 * @throws {Error} If the sheet is not found.
 */
function getSheetByName(sheetName: string): GoogleAppsScript.Spreadsheet.Sheet {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error('No active spreadsheet found');
  }
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    throw new Error(`Sheet with name '${sheetName}' not found`);
  }
  return sheet;
}

/**
 * Retrieves template data from the Config sheet and processes it.
 * @returns {typeof templateData} An object containing processed template data.
 */
function getTemplateData(): typeof templateData {
  // If data is already loaded, return it
  if (globalTemplateData) {
    return globalTemplateData;
  }

  // Get the Config sheet and its data
  const sheet = getSheetByName('config');
  const data = getDataA1ToLastRowLastCol(sheet);

  // Load all templates and create processed templates
  globalTemplateData = Object.entries(templateData).reduce(
    (acc, [key, template]) => {
      const processedTemplate = {
        ...template,
        content: template.content
      };

      const rowIndex = data.findIndex(row => row[0] === template.name);
      if (rowIndex !== -1) {
        const [, content] = data[rowIndex];
        processedTemplate.content = content;
      }

      return {
        ...acc,
        [key]: processedTemplate
      };
    },
    {} as typeof templateData
  );

  // Find and store docId
  const docIdRow = data.find(row => row[0] === 'docId');
  if (docIdRow) {
    const [, id] = docIdRow;
    globalDocId = id;
  }

  return globalTemplateData;
}

/**
 * Retrieves an array of Contact objects from the specified sheet.
 * @returns {Contact[]} An array of Contact objects.
 * @throws {Error} If the sheet is empty or contains only headers.
 * @throws {Error} If the required columns are not found in the sheet.
 */
function getContactsArray(): Contact[] {
  const sheet = getSheetByName('contacts');
  const data = getDataA1ToLastRowLastCol(sheet);

  if (data.length < 2) {
    throw new Error('Sheet is empty or contains only headers');
  }

  const headers = data[0];
  const rows = data.slice(1);
  const headerIndexMap = new Map<string, number>();

  contactKeys.forEach(key => {
    const index = headers.findIndex(h => h.toLowerCase() === key.toLowerCase());
    if (index === -1) {
      throw new Error(`Required column '${key}' not found in sheet`);
    }
    headerIndexMap.set(key, index);
  });

  return rows
    .filter(row => {
      const isActive = row[headerIndexMap.get('isActive')];
      return isActive === true || isActive === 'TRUE';
    })
    .map(row => {
      const contact: any = {};
      headerIndexMap.forEach((index, key) => {
        contact[key] = row[index];
      });
      return contact;
    });
}

/**
 * Retrieves a template with variables replaced by values from the Config sheet.
 * @param {Contact} contact - The contact object to use for variable substitution.
 * @param {'subject' | 'salutation' | 'msg'} templateName - The name of the template to retrieve.
 * @returns {string} The template content with variables replaced by values.
 * @throws {Error} If an invalid template name is provided.
 */
function getTemplateWithSubstitutions(contact: Contact, templateName: 'subject' | 'salutation' | 'msg'): string {
  const templates = getTemplateData();
  let content = '';

  if (templateName === 'subject') {
    content = contact.language === 'de' ? templates.subjectDe.content : templates.subjectEn.content;
  } else if (templateName === 'salutation') {
    if (contact.formal) {
      if (contact.language === 'de') {
        content =
          contact.gender === 'male'
            ? templates.salutationDeFormalMale.content
            : templates.salutationDeFormalFemale.content;
      } else {
        content =
          contact.gender === 'male'
            ? templates.salutationEnFormalMale.content
            : templates.salutationEnFormalFemale.content;
      }
    } else {
      content = contact.language === 'de' ? templates.salutationDeCasual.content : templates.salutationEnCasual.content;
    }
  } else if (templateName === 'msg') {
    content = contact.language === 'de' ? templates.msgDe.content : templates.msgEn.content;
  } else {
    throw new Error(`Invalid template name: ${templateName}`);
  }

  // Replace variables in content
  Object.keys(contact).forEach(key => {
    const placeholder = `{{${key}}}`;
    content = content.replace(placeholder, contact[key as keyof Contact] as string);
  });

  return content;
}

/**
 * Writes email draft creation log to the Log sheet
 * @param {Log} log - The log entry to write
 */
function logEmailDraftCreation(log: Log): void {
  const sheet = getSheetByName('Log');
  const data = getDataA1ToLastRowLastCol(sheet);
  const headers = data[0];
  const nextRow = sheet.getLastRow() + 1;

  // Create a map of header names to column indices
  const headerMap = headers.reduce((acc: { [key: string]: number }, header: string, index: number) => {
    acc[header.toLowerCase()] = index + 1;
    return acc;
  }, {});

  // Write each log property to the corresponding column
  Object.entries(log).forEach(([key, value]) => {
    const colIndex = headerMap[key.toLowerCase()];
    if (colIndex) {
      sheet.getRange(nextRow, colIndex).setValue(value);
    }
  });
}

/**
 * Shows a toast message in the spreadsheet UI
 * @param {boolean} success - Whether the operation was successful
 */
function draftCreationSuccess(success: boolean): void {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (success) {
    ss.toast('Emails created successfully!', '✅ Success', 5);
  } else {
    ss.toast('Could not send emails. Please try again.', '❌ Error', 5);
  }
}

/**
 * Creates draft emails for each email address in the Contacts sheet.
 * @returns {void}
 * @throws {Error} If no active contacts are found in the sheet
 */
export function createDraftEmailsFromContacts(): void {
  const contacts: Contact[] = getContactsArray();

  // Filter out inactive and internal contacts
  const activeExternalContacts = contacts.filter((contact: Contact) => {
    return contact.isActive && !contact.isInternal;
  });

  if (activeExternalContacts.length === 0) {
    throw new Error('No active external contacts found in sheet');
  }

  try {
    // Initialize template data and docId before processing contacts
    if (!globalTemplateData || !globalDocId) {
      getTemplateData();
    }

    activeExternalContacts.forEach(contact => {
      if (contact.email) {
        const subject = getTemplateWithSubstitutions(contact, 'subject');
        const salutation = getTemplateWithSubstitutions(contact, 'salutation');
        const message = getTemplateWithSubstitutions(contact, 'msg');

        // Combine salutation and message with a newline
        const emailBody = `${salutation}\n\n${message}`;

        const draft = getDraft(contact.email, subject, emailBody);

        // Create and write log entry
        const log: Log = {
          contactId: contact.id,
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          gmailId: draft.getId(),
          draftUrl: `https://mail.google.com/mail/u/0/#drafts?compose=${draft.getMessageId()}`,
          timestamp: new Date()
        };
        logEmailDraftCreation(log);
      }
    });
    draftCreationSuccess(true);
  } catch (error) {
    draftCreationSuccess(false);
    throw error;
  }
}
