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
  getTemplateWithSubstitutions,
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
  getPersonArrayFromSheet: jest.fn(),
  getTemplateWithSubstitutions: jest.fn()
}));

jest.mock('../../src/lib/GmailApp', () => ({
  createDraft: jest.fn()
}));

describe('SpreadsheetApp Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getTemplateWithSubstitutions as jest.Mock).mockImplementation((contact, type) => {
      switch (type) {
        case 'subject':
          return 'Test Subject';
        case 'salutation':
          return 'Dear Test Person';
        case 'msg':
          return 'Test Message Body';
        default:
          return '';
      }
    });
  });

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
        { 
          email: 'test1@maiburg.com', 
          isActive: true, 
          isInternal: false,
          firstName: 'Test',
          lastName: 'User',
          language: 'en',
          formal: true,
          gender: 'male',
          id: 1
        }
      ];
      (getPersonArrayFromSheet as jest.Mock).mockReturnValue(mockContacts);

      createDraftEmailsFromContacts();

      expect(createDraft).toHaveBeenCalledTimes(1);
      expect(createDraft).toHaveBeenCalledWith(
        'test1@maiburg.com',
        'Test Subject',
        'Dear Test Person\n\nTest Message Body'
      );
    });

    test('throws error when no active contacts found', () => {
      (getPersonArrayFromSheet as jest.Mock).mockReturnValue([]);

      expect(() => createDraftEmailsFromContacts()).toThrow('No active external contacts found in sheet');
    });
  });
});
