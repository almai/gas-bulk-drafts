import { getActiveUserEmail } from '../../src/lib/Session';

(global as any).Session = {
  getActiveUser: jest.fn().mockReturnValue({
    getEmail: () => 'test@example.com',
    getUserLoginId: () => 'test-user-id'
  })
};

describe('Session Lib', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('getActiveUserEmail', () => {
    test('returns the active user email when available', () => {
      const result = getActiveUserEmail();

      expect(result).toBe('test@example.com');
    });

    test('throws error when email is not available', () => {
      (Session.getActiveUser as jest.Mock).mockReturnValue({
        getEmail: () => '',
        getUserLoginId: () => 'test-user-id'
      });

      expect(() => getActiveUserEmail()).toThrow('Unable to get active user email');
    });
  });
});
