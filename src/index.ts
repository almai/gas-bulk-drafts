import { getMenu } from './menus/SpreadsheetApp';

const onOpen = (): void => {
  getMenu();
};

// Export functions to make them available in the Apps Script environment
(global as any).onOpen = onOpen;
