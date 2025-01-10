import { getDocumentName } from '../../src/lib/DocumentApp';
import { mockDoc } from '../mocks/DocumentApp';

// Mock global DocumentApp
(global as any).DocumentApp = {
  openById: jest.fn().mockReturnValue(mockDoc)
};

describe('DocumentApp Lib', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('getDocumentName', () => {
    test('returns document name', () => {
      const expectedName = 'Test Document';
      mockDoc.getName.mockReturnValue(expectedName);

      const result = getDocumentName('doc123');

      expect(result).toBe(expectedName);
      expect(DocumentApp.openById).toHaveBeenCalledWith('doc123');
      expect(mockDoc.getName).toHaveBeenCalled();
    });
  });
});
