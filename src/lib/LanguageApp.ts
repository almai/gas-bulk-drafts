/**
 * Translates text from one language to another using Google Apps Script LanguageApp
 * @param {string} text - The text to translate
 * @param {string} sourceLanguage - The source language code (e.g., 'en' for English)
 * @param {string} targetLanguage - The target language code (e.g., 'de' for German)
 * @returns {string} The translated text
 */
export const translate = (text: string, sourceLanguage: string, targetLanguage: string): string => {
  return LanguageApp.translate(text, sourceLanguage, targetLanguage);
};
