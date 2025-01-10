import { sayHelloSpreadsheet } from '../functions/SpreadsheetApp';
import { createDraftMsg } from '../functions/GmailApp';

export const getMenu = () => {
  const ui = SpreadsheetApp.getUi();

  return ui
    .createMenu('Advanced')
    .addItem('Say Hello', 'sayHello')
    .addItem('Create Draft Message', 'createDraftMsg')
    .addToUi();
};

// Export functions to make them available in the Apps Script environment
(global as any).sayHello = sayHelloSpreadsheet;
(global as any).createDraftMsg = createDraftMsg;
