/**
 * @file This file defines the data model for the template.
 */

import { TemplateVariable } from './types';

export interface Template {
  id: number;
  name: string;
  description: string;
  content: string;
  language: 'de' | 'en';
  variables: TemplateVariable[];
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
