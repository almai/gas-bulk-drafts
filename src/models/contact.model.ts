/**
 * @file This file defines the data model for the contact.
 */

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: 'male' | 'female';
  isActive: boolean;
}

export interface Contact extends Employee {
  language: 'de' | 'en';
  formal: boolean;
  isInternal: boolean;
  employeeId: number;
  employeeFirstName: string;
  employeeLastName: string;
  employeeGender: 'male' | 'female';
  employeeIsActive: boolean;
  employeePersonalPronoun: 'er' | 'sie' | 'he' | 'she';
  employeePossessivePronoun: 'sein' | 'ihr' | 'his' | 'her';
}
