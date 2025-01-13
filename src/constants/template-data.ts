import { TemplateData } from '../models';

export const templateData: TemplateData = {
  subjectDe: {
    id: 1,
    name: 'subjectDe',
    description: 'Subject of the email in German',
    content: undefined,
    language: 'de',
    variables: ['employeeFirstName', 'employeeLastName']
  },
  subjectEn: {
    id: 2,
    name: 'subjectEn',
    description: 'Subject of the email in English',
    content: undefined,
    language: 'en',
    variables: ['employeeFirstName', 'employeeLastName']
  },
  salutationDeFormalMale: {
    id: 3,
    name: 'salutationDeFormalMale',
    description: 'Formal salutation for male recipients in German',
    content: undefined,
    language: 'de',
    variables: ['lastName']
  },
  salutationDeFormalFemale: {
    id: 4,
    name: 'salutationDeFormalFemale',
    description: 'Formal salutation for female recipients in German',
    content: undefined,
    language: 'de',
    variables: ['lastName']
  },
  salutationEnFormalMale: {
    id: 5,
    name: 'salutationEnFormalMale',
    description: 'Formal salutation for male recipients in English',
    content: undefined,
    language: 'en',
    variables: ['lastName']
  },
  salutationEnFormalFemale: {
    id: 6,
    name: 'salutationEnFormalFemale',
    description: 'Formal salutation for female recipients in English',
    content: undefined,
    language: 'en',
    variables: ['lastName']
  },
  salutationDeCasual: {
    id: 7,
    name: 'salutationDeCasual',
    description: 'Casual salutation in German',
    content: undefined,
    language: 'de',
    variables: ['firstName']
  },
  salutationEnCasual: {
    id: 8,
    name: 'salutationEnCasual',
    description: 'Casual salutation in English',
    content: undefined,
    language: 'en',
    variables: ['firstName']
  },
  msgDeCasual: {
    id: 9,
    name: 'msgDeCasual',
    description: 'Message in German casual',
    content: undefined,
    language: 'de',
    variables: [
      'firstName',
      'lastName',
      'employeeFirstName',
      'employeeLastName',
      'employeePersonalPronoun',
      'employeePossessivePronoun'
    ]
  },
  msgDeFormal: {
    id: 10,
    name: 'msgDeFormal',
    description: 'Message in German formal',
    content: undefined,
    language: 'de',
    variables: [
      'firstName',
      'lastName',
      'employeeFirstName',
      'employeeLastName',
      'employeePersonalPronoun',
      'employeePossessivePronoun'
    ]
  },
  msgEn: {
    id: 11,
    name: 'msgEn',
    description: 'Message in English',
    content: undefined,
    language: 'en',
    variables: [
      'firstName',
      'lastName',
      'employeeFirstName',
      'employeeLastName',
      'employeePersonalPronoun',
      'employeePossessivePronoun'
    ]
  }
};
