import {
  createDraftEmailsFromContacts,
  createDraftEmailsFromRange,
  promptForDocId,
  sayHelloSpreadsheet
} from '../../src/functions/SpreadsheetApp';
import { createDraft } from '../../src/lib/GmailApp';
import {
  getPersonArrayFromSheet,
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
  getValuesFromRange: jest.fn(),
  getPersonArrayFromSheet: jest.fn()
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
      (getValuesFromRange as jest.Mock).mockReturnValue(emails);

      createDraftEmailsFromRange();

      expect(getSheetByName).toHaveBeenCalledWith('contacts');
      expect(createDraft).toHaveBeenCalledTimes(2);
      expect(createDraft).toHaveBeenCalledWith('email1@example.com', 'Subject', 'Message body');
      expect(createDraft).toHaveBeenCalledWith('email2@example.com', 'Subject', 'Message body');
    });
  });

  describe('createDraftEmailsFromContacts', () => {
    test('creates draft emails for active contacts', () => {
      const mockContacts = [
        { email: 'test1@maiburg.com', isActive: true },
        { email: 'test3@maiburg.com', isActive: true }
      ];
      (getPersonArrayFromSheet as jest.Mock).mockReturnValue(mockContacts);

      createDraftEmailsFromContacts();

      expect(createDraft).toHaveBeenCalledTimes(2);
      expect(createDraft).toHaveBeenCalledWith('test1@maiburg.com', 'Subject', 'Message body');
      expect(createDraft).toHaveBeenCalledWith('test3@maiburg.com', 'Subject', 'Message body');
    });

    test('throws error when no active contacts found', () => {
      (getPersonArrayFromSheet as jest.Mock).mockReturnValue([]);

      expect(() => createDraftEmailsFromContacts()).toThrow('No active contacts found in sheet');
    });
  });
});
