# Specification for Google Apps Script App "Bulk Email to Team Contacts" - be-7-optimise-script

## High-Level Objective

Make information from "Config" sheet globally accessible to reduce the number of data retrieval operations.

## Mid-Level Objective

- Create variables to store the data that is used multiple times.
- Retrieve the template data and the docId only once.
- Store the template data and the docId in the global variables.
- Remove redundant data retrieval operations.

## Tasks

1. Create variables

    ```aider
    UPDATE src/modules/SpreadsheetApp.ts:
        ADD templateData: TemplateData
        ADD docId: string
    ```

2. Retrieve template data

    ```aider
    UPDATE src/modules/SpreadsheetApp.ts:
        ADD getTemplateData(): TemplateData
            → MOVE the code from getTemplateWithSubstitutions() that loads the template data and replaces the template variables
        UPDATE getTemplateWithSubstitutions(),
            → USE the global variable "templateData" to get the template data
    ```

3. Call functions to store template data and docId

    ```aider
    UPDATE src/modules/SpreadsheetApp.ts:
        UPDATE createDraftEmailsFromContacts(), 
            → call getTemplateData() and store it in the global variable "templateData"
            → find "docId" in config data, get the id (cell right to it) and store it in the global variable "docId"
    ```

4. Remove redundant data retrieval operations

    ```aider
    UPDATE src/modules/SpreadsheetApp.ts:
        REMOVE all redundant data retrieval operations
    ```   
