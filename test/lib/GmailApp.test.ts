import { createDraft } from '../../src/lib/GmailApp';
import { mockDraft } from '../mocks/GmailApp';

// Mock global GmailApp
(global as any).GmailApp = {
  createDraft: jest.fn().mockReturnValue(mockDraft)
};

describe('GmailApp Lib', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('createDraft', () => {
    test('finds element by ID successfully', () => {
      const email = 'test@test.de';
      const subject = 'Test subject';
      const message = 'Test message';

      createDraft(email, subject, message);

      expect(GmailApp.createDraft).toHaveBeenCalledWith(email, subject, message);
    });
  });
});
