import {
  getActiveSpreadsheetId,
  getDataA1ToLastRowLastCol,
  getSelectedRange,
  showAlert,
  showPrompt
} from '../../src/lib/SpreadsheetApp';
import { mockRange, mockSheet } from '../mocks/SpreadSheetApp';
import { mockUi } from '../mocks/Ui';

// Mock global SpreadsheetApp
(global as any).SpreadsheetApp = {
  getActiveSpreadsheet: jest.fn().mockReturnValue({
    getId: jest.fn().mockReturnValue('ss-id')
  }),
  getUi: jest.fn().mockReturnValue(mockUi)
};

describe('Spreadsheet Lib', () => {
  beforeEach(() => jest.clearAllMocks());

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
});
