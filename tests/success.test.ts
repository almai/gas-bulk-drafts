import { createDraft, getSheetDataByName, showToast } from '../src/facades';
import createDraftEmailsFromContacts from '../src/modules/spreadsheet-app.module';
import { contactSheetData, logSheetData, templateSheetData } from './mocks';

jest.mock('../src/facades', () => ({
  createDraft: jest.fn(),
  getNextRowBySheetName: jest.fn(),
  getSheetByName: jest.fn(),
  getSheetDataByName: jest.fn(),
  setValueBySheetNameRowAndCol: jest.fn(),
  showToast: jest.fn()
}));

describe('SpreadsheetApp Module Success', () => {
  const getSheetDataByNameMock = getSheetDataByName as jest.Mock;
  const createDraftMock = createDraft as jest.Mock;

  beforeEach(() => jest.clearAllMocks());

  describe('createDraftEmailsFromContacts()', () => {
    beforeEach(() => {
      getSheetDataByNameMock
        .mockReturnValueOnce(contactSheetData)
        .mockReturnValueOnce(templateSheetData)
        .mockReturnValueOnce(logSheetData);
      createDraftMock.mockReturnValue({ gmailId: '123', messageId: '456' });
    });

    test('should create a draft with correct subject and message', () => {
      createDraftEmailsFromContacts();

      expect(createDraft).toHaveBeenCalledTimes(1);
      expect(createDraft).toHaveBeenCalledWith(
        'rufus.beck@example.com',
        'Feedback questions for John Doe',
        'Hi Rufus,\n\nmessageEn Rufus Beck John Doe he his'
      );
    });

    test('should show a success toast', () => {
      createDraftEmailsFromContacts();

      expect(showToast).toHaveBeenCalledTimes(1);
      expect(showToast).toHaveBeenCalledWith('Emails created successfully!', '✅ Success');
    });
  });
});
