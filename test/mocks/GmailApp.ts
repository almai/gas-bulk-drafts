export const mockMessage = {
  getSubject: jest.fn(),
  getPlainBody: jest.fn()
};

export const mockDraft = {
  getMessage: jest.fn().mockReturnValue(mockMessage)
};
