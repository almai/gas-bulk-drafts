import { createDraftEmailsFromContacts } from './modules/SpreadsheetApp';

const onOpen = (): void => {
  SpreadsheetApp.getUi()
    .createMenu('Advanced')
    .addItem('Create Drafts from Contacts', 'createDraftEmailsFromContacts')
    .addToUi();
};

// Export modules to make them available in the Apps Script environment
(global as any).onOpen = onOpen;
(global as any).createDraftEmailsFromContacts = createDraftEmailsFromContacts;
