/**
 * @file This file contains the types used in the project.
 */

export type SheetName = 'config' | 'contacts' | 'log';

export type TemplateName = 'subject' | 'salutation' | 'msg';

export type TemplateVariable =
  | 'firstName'
  | 'lastName'
  | 'employeeFirstName'
  | 'employeeLastName'
  | 'employeePersonalPronoun'
  | 'employeePossessivePronoun';
export type ConfigIdKey = 'docId' | 'spreadsheetId' | 'projectId';

export type ConfigTemplateKey =
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
