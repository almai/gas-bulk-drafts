/**
 * Google Apps Script Document manipulation utilities
 */

/**
 * Gets the entire content of a document
 * @param {string} documentId - The ID of the document to read
 * @returns {string} The full text content of the document
 * @throws {GoogleAppsScript.Document.DocumentApp.Exception} If document cannot be opened or accessed
 */
export const getDocumentContent = (documentId: string): string => {
  const doc = DocumentApp.openById(documentId);
  return doc.getBody().getText();
};

/**
 * Gets the name of a Google Doc
 * @param {string} documentId - The ID of the document
 * @returns {string} The name of the document
 */
export const getDocumentName = (documentId: string): string => {
  // Open the document by ID
  const doc = DocumentApp.openById(documentId);

  // Get the name of the document
  return doc.getName();
};
