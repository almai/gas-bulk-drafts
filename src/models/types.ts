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
