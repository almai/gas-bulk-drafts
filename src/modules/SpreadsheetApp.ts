/**
 * @file This file contains modules to interact with Google Sheets using Google Apps Script.
 */
import { contactKeys, templateData } from '../constants';
import { Contact } from '../models';
import { createDraft } from './GmailApp';

/**
 * Retrieves data from cell A1 to the last occupied row and column in the given sheet.
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - The sheet to retrieve data from.
 * @returns {any[][]} The data within the range from A1 to the last row and column.
 */
export const getDataA1ToLastRowLastCol = (sheet: GoogleAppsScript.Spreadsheet.Sheet): any[][] => {
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  const range = sheet.getRange(1, 1, lastRow, lastColumn);
  return range.getValues();
};

/**
 * Retrieves a sheet by its name from the active spreadsheet.
 * @param {string} sheetName - The name of the sheet to retrieve.
 * @returns {GoogleAppsScript.Spreadsheet.Sheet} The sheet with the specified name.
 * @throws {Error} If the sheet is not found.
 */
export const getSheetByName = (sheetName: string): GoogleAppsScript.Spreadsheet.Sheet => {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error('No active spreadsheet found');
  }
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    throw new Error(`Sheet with name '${sheetName}' not found`);
  }
  return sheet;
};

/**
 * Retrieves an array of Contact objects from the specified sheet.
 * @param {string} sheetName - The name of the sheet to retrieve data from.
 * @returns {Contact[]} An array of Contact objects.
 * @throws {Error} If the sheet is empty or contains only headers.
 * @throws {Error} If the required columns are not found in the sheet.
 */
export const getContactsArray = (): Contact[] => {
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
};

/**
 * Retrieves a template with variables replaced by values from the Config sheet.
 * @param {Contact} contact - The contact object to use for variable substitution.
 * @param {'subject' | 'salutation' | 'msg'} templateName - The name of the template to retrieve.
 * @returns {string} The template content with variables replaced by values.
 * @throws {Error} If an invalid template name is provided.
 */
export const getTemplateWithSubstitutions = (
  contact: Contact,
  templateName: 'subject' | 'salutation' | 'msg'
): string => {
  // Get the Config sheet and its data
  const sheet = getSheetByName('Config');
  const data = getDataA1ToLastRowLastCol(sheet);

  // Load all templates from template-data and create a new object to store processed templates
  const templates = Object.entries(templateData).reduce(
    (acc, [key, template]) => {
      // Create a new template object for each template
      const processedTemplate = {
        ...template,
        content: template.content
      };

      // Find and populate template content from Config sheet
      const rowIndex = data.findIndex(row => row[0] === template.name);
      if (rowIndex !== -1) {
        let content = data[rowIndex][1];

        // Replace variables in content
        template.variables.forEach((variable: string) => {
          const placeholder = `{{${variable}}}`;
          // Use type assertion to tell TypeScript that variable is a key of Contact
          const value = contact[variable as keyof Contact];
          content = content.replace(placeholder, value as string);
        });

        processedTemplate.content = content;
      }

      return {
        ...acc,
        [key]: processedTemplate
      };
    },
    {} as typeof templateData
  );

  if (templateName === 'subject') {
    return contact.language === 'de' ? templates.subjectDe.content : templates.subjectEn.content;
  }

  if (templateName === 'salutation') {
    if (contact.formal) {
      if (contact.language === 'de') {
        return contact.gender === 'male'
          ? templates.salutationDeFormalMale.content
          : templates.salutationDeFormalFemale.content;
      }

      return contact.gender === 'male'
        ? templates.salutationEnFormalMale.content
        : templates.salutationEnFormalFemale.content;
    }

    return contact.language === 'de' ? templates.salutationDeCasual.content : templates.salutationEnCasual.content;
  }

  if (templateName === 'msg') {
    return contact.language === 'de' ? templates.msgDe.content : templates.msgEn.content;
  }

  throw new Error(`Invalid template name: ${templateName}`);
};

/**
 * Creates draft emails for each email address in the Contacts sheet.
 * @returns {void}
 * @throws {Error} If no active contacts are found in the sheet
 */
export const createDraftEmailsFromContacts = (): void => {
  const contacts: Contact[] = getContactsArray();

  // Filter out inactive and internal contacts
  const activeExternalContacts = contacts.filter((contact: Contact) => {
    return contact.isActive && !contact.isInternal;
  });

  if (activeExternalContacts.length === 0) {
    throw new Error('No active external contacts found in sheet');
  }

  activeExternalContacts.forEach(contact => {
    if (contact.email) {
      const subject = getTemplateWithSubstitutions(contact, 'subject');
      const salutation = getTemplateWithSubstitutions(contact, 'salutation');
      const message = getTemplateWithSubstitutions(contact, 'msg');

      // Combine salutation and message with a newline
      const emailBody = `${salutation}\n\n${message}`;

      createDraft(contact.email, subject, emailBody);
    }
  });
};
