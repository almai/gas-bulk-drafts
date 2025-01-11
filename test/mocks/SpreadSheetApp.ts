export const mockData = [
  ['Header 1', 'Header 2'],
  ['Data 1', 'Data 2']
];

export const mockContactsData = [
  ['id', 'firstName', 'lastName', 'email', 'gender', 'formal', 'language', 'isActive', 'employeeId', 'contactFor'],
  [1, 'Dario', 'Soller', 'test1@maiburg.com', 'male', false, 'de', true, 2, 'Schwarz, Robert'],
  [2, 'Robert', 'Schwarz', 'test2@maiburg.com', 'male', false, 'de', false, 2, 'Schwarz, Robert'],
  [3, 'Malin', 'Klingsell', 'test3@maiburg.com', 'female', false, 'en', true, 1, 'Soller, Dario'],
  [4, 'Simon', 'Maling', 'test4@maiburg.com', 'male', false, 'en', true, 4, 'Maling, Simon']
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
