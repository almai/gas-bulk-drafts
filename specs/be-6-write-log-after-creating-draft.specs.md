# Specification for Google Apps Script App "Bulk Email to Team Contacts" - be-6-write-log-after-creating-draft

## High-Level Objective

After creating the draft email, write a log to the spreadsheet.

## Mid-Level Objective

- After creating the draft email, write a log for each email with the following information:
    - contactId
    - firstName
    - lastName
    - email
    - url (link to the draft email)
    - timestamp

## Context

### Beginning context

- src/modules/SpreadsheetApp.ts
- src/modules/GmailApp.ts
- src/models/contact.model.ts
- src/models/index.ts

### Ending context

- src/modules/SpreadsheetApp.ts
- src/modules/GmailApp.ts
- src/models/contact.model.ts
- src/models/index.ts
- src/models/log.model.ts

## Tasks

1. Create a log model

    ```aider
    CREATE src/models/log.model.ts:
        ADD following properties to the Log interface:
          - contactId
          - firstName
          - lastName
          - email
          - url (link to the draft email)
          - timestamp
    UPDATE src/models/index.ts:
        ADD export * from './log.model';
    ```

2. Get the draft email URL
    ```aider
    UPDATE src/modules/GmailApp.ts:
        UPDATE createDraft()
            → after creating the draft email, return the URL of the draft email
    ```

3. Write the log to the spreadsheet

    ```aider
    UPDATE src/modules/SpreadsheetApp.ts:
        ADD logEmailDraftCreation(log: Log): void
            → Find the first empty row in the "Log" sheet
            → Find the corresponding row header in the "Log" sheet for each property in the log and write the value
    UPDATE src/modules/SpreadsheetApp.ts:
        UPDATE createDraftEmailsFromContacts()
            → after creating the draft email, call logEmailDraftCreation() with the log
    ```
   
##  Pay attention to following details

- Import all modules and models correctly.
- Do not place new functions between already existing functions and their comments. 
- Always add a comment to explain the purpose of the new function.
