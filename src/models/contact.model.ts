/**
 * @file This file defines the data model for the contact.
 */

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: 'male' | 'female';
  language: 'de' | 'en';
  formal: boolean;
  isInternal: boolean;
  isActive: boolean;
  employeeId: number;
  employeeFirstName: string;
  employeeLastName: string;
  employeeGender: 'male' | 'female';
  employeeIsActive: boolean;
  employeePersonalPronoun: 'er' | 'sie' | 'he' | 'she';
  employeePossessivePronoun: 'sein' | 'ihr' | 'his' | 'her';
}
