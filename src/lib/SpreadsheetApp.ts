/**
 * @file This file contains functions to interact with Google Sheets using Google Apps Script.
 */
import { contactKeys } from '../constants/contact';
import { templateData } from '../constants/template-data';
import { Contact } from '../models';

/**
 * Gets the active Google Spreadsheet App UI instance
 * @returns {GoogleAppsScript.Spreadsheet.SpreadsheetApp} The active Spreadsheet App instance
 */
export const getSpreadsheetUi = (): GoogleAppsScript.Base.Ui => {
  return SpreadsheetApp.getUi();
};

/**
 * Gets the currently active Google Spreadsheet
 * @returns {GoogleAppsScript.Spreadsheet.Spreadsheet | null} The active spreadsheet or null if there is no active spreadsheet
 */
export const getActiveSpreadsheet = (): GoogleAppsScript.Spreadsheet.Spreadsheet | null => {
  return SpreadsheetApp.getActiveSpreadsheet();
};

/**
 * Gets the ID of the currently active Google Spreadsheet
 * @returns {string} The ID of the active spreadsheet
 * @throws {Error} If there is no active spreadsheet open
 */
export const getActiveSpreadsheetId = (): string => {
  const ss = getActiveSpreadsheet();

  if (!ss) {
    throw new Error('No active spreadsheet found');
  }

  return ss.getId();
};

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
 * Gets the currently selected range in a sheet
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - The sheet to get selection from
 * @returns {GoogleAppsScript.Spreadsheet.Range} The selected range
 * @throws {Error} If no range is selected
 */
export const getSelectedRange = (sheet: GoogleAppsScript.Spreadsheet.Sheet): GoogleAppsScript.Spreadsheet.Range => {
  const range = sheet.getActiveRange();
  if (!range) {
    throw new Error('No range selected');
  }
  return range;
};

/**
 * Shows an alert dialog in the Google Spreadsheet UI
 * @param {string} msg - The message to display in the alert
 * @returns {void}
 * @throws {Error} If no active UI instance is found
 */
export const showAlert = (msg: string): void => {
  const ui = SpreadsheetApp.getUi();

  if (!ui) {
    throw new Error('No active UI instance found');
  }

  ui.alert(msg);
};

/**
 * Shows a prompt dialog in the Google Spreadsheet UI
 * @param {string} title - The title of the prompt
 * @param {string} msg - The message to display in the prompt
 * @param {string} type - The type of input expected
 * @returns {string | null} The user's response or null if the user cancels the prompt
 * @throws {Error} If no active UI instance is found
 */
export const showPrompt = (title: string, msg: string, type: string): string | null => {
  const ui = SpreadsheetApp.getUi();
  if (!ui) {
    throw new Error('No active UI instance found');
  }

  const response = ui.prompt(title, msg, ui.ButtonSet.OK_CANCEL);
  if (response.getSelectedButton() !== ui.Button.OK) {
    return null;
  }

  const txt = response.getResponseText()?.trim();
  if (!txt) {
    ui.alert(`Invalid ${type}!`);
    return null;
  }

  return txt;
};

/**
 * Retrieves a sheet by its name from the active spreadsheet.
 * @param {string} sheetName - The name of the sheet to retrieve.
 * @returns {GoogleAppsScript.Spreadsheet.Sheet} The sheet with the specified name.
 * @throws {Error} If the sheet is not found.
 */
export const getSheetByName = (sheetName: string): GoogleAppsScript.Spreadsheet.Sheet => {
  const ss = getActiveSpreadsheet();
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
 * Retrieves a range from a starting cell to the last occupied row in the sheet.
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - The sheet to retrieve the range from.
 * @param {string} cell - The A1 notation of the starting cell.
 * @returns {GoogleAppsScript.Spreadsheet.Range} The range from the starting cell to the last row.
 */
export const getRangeByCellToLastRow = (
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  cell: string
): GoogleAppsScript.Spreadsheet.Range => {
  const startRange = sheet.getRange(cell);
  const startRow = startRange.getRow();
  const startColumn = startRange.getColumn();
  const lastRow = sheet.getLastRow();
  const numRows = lastRow - startRow + 1;
  return sheet.getRange(startRow, startColumn, numRows);
};

/**
 * Retrieves the values from the given range.
 * @param {GoogleAppsScript.Spreadsheet.Range} range - The range to get values from.
 * @returns {any[][]} The values in the range.
 */
export const getValuesFromRange = (range: GoogleAppsScript.Spreadsheet.Range): any[][] => {
  return range.getValues();
};

/**
 * Retrieves an array of Contact objects from the specified sheet.
 * @param {string} sheetName - The name of the sheet to retrieve data from.
 * @returns {Contact[]} An array of Contact objects.
 * @throws {Error} If the sheet is empty or contains only headers.
 * @throws {Error} If the required columns are not found in the sheet.
 * @throws {Error} If the sheet name is invalid.
 */
export const getPersonArrayFromSheet = (sheetName: string): Contact[] => {
  const sheet = getSheetByName(sheetName);
  const data = getDataA1ToLastRowLastCol(sheet);

  if (data.length < 2) {
    throw new Error('Sheet is empty or contains only headers');
  }

  const headers = data[0];
  const rows = data.slice(1);

  // Define required keys based on sheet name
  const requiredKeys = sheetName === 'contacts' ? contactKeys : null;

  if (!requiredKeys) {
    throw new Error(`Invalid sheet name: ${sheetName}. Only 'contacts' is supported.`);
  }

  const headerIndexMap = new Map<string, number>();

  requiredKeys.forEach(key => {
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
      const person: any = {};
      headerIndexMap.forEach((index, key) => {
        person[key] = row[index];
      });
      return person as Contact;
    });
};

export const getTemplateWithSubstitutions = (
  contact: Contact,
  templateName: 'subject' | 'salutation' | 'msg'
): string => {
  // Get the Config sheet and its data
  const configSheet = getSheetByName('Config');
  const configData = getDataA1ToLastRowLastCol(configSheet);

  // Load all templates from template-data and create a new object to store processed templates
  const templates = Object.entries(templateData).reduce(
    (acc, [key, template]) => {
      // Create a new template object for each template
      const processedTemplate = {
        ...template,
        content: template.content
      };

      // Find and populate template content from Config sheet
      const rowIndex = configData.findIndex(row => row[0] === template.name);
      if (rowIndex !== -1) {
        let content = configData[rowIndex][1];

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
