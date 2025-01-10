/**
 * Google Apps Script Document manipulation utilities
 * @module document
 * @description
 * This module provides a collection of functions for working with Google Docs.
 * @since 1.0.0
 */

/**
 * Gets the entire content of a document
 * @since 1.0.0
 * @param {string} documentId - The ID of the document to read
 * @returns {string} The full text content of the document
 * @throws {GoogleAppsScript.Document.DocumentApp.Exception} If document cannot be opened or accessed
 * @example
 * ```typescript
 * // Get content from a document
 * const content = getDocumentContent('1234567890abcdef');
 * console.log(`Document content: ${content.substring(0, 100)}...`);
 * ```
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
