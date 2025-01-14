/**
 * @file This file contains modules to interact with Google Sheets using Google Apps Script.
 */
import { contactKeys } from '../constants';
import { templateData as initialTemplateData } from '../constants/template-data';
import {
  createDraft,
  getNextRowBySheetName,
  getSheetDataByName,
  setValueBySheetNameRowAndCol,
  showToast
} from '../facades';
import { Contact, Log, SheetName, TemplateData, TemplateName } from '../models';

let templateData: TemplateData = initialTemplateData;

/**
 * Retrieves the template data and docId from the Template sheet and stores them.
 * @returns {void}
 */
function setTemplateData(): void {
  // Get the Template sheet and its data
  const data = getSheetDataByName('template');

  // Load all templates and create processed templates
  templateData = Object.entries(initialTemplateData).reduce((acc, [key, template]) => {
    const processedTemplate = {
      ...template,
      content: template.content
    };

    const rowIndex = data.findIndex(row => row[0] === template.name);
    if (rowIndex !== -1) {
      const [, content] = data[rowIndex];
      processedTemplate.content = content;
    }

    return {
      ...acc,
      [key]: processedTemplate
    };
  }, {} as TemplateData);
}

/**
 * Retrieves an array of Contact objects from the specified sheet.
 * @returns {Contact[]} An array of Contact objects.
 * @throws {Error} If the sheet is empty or contains only headers.
 * @throws {Error} If the required columns are not found in the sheet.
 */
function getContacts(): Contact[] {
  const data = getSheetDataByName('contacts');

  if (data.length < 2) {
    throw new Error('Sheet is empty or contains only headers');
  }

  const headers = data[0];
  const rows = data.slice(1);
  const headerIndexMap = new Map<string, number>();

  // Validate all required columns exist before processing any data
  contactKeys.forEach(key => {
    const index = headers.findIndex(h => h.toLowerCase() === key.toLowerCase());
    if (index === -1) {
      throw new Error(`Required column '${key}' not found in sheet`);
    }
    headerIndexMap.set(key, index);
  });

  // Only process rows after validating all columns exist
  return rows
    .filter(row => {
      const isActive = row[headerIndexMap.get('isActive')];
      return isActive === true || isActive === 'TRUE';
    })
    .map(row => {
      const contact: any = {};
      headerIndexMap.forEach((index, key) => {
        let value = row[index];
        // Type cast boolean string values to actual booleans
        if (key === 'formal' || key === 'isInternal' || key === 'isActive' || key === 'employeeIsActive') {
          if (typeof value === 'string') {
            value = value.toLowerCase() === 'true';
          } else if (typeof value === 'boolean') {
            // value is already boolean, no need to reassign
          } else {
            value = false; // default to false for invalid values
          }
        }
        contact[key] = value;
      });

      return contact;
    });
}

/**
 * Retrieves a template with variables replaced by values from the Template sheet.
 * @param {Contact} contact - The contact object to use for variable substitution.
 * @param {'subject' | 'salutation' | 'msg'} templateName - The name of the template to retrieve.
 * @returns {string} The template content with variables replaced by values.
 * @throws {Error} If an invalid template name is provided.
 */
function getTemplateWithSubstitutions(contact: Contact, templateName: TemplateName): string {
  let content = '';

  if (templateName === 'subject') {
    content = contact.language === 'de' ? templateData.subjectDe.content : templateData.subjectEn.content;
  } else if (templateName === 'salutation') {
    if (contact.formal) {
      if (contact.language === 'de') {
        content =
          contact.gender === 'male'
            ? templateData.salutationDeFormalMale.content
            : templateData.salutationDeFormalFemale.content;
      } else {
        content =
          contact.gender === 'male'
            ? templateData.salutationEnFormalMale.content
            : templateData.salutationEnFormalFemale.content;
      }
    } else {
      content =
        contact.language === 'de' ? templateData.salutationDeCasual.content : templateData.salutationEnCasual.content;
    }
  } else if (templateName === 'msg') {
    if (contact.language === 'de') {
      content = contact.formal ? templateData.msgDeFormal.content : templateData.msgDeCasual.content;
    } else {
      content = templateData.msgEn.content;
    }

    if (!content) {
      throw new Error(`Template content not found for ${templateName}`);
    }
  } else {
    throw new Error(`Invalid template name: ${templateName}`);
  }

  // Replace variables in content
  Object.keys(contact).forEach(key => {
    const placeholder = `{{${key}}}`;
    content = content?.replace(placeholder, contact[key as keyof Contact] as string);
  });

  return content;
}

/**
 * Writes email draft creation log to the Log sheet
 * @param {Log} log - The log entry to write
 */
function logEmailDraftCreation(log: Log): void {
  const sheetName: SheetName = 'log';
  const data = getSheetDataByName(sheetName);

  if (!data.length) {
    throw new Error('Sheet is empty or contains only headers');
  }
  const headers = data[0];
  const nextRow = getNextRowBySheetName(sheetName);

  // Create a map of header names to column indices
  const headerMap = headers.reduce((acc: { [key: string]: number }, header: string, index: number) => {
    acc[header.toLowerCase()] = index + 1;
    return acc;
  }, {});

  // Write each log property to the corresponding column
  Object.entries(log).forEach(([key, value]) => {
    const colIndex = headerMap[key.toLowerCase()];
    if (colIndex) {
      setValueBySheetNameRowAndCol('log', nextRow, colIndex, value);
    }
  });
}

/**
 * Creates draft emails for each email address in the Contacts sheet.
 * @returns {void}
 * @throws {Error} If no active contacts are found in the sheet
 */
export default function createDraftEmailsFromContacts(): void {
  const contacts: Contact[] = getContacts();

  // Filter out inactive and internal contacts
  const activeExternalContacts = contacts.filter((contact: Contact) => {
    return contact.isActive && !contact.isInternal;
  });

  if (activeExternalContacts.length === 0) {
    throw new Error('No active external contacts found in sheet');
  }

  try {
    setTemplateData();

    activeExternalContacts.forEach(contact => {
      if (contact.email) {
        const subject = getTemplateWithSubstitutions(contact, 'subject');
        const salutation = getTemplateWithSubstitutions(contact, 'salutation');
        const message = getTemplateWithSubstitutions(contact, 'msg');

        // Combine salutation and message with a newline
        const emailBody = `${salutation}\n\n${message}`;

        const { gmailId, messageId } = <{ gmailId: string; messageId: string }>(
          createDraft(contact.email, subject, emailBody)
        );

        const { id: contactId, firstName, lastName, email } = contact;
        const draftUrl = `https://mail.google.com/mail/u/0/#drafts?compose=${messageId}`;
        const timestamp = new Date();

        // Create and write log entry
        const log: Log = { contactId, firstName, lastName, email, gmailId, draftUrl, timestamp };
        logEmailDraftCreation(log);
      }
    });
    showToast('Emails created successfully!', '✅ Success');
  } catch (error) {
    showToast('Could not send emails. Please try again.', '❌ Error');
    throw error;
  }
}
