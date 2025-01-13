import { contactKeys } from '../src/constants';

export const contactSheetData = [
  contactKeys,
  [
    '1.0',
    'Rufus',
    'Beck',
    'rufus.beck@example.com',
    'male',
    'en',
    'FALSE',
    'FALSE',
    'TRUE',
    '123',
    'John',
    'Doe',
    'male',
    'TRUE',
    'he',
    'his'
  ]
];

export const noActiveExternalContact = [
  contactKeys,
  [
    '1.0',
    'Rufus',
    'Beck',
    'rufus.beck@example.com',
    'male',
    'de',
    'FALSE',
    'TRUE',
    'FALSE',
    '123',
    'John',
    'Doe',
    'male',
    'TRUE',
    'he',
    'his'
  ]
];

export const missingRequiredColumnContact = [
  ['id', 'firstName', 'lastName', 'gender', 'language', 'formal', 'isInternal', 'isActive'], // missing 'email'
  ['1.0', 'Rufus', 'Beck', 'male', 'en', 'FALSE', 'FALSE', 'TRUE']
];

export const templateSheetData = [
  ['subjectDe', 'Feedback-Fragen für {{employeeFirstName}} {{employeeLastName}}'],
  ['subjectEn', 'Feedback questions for {{employeeFirstName}} {{employeeLastName}}'],
  ['salutationDeFormalMale', 'Sehr geehrter Herr {{lastName}},'],
  ['salutationDeFormalFemale', 'Sehr geehrte Frau {{lastName}},'],
  ['salutationEnFormalMale', 'Dear Mr. {{lastName}},'],
  ['salutationEnFormalFemale', 'Dear Mrs. {{lastName}},'],
  ['salutationDeCasual', 'Hallo {{firstName}},'],
  ['salutationEnCasual', 'Hi {{firstName}},'],
  [
    'msgDeFormal',
    'messageDeFormal {{firstName}} {{lastName}} {{employeeFirstName}} {{employeeLastName}} {{employeePersonalPronoun}} {{employeePossessivePronoun}}'
  ],
  [
    'msgDeCasual',
    'messageDeCasual {{firstName}} {{lastName}} {{employeeFirstName}} {{employeeLastName}} {{employeePersonalPronoun}} {{employeePossessivePronoun}}'
  ],
  [
    'msgEn',
    'messageEn {{firstName}} {{lastName}} {{employeeFirstName}} {{employeeLastName}} {{employeePersonalPronoun}} {{employeePossessivePronoun}}'
  ]
];

export const logSheetData = [
  ['contactId', 'firstName', 'lastName', 'email', 'gmailId', 'draftUrl', 'timestamp'],
  [
    '1.0',
    'Rufus',
    'Beck',
    'rufus.beck@example.com',
    'r-2803197563756957602',
    'https://mail.google.com/mail/u/0/#drafts?compose=1945b41f2b6e7cd7',
    'Sun Jan 12 17:03:56 GMT+01:00 2025'
  ]
];
