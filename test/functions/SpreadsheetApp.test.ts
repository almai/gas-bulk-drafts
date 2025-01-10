import { createDraftEmailsFromRange, promptForDocId, sayHelloSpreadsheet } from '../../src/functions/SpreadsheetApp';
import { createDraft } from '../../src/lib/GmailApp';
import {
  getRangeByCellToLastRow,
  getSheetByName,
  getValuesFromRange,
  showAlert,
  showPrompt
} from '../../src/lib/SpreadsheetApp';

// Mock lib functions
jest.mock('../../src/lib/SpreadsheetApp', () => ({
  getActiveSpreadsheet: jest.fn(),
  getActiveSpreadsheetId: jest.fn(),
  getDataA1ToLastRowLastCol: jest.fn(),
  showAlert: jest.fn(),
  showPrompt: jest.fn(),
  getSheetByName: jest.fn(),
  getRangeByCellToLastRow: jest.fn(),
  getValuesFromRange: jest.fn()
}));

jest.mock('../../src/lib/GmailApp', () => ({
  createDraft: jest.fn()
}));

describe('SpreadsheetApp Functions', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('sayHelloSpreadsheet', () => {
    test('should show alert with hello message', () => {
      sayHelloSpreadsheet();

      expect(showAlert).toHaveBeenCalledWith("Hello, I'm a Google Sheet!");
    });
  });

  describe('promptForDocId', () => {
    test('should show prompt for document ID', () => {
      promptForDocId();

      expect(showPrompt).toHaveBeenCalledWith('Document ID', 'Please enter the target document ID:', 'document ID');
    });
  });

  describe('createDraftEmailsFromRange', () => {
    test('creates draft emails for each email in the range', () => {
      const emails = [['email1@example.com'], ['email2@example.com']];
      const mockSheet = {};
      const mockRange = {};

      (getSheetByName as jest.Mock).mockReturnValue(mockSheet);
      (getRangeByCellToLastRow as jest.Mock).mockReturnValue(mockRange);
      (getValuesFromRange as jest.Mock).mockReturnValue(emails);

      createDraftEmailsFromRange();

      expect(getSheetByName).toHaveBeenCalledWith('contacts');
      expect(getRangeByCellToLastRow).toHaveBeenCalledWith(mockSheet, 'C2');
      expect(getValuesFromRange).toHaveBeenCalledWith(mockRange);
      expect(createDraft).toHaveBeenCalledTimes(2);
      expect(createDraft).toHaveBeenCalledWith('email1@example.com', 'Subject', 'Message body');
      expect(createDraft).toHaveBeenCalledWith('email2@example.com', 'Subject', 'Message body');
    });
  });
});
