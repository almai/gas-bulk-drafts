declare interface Document {
  getId(): string;
  getSelection(): any;
  getBody(): any;
  getName(): string;
  saveAndClose(): void;
  getUi(): any;
  getCursor(): any;
  asText(): any;
  getElement(): any;
  getOffset(): number;
}
