/**
 * Facade to interact with Google Apps Script SpreadsheetApp service
 */

import { SheetName } from '../models';

/**
 * Retrieves a sheet by its name from the active spreadsheet.
 * @param {string} sheetName - The name of the sheet to retrieve.
 * @returns {GoogleAppsScript.Spreadsheet.Sheet} The sheet with the specified name.
 * @throws {Error} If the sheet is not found.
 */
export function getSheetByName(sheetName: string): GoogleAppsScript.Spreadsheet.Sheet {
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
 * Retrieves data from cell A1 to the last occupied row and column in the given sheet.
 * @returns {any[][]} The data within the range from A1 to the last row and column.
 * @param sheetName
 */
export function getSheetDataByName(sheetName: SheetName): any[][] {
  const sheet = getSheetByName(sheetName);
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  const range = sheet.getRange(1, 1, lastRow, lastColumn);
  return range.getValues();
}

/**
 * Gets the next row index in a sheet by sheet name.
 * @param {SheetName} sheetName - The name of the sheet.
 * @returns {number} The index of the next row in the sheet.
 */
export function getNextRowBySheetName(sheetName: SheetName): number {
  const sheet = getSheetByName(sheetName);
  return sheet.getLastRow() + 1;
}

/**
 * Gets the range of a cell in a sheet by sheetName, row and column indices and sets its value.
 * @param {SheetName} sheetName - The name of the sheet.
 * @param {number} row - The row index of the cell.
 * @param {number} column - The column index of the cell.
 * @param {any} value - The value to set in the cell.
 * @returns {void}
 */
export function setValueBySheetNameRowAndCol(sheetName: SheetName, row: number, column: number, value: any): void {
  const sheet = getSheetByName(sheetName);
  sheet.getRange(row, column).setValue(value);
}

/**
 * Shows a toast message in the spreadsheet UI
 * @param message - The message to display
 * @param title - The title of the toast
 * @returns {void}
 */
export function showToast(message: string, title: string): void {
  SpreadsheetApp.getActiveSpreadsheet().toast(message, title, 5);
}
