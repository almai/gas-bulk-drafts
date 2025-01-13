# Bulk Email to Employees Contacts

A Google Apps Script application that automates creating draft emails for employess contacts with customizable templates and logging capabilities.

## Features

- Creates draft emails from contact data in Google Sheets
- Supports multiple languages (English and German)
- Handles formal and casual salutations
- Customizable templates with variable substitution
- Automatic logging of created drafts
- Toast notifications for operation status

## Structure

### Core Modules

- **SpreadsheetApp Module**: Main functionality for handling spreadsheet operations
- **GmailApp Module**: Email draft creation and management
- **DocumentApp Module**: Document content handling

### Models

- **Contact**: Contact information and preferences
- **Template**: Email template structure and variables
- **Log**: Draft creation logging data
- **Types**: Common TypeScript type definitions

### Facades

- **SpreadsheetApp Facade**: Interface for Google Sheets operations
- **GmailApp Facade**: Interface for Gmail operations
- **DocumentApp Facade**: Interface for Google Docs operations

## Requirements

- Google Apps Script environment
- Google Sheets
- Gmail access
- TypeScript support

## Setup

1. Enable Google Apps Script API
2. Configure clasp for deployment
3. Set up required Google Sheets:
- Employees sheet
- Contacts sheet
- Config sheet
- Log sheet

## Sheet Structure

### Employees Sheet

Contains employee information with columns:

- id
- firstName	lastName
- gender
- isActive
- email

### Contacts Sheet

Contains contact information with columns:

- id
- firstName
- lastName
- email
- gender
- formal
- language
- isInternal
- isActive
- employeeId
- employeeFirstName
- employeeLastName
- employeeGender
- employeeIsActive
- employeePersonalPronoun
- employeePossessivePronoun

### Config Sheet

Stores template configurations and document IDs:

**Ids**:
- docId
- spreadsheetId
- projectId

**Templates**
- subjectDe
- subjectEn
- salutationDeFormalMale
- salutationDeFormalFemale
- salutationEnFormalMale
- salutationEnFormalFemale
- salutationDeCasual
- salutationEnCasual
- msgDeCasual
- msgDeFormal
- msgEn

### Log SheetRecords draft email creation with:

- contactId
- firstName
- lastName
- email
- gmailId
- draftUrl
- timestamp

## Usage

1. Open the Google Sheet containing contact data
2. Use the "Advanced" menu
3. Select "Create Drafts from Contacts"
4. Draft emails will be created based on templates
5. Check the Log sheet for creation records

## Development

### Technologies- TypeScript

- Google Apps Script
- Jest for testing
- ESLint for code quality
- Prettier for code formatting

### Testing

```bash
npm run test
```

### Building

```bash
npm run build
```

### Deployment

```bash
npm run deploy
```

## Design Principles

- Modular architecture with clear separation of concerns
- Facade pattern for Google services abstraction
- Strong typing with TypeScript
- Comprehensive error handling
- Efficient data caching
- Clear logging and user feedback

## Error Handling

- Validates required columns
- Checks for active contacts
- Verifies template content
- Provides user feedback via toast messages
- Logs errors appropriately

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## License

MIT

[MIT License](https://github.com/almai/blob/master/LICENSE)

## Author

[Alex Maiburg](https://alexmaiburg.de)
