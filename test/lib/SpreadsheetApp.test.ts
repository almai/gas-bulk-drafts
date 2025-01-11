import {
  getActiveSpreadsheetId,
  getDataA1ToLastRowLastCol,
  getPersonArrayFromSheet,
  getRangeByCellToLastRow,
  getSelectedRange,
  getSheetByName,
  getValuesFromRange,
  showAlert,
  showPrompt
} from '../../src/lib/SpreadsheetApp';
import { mockContactsData, mockRange, mockSheet, mockSpreadsheet } from '../mocks/SpreadSheetApp';
import { mockUi } from '../mocks/Ui';

describe('Spreadsheet Lib', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Set up the SpreadsheetApp mock for each test
    (global as any).SpreadsheetApp = {
      getActiveSpreadsheet: jest.fn().mockReturnValue({
        getId: jest.fn().mockReturnValue('ss-id'),
        getSheetByName: jest.fn().mockImplementation((name: string) => {
          if (name === 'contacts') {
            return {
              getLastRow: jest.fn().mockReturnValue(mockContactsData.length),
              getLastColumn: jest.fn().mockReturnValue(mockContactsData[0].length),
              getRange: jest.fn().mockImplementation((row, col, numRows, numCols) => ({
                getValues: jest.fn().mockReturnValue(mockContactsData)
              }))
            };
          }
          return null;
        })
      }),
      getUi: jest.fn().mockReturnValue(mockUi)
    };
  });

  describe('getActiveSpreadsheetId', () => {
    test('returns the id of the active spreadsheet', () => {
      const result = getActiveSpreadsheetId();

      expect(result).toBe('ss-id');
      expect(SpreadsheetApp.getActiveSpreadsheet).toHaveBeenCalled();
      expect(SpreadsheetApp.getActiveSpreadsheet().getId).toHaveBeenCalled();
    });

    test('throws error when no active spreadsheet', () => {
      SpreadsheetApp.getActiveSpreadsheet = jest.fn().mockReturnValue(null);

      expect(() => getActiveSpreadsheetId()).toThrow('No active spreadsheet found');
    });
  });

  describe('getDataA1ToLastRowLastCol', () => {
    test('returns data from A1 to the last row and column', () => {
      const data = getDataA1ToLastRowLastCol(mockSheet as any);

      expect(mockSheet.getLastRow).toHaveBeenCalled();
      expect(mockSheet.getLastColumn).toHaveBeenCalled();
      expect(mockSheet.getRange).toHaveBeenCalledWith(1, 1, 2, 2);
      expect(mockRange.getValues).toHaveBeenCalled();
      expect(data).toEqual(mockRange.getValues());
    });
  });

  describe('getSelectedRange', () => {
    test('returns the active range when one exists', () => {
      const result = getSelectedRange(mockSheet as any);

      expect(result).toBe(mockRange);
      expect(mockSheet.getActiveRange).toHaveBeenCalled();
    });

    test('throws error when no range is selected', () => {
      mockSheet.getActiveRange.mockReturnValue(null);

      expect(() => getSelectedRange(mockSheet as any)).toThrow('No range selected');
    });
  });

  describe('showAlert', () => {
    test('shows an alert dialog with the given message', () => {
      showAlert('Test message');

      expect(mockUi.alert).toHaveBeenCalledWith('Test message');
    });

    test('throws error when no active UI instance is found', () => {
      SpreadsheetApp.getUi = jest.fn().mockReturnValue(null);

      expect(() => showAlert('Test message')).toThrow('No active UI instance found');
    });
  });

  describe('showPrompt', () => {
    beforeEach(() => {
      SpreadsheetApp.getUi = jest.fn().mockReturnValue(mockUi);
    });

    test('shows a prompt dialog with the given message', () => {
      const testTitle = 'Test title';
      const testMessage = 'Test message';
      const testType = 'Test Type';

      showPrompt(testTitle, testMessage, testType);

      expect(mockUi.prompt).toHaveBeenCalledWith(testTitle, testMessage, mockUi.ButtonSet.OK_CANCEL);
    });

    test('throws error when no active UI instance is found', () => {
      SpreadsheetApp.getUi = jest.fn().mockReturnValue(null);

      expect(() => showPrompt('Test title', 'Test message', 'Test Type')).toThrow('No active UI instance found');
    });

    test('returns null when user cancels', () => {
      const result = showPrompt('Test title', 'Test message', 'Test Type');

      expect(result).toBeNull();
    });

    test('returns null and shows alert for empty input', () => {
      mockUi.prompt.mockReturnValue({
        getSelectedButton: () => mockUi.Button.OK,
        getResponseText: jest.fn()
      });

      const result = showPrompt('Test title', 'Test message', 'Test Type');

      expect(result).toBeNull();
      expect(mockUi.alert).toHaveBeenCalledWith('Invalid Test Type!');
    });

    test('returns the user response when user provides valid input', () => {
      const testResponse = 'abc123';
      mockUi.prompt.mockReturnValue({
        getSelectedButton: () => mockUi.Button.OK,
        getResponseText: () => testResponse
      });

      const result = showPrompt('Test title', 'Test message', 'Test Type');

      expect(result).toBe(testResponse);
    });
  });

  describe('getSheetByName', () => {
    test('returns the sheet when it exists', () => {
      (SpreadsheetApp.getActiveSpreadsheet as any).mockReturnValue(mockSpreadsheet);

      const sheetName = 'contacts';
      const sheet = getSheetByName(sheetName);

      expect(SpreadsheetApp.getActiveSpreadsheet).toHaveBeenCalled();
      expect(SpreadsheetApp.getActiveSpreadsheet().getSheetByName).toHaveBeenCalledWith(sheetName);
      expect(sheet).toBe(mockSheet);
    });

    test('throws error when spreadsheet does not exist', () => {
      (SpreadsheetApp.getActiveSpreadsheet as any).mockReturnValue(null);

      expect(() => getSheetByName('nonexistent')).toThrow('No active spreadsheet found');
    });

    test('throws error when sheet does not exist', () => {
      mockSpreadsheet.getSheetByName.mockReturnValue(null);
      (SpreadsheetApp.getActiveSpreadsheet as any).mockReturnValue(mockSpreadsheet);

      expect(() => getSheetByName('nonexistent')).toThrow("Sheet with name 'nonexistent' not found");
    });
  });

  describe('getRangeByCellToLastRow', () => {
    test('returns the correct range from cell to last row', () => {
      mockSheet.getRange.mockReturnValue(mockRange);
      mockRange.getRow.mockReturnValue(3);
      mockRange.getColumn.mockReturnValue(3);
      mockSheet.getLastRow.mockReturnValue(10);
      const cell = 'C3';

      const range = getRangeByCellToLastRow(mockSheet as any, cell);

      expect(mockSheet.getRange).toHaveBeenCalledWith(3, 3, 8);
      expect(range).toBe(mockRange);
    });
  });

  describe('getValuesFromRange', () => {
    test('returns values from the given range', () => {
      const values = getValuesFromRange(mockRange as any);

      expect(mockRange.getValues).toHaveBeenCalled();
      expect(values).toEqual(mockRange.getValues());
    });
  });

  describe('getPersonArrayFromSheet', () => {
    test('returns array of active contacts when sheet name is contacts', () => {
      const contacts = getPersonArrayFromSheet('contacts');

      expect(contacts).toHaveLength(3); // Only active contacts
      expect(contacts[0]).toMatchObject({
        id: 1,
        firstName: 'Dario',
        email: 'test1@maiburg.com',
        isActive: true
      });
    });

    test('throws error when required column is missing', () => {
      // Override the mock implementation for this specific test
      (global as any).SpreadsheetApp.getActiveSpreadsheet = jest.fn().mockReturnValue({
        getSheetByName: jest.fn().mockReturnValue({
          getLastRow: jest.fn().mockReturnValue(2),
          getLastColumn: jest.fn().mockReturnValue(2),
          getRange: jest.fn().mockReturnValue({
            getValues: jest.fn().mockReturnValue([
              ['id', 'firstName'],
              ['1', 'Test']
            ])
          })
        })
      });

      expect(() => getPersonArrayFromSheet('contacts')).toThrow(/Required column/);
    });

    test('throws error for invalid sheet name', () => {
      // Override the mock implementation for invalid sheet name
      (global as any).SpreadsheetApp.getActiveSpreadsheet = jest.fn().mockReturnValue({
        getSheetByName: jest.fn().mockReturnValue(null)
      });

      expect(() => getPersonArrayFromSheet('invalid')).toThrow(/Sheet with name 'invalid' not found/);
    });
  });
});
