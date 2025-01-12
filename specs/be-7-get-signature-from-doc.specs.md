# Specification for Google Apps Script App "Bulk Email to Team Contacts" - be-7-get-signature-from-doc

## High-Level Objective

Get the signature from the Google Doc and append it to the email body.

## Mid-Level Objective

- Find the Google docId in the "Config" sheet.
- Get the Google Doc by the docId.
- Get the content of the Google Doc.
- Append the content of the Google Doc to the email body.

## Context

### Beginning context

- src/modules/SpreadsheetApp.ts
- src/modules/DocumentApp.ts

### Ending context

- src/modules/SpreadsheetApp.ts
- src/modules/DocumentApp.ts

## Tasks

## Tasks

1. Find the Google docId in the "Config" sheet.

    ```aider
    UPDATE src/modules/SpreadsheetApp.ts:
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
