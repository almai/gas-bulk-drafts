/**
 * @file This file contains the types used in the project.
 */

export type SheetName = 'templates' | 'contacts' | 'log';

export type TemplateName = 'subject' | 'salutation' | 'msg';

export type TemplateVariable =
  | 'firstName'
  | 'lastName'
  | 'employeeFirstName'
  | 'employeeLastName'
  | 'employeePersonalPronoun'
  | 'employeePossessivePronoun';
export type TemplateIdKey = 'docId' | 'spreadsheetId' | 'projectId';

export type TemplateKey =
  | 'subjectDe'
  | 'subjectEn'
  | 'salutationDeFormalMale'
  | 'salutationDeFormalFemale'
  | 'salutationEnFormalMale'
  | 'salutationEnFormalFemale'
  | 'salutationDeCasual'
  | 'salutationEnCasual'
  | 'msgDeCasual'
  | 'msgDeFormal'
  | 'msgEn';
