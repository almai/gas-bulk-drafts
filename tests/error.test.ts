import { getSheetDataByName, showToast } from '../src/facades';
import createDraftEmailsFromContacts from '../src/modules/spreadsheet-app.module';
import { contactSheetData, missingRequiredColumnContact, noActiveExternalContact } from './mocks';

jest.mock('../src/facades', () => ({
  createDraft: jest.fn(),
  getNextRowBySheetName: jest.fn(),
  getSheetByName: jest.fn(),
  getSheetDataByName: jest.fn(),
  setValueBySheetNameRowAndCol: jest.fn(),
  showToast: jest.fn()
}));

describe('SpreadsheetApp Module', () => {
  const getSheetDataByNameMock = getSheetDataByName as jest.Mock;

  beforeEach(() => jest.clearAllMocks());

  describe('createDraftEmailsFromContacts()', () => {
    test('throw an error if there are no active external contacts', async () => {
      getSheetDataByNameMock.mockReturnValue(noActiveExternalContact);

      expect(() => createDraftEmailsFromContacts()).toThrow('No active external contacts found in sheet');
      expect(showToast).not.toHaveBeenCalled();
    });

    test('throw error if required column was not found', async () => {
      getSheetDataByNameMock.mockReturnValue(missingRequiredColumnContact);

      expect(() => createDraftEmailsFromContacts()).toThrow("Required column 'email' not found in sheet");
      expect(showToast).not.toHaveBeenCalled();
    });

    test('throw error if sheet is empty', async () => {
      getSheetDataByNameMock.mockReturnValue([]);

      expect(() => createDraftEmailsFromContacts()).toThrow('Sheet is empty or contains only headers');
      expect(showToast).not.toHaveBeenCalled();
    });

    test('throw error if template has no content', async () => {
      getSheetDataByNameMock.mockReturnValueOnce(contactSheetData).mockReturnValue([]);

      expect(() => createDraftEmailsFromContacts()).toThrow('Template content not found for msg');
      expect(showToast).toHaveBeenCalledWith('Could not send emails. Please try again.', '❌ Error');
    });
  });
});
