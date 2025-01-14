# Bulk Email Drafts to Employees Contacts

A Google Apps Script application that automates creating draft emails for employees contacts with customizable templates and logging capabilities.

## Features

- Creates draft emails from contact data in Google Sheets
- Appends the Gmail signature of the default user
- Supports multiple languages (English and German)
- Handles formal and casual salutations
- Customizable templates with variable substitution
- Automatic logging of created drafts
- Toast notifications for operation status

## Google Sheet Example

Head over to the [Google Sheet Example](https://docs.google.com/spreadsheets/d/15y1_PscTRG3AOKLNZ5dWT5T_oJFdcYFo-dHi0oLhnrc/edit?gid=176114814#gid=176114814), copy it to your Google Drive, and start using the application.

## Structure

### Core Modules

- **SpreadsheetApp Module**: Main functionality for handling spreadsheet operations
- **GmailApp Module**: Email draft creation and management

### Models

- **Contact**: Contact information and preferences
- **Template**: Email template structure and variables
- **Log**: Draft creation logging data
- **Types**: Common TypeScript type definitions

### Facades

- **SpreadsheetApp Facade**: Interface for Google Sheets operations
- **GmailApp Facade**: Interface for Gmail operations

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
- Templates sheet
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

### Templates Sheet

Stores templates:

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
2. Add new contacts to the "Contacts" sheet and link it to the employee by entering the employeeId
3. Use the "Extras" menu
4. Select "✉️ Create Draft Emails"
5. Draft emails will be created based on templates
6. Check the Log sheet for creation records

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

[MIT License](https://github.com/almai/blob/master/LICENSE)

## Author

[Alex Maiburg](https://alexmaiburg.de)

## Reporting Issues

If you find a bug head over to [GitHub](https://github.com/almai/bulk-email/issues/new) and create a new issue.
