import { mockUi } from './Ui';

export const elementId = 123;

export const mockTable = {
  getRow: jest.fn().mockReturnValue({
    editAsText: jest.fn().mockReturnValue({
      setBold: jest.fn()
    })
  })
};

export const mockText = {
  editAsText: jest.fn().mockReturnThis(),
  copy: jest.fn(),
  getFontFamily: jest.fn().mockReturnValue('Arial'),
  getFontSize: jest.fn().mockReturnValue(12),
  getForegroundColor: jest.fn().mockReturnValue('#000000'),
  getText: jest.fn().mockReturnValue('Sample text'),
  insertText: jest.fn(),
  isBold: jest.fn().mockReturnValue(true),
  isItalic: jest.fn().mockReturnValue(false),
  setBold: jest.fn(),
  setFontFamily: jest.fn(),
  setFontSize: jest.fn(),
  setForegroundColor: jest.fn(),
  setItalic: jest.fn(),
  setLinkUrl: jest.fn(),
  setText: jest.fn(),
  setUnderline: jest.fn(),
  setStrikethrough: jest.fn()
};

export const mockElement = {
  asParagraph: jest.fn().mockReturnValue(mockText),
  asText: jest.fn().mockReturnValue(mockText),
  editAsText: jest.fn().mockReturnValue(mockText),
  getAttributes: jest.fn().mockReturnValue({
    BOLD: true,
    FONT_FAMILY: 'Arial',
    FONT_SIZE: 12,
    FOREGROUND_COLOR: '#000000',
    ITALIC: false
  }),
  getId: jest.fn().mockReturnValue(elementId),
  getType: jest.fn(),
  setHeading: jest.fn().mockReturnThis()
};

export const mockRangeElement = {
  getElement: jest.fn().mockReturnValue(mockElement),
  isPartial: jest.fn().mockReturnValue(true),
  getStartOffset: jest.fn().mockReturnValue(0),
  getEndOffsetInclusive: jest.fn().mockReturnValue(8)
};

export const mockSelection = {
  getRangeElements: jest.fn().mockReturnValue([mockRangeElement])
};

export const mockCursor = {
  getElement: jest.fn().mockReturnValue(mockElement),
  getOffset: jest.fn().mockReturnValue(5),
  insertInlineImage: jest.fn()
};

export const mockBody = {
  appendHorizontalRule: jest.fn(),
  appendPageBreak: jest.fn(),
  appendParagraph: jest.fn(),
  appendTable: jest.fn().mockReturnValue(mockTable),
  clear: jest.fn(),
  findText: jest.fn(),
  getChild: jest.fn().mockReturnValue(mockElement),
  getNumChildren: jest.fn().mockReturnValue(1),
  getRangeElements: jest.fn(),
  getText: jest.fn().mockReturnValue('Document content'),
  insertParagraph: jest.fn().mockReturnValue(mockElement),
  setText: jest.fn()
};

export const mockDoc = {
  getBody: jest.fn().mockReturnValue(mockBody),
  getCursor: jest.fn().mockReturnValue(mockCursor),
  getId: jest.fn().mockReturnValue('mock-doc-id'),
  getName: jest.fn().mockReturnValue('Test Document'),
  getSelection: jest.fn().mockReturnValue(mockSelection),
  getUi: jest.fn().mockReturnValue(mockUi),
  getUrl: jest.fn().mockReturnValue('https://docs.google.com/document/d/mock'),
  saveAndClose: jest.fn()
};
