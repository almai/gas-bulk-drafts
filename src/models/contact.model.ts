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
}
