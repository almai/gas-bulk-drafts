import { Person } from './person.model';

export interface Contact extends Person {
  formal: boolean;
  employeeId: number;
  contactFor: string;
  isActive: boolean;
}
