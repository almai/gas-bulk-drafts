import { translate } from '../../src/lib/LanguageApp';

// Mock global LanguageApp
(global as any).LanguageApp = {
  translate: jest.fn()
};

describe('LanguageApp Lib', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('translate', () => {
    test('translates text correctly', () => {
      const sourceText = 'Hello world';
      const expectedTranslation = 'Hallo Welt';
      LanguageApp.translate = jest.fn().mockReturnValue(expectedTranslation);

      const result = translate(sourceText, 'en', 'de');

      expect(result).toBe(expectedTranslation);
      expect(LanguageApp.translate).toHaveBeenCalledWith(sourceText, 'en', 'de');
    });
  });
});
