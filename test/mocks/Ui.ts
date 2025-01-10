export const mockUi = {
  Button: { OK: 'ok', CANCEL: 'cancel' },
  ButtonSet: { OK: 'ok', OK_CANCEL: 'ok_cancel' },
  showModalDialog: jest.fn(),
  prompt: jest.fn().mockReturnValue({
    getSelectedButton: () => mockUi.Button.CANCEL,
    getResponseText: jest.fn().mockReturnValue('abc123')
  }),
  alert: jest.fn()
};
