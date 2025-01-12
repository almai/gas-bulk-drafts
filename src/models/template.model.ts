/**
 * @file This file defines the data model for the template.
 */

import { TemplateVariable, ConfigTemplateKey } from './types';

export interface Template {
  id: number;
  name: string;
  description: string;
  content: string;
  language: 'de' | 'en';
  variables: TemplateVariable[];
}

export type TemplateData = {
  [key in ConfigTemplateKey]: Template;
};
