export const mockData = [
  ['Header 1', 'Header 2'],
  ['Data 1', 'Data 2']
];

export const mockRange = {
  getValues: jest.fn().mockReturnValue(mockData),
  getRow: jest.fn().mockReturnValue(3),
  getColumn: jest.fn().mockReturnValue(3)
};

export const mockSheet = {
  getActiveRange: jest.fn().mockReturnValue(mockRange),
  getId: jest.fn().mockReturnValue('sheet-id'),
  getLastColumn: jest.fn().mockReturnValue(2),
  getLastRow: jest.fn().mockReturnValue(2),
  getRange: jest.fn().mockReturnValue(mockRange)
};

export const mockSpreadsheet = {
  getId: jest.fn().mockReturnValue('ss-id'),
  getSheetByName: jest.fn().mockReturnValue(mockSheet)
};
