import { createDraft } from '../../src/lib/GmailApp';
import { mockDraft } from '../mocks/GmailApp';

// Mock global GmailApp
(global as any).GmailApp = {
  createDraft: jest.fn().mockReturnValue(mockDraft)
};

describe('GmailApp Lib', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('createDraft', () => {
    test('creates a draft email with given parameters', () => {
      const email = 'test@example.com';
      const subject = 'Test Subject';
      const message = 'Test Message';

      createDraft(email, subject, message);

      expect(GmailApp.createDraft).toHaveBeenCalledWith(email, subject, message);
    });
  });
});
