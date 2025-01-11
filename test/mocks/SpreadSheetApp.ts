export const mockData = [
  ['Header 1', 'Header 2'],
  ['Data 1', 'Data 2']
];

export const mockContactsData = [
  [
    'id',
    'firstName',
    'lastName',
    'email',
    'gender',
    'formal',
    'language',
    'isInternal',
    'isActive',
    'employeeId',
    'employeeFirstName',
    'employeeLastName',
    'employeeGender',
    'employeeIsActive',
    'employeePersonalPronoun',
    'employeePossessivePronoun'
  ],
  [
    1,
    'Dario',
    'Soller',
    'test11@maiburg.com',
    'male',
    true,
    'de',
    false,
    true,
    2,
    'Robert',
    'Schwarz',
    'male',
    true,
    'er',
    'sein'
  ],
  [
    2,
    'Robert',
    'Schwarz',
    'test22@maiburg.com',
    'male',
    false,
    'de',
    false,
    true,
    1,
    'Dario',
    'Soller',
    'male',
    true,
    'er',
    'sein'
  ],
  [
    3,
    'Malin',
    'Klingsell',
    'test33@maiburg.com',
    'female',
    true,
    'en',
    false,
    true,
    4,
    'Simon',
    'Maling',
    'male',
    true,
    'he',
    'his'
  ],
  [
    4,
    'Simon',
    'Maling',
    'test44@maiburg.com',
    'male',
    false,
    'en',
    false,
    true,
    3,
    'Malin',
    'Klingsell',
    'female',
    true,
    'she',
    'her'
  ]
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
