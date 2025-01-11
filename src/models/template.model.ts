export type variable =
  | 'firstName'
  | 'lastName'
  | 'employeeFirstName'
  | 'employeeLastName'
  | 'employeePersonalPronoun'
  | 'employeePossessivePronoun';

export interface Template {
  id: number;
  name: string;
  description: string;
  content: string;
  language: 'de' | 'en';
  variables: variable[];
}

export interface TemplateData {
  subjectDe: Template;
  subjectEn: Template;
  salutationDeFormalMale: Template;
  salutationDeFormalFemale: Template;
  salutationEnFormalMale: Template;
  salutationEnFormalFemale: Template;
  salutationDeCasual: Template;
  salutationEnCasual: Template;
  msgDe: Template;
  msgEn: Template;
}
