import { sayHelloSpreadsheet, promptForDocId } from '../../src/functions/SpreadsheetApp';
import { showAlert, showPrompt } from '../../src/lib/SpreadsheetApp';

// Mock lib functions
jest.mock('../../src/lib/SpreadsheetApp', () => ({
  getActiveSpreadsheet: jest.fn(),
  getActiveSpreadsheetId: jest.fn(),
  getDataA1ToLastRowLastCol: jest.fn(),
  showAlert: jest.fn(),
  showPrompt: jest.fn()
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
});
