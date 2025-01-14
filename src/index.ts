import createDraftEmailsFromContacts from './modules/spreadsheet-app.module';

const onOpen = (): void => {
  SpreadsheetApp.getUi()
    .createMenu('Extras')
    .addItem('✉️ Create Draft Emails', 'createDraftEmailsFromContacts')
    .addToUi();
};

// Export modules to make them available in the Apps Script environment
(global as any).onOpen = onOpen;
(global as any).createDraftEmailsFromContacts = createDraftEmailsFromContacts;
