import { createDraftMsg } from '../../src/functions/GmailApp';
import { createDraft } from '../../src/lib/GmailApp';

// Mock lib functions
jest.mock('../../src/lib/GmailApp', () => ({
  createDraft: jest.fn()
}));

describe('GmailApp Functions', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('createDraftMsg', () => {
    test('should create a draft', () => {
      const email = 'alex@maiburg.com';
      const subject = 'Hello from Google Apps Script';
      const message = 'This is a test email sent from Google Apps Script.';

      createDraftMsg();

      expect(createDraft).toHaveBeenCalledWith(email, subject, message);
    });
  });
});
