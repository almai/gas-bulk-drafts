# Specification for Google Apps Script App "Bulk Email to Team Contacts" - be-10-append-gmail

## High-Level Objective

- Append the Gmail signature to the email body.
- Create different template types for formal and casual emails in German.

## Mid-Level Objective

- Get email signature from Gmail
- Append it to the message
- Send it as HTML to create the draft emails
- Create msgDeCasual and msgDeFormal template types

## Context

### Beginning context

- src/constants/type-data.ts
- src/constants/template-data.ts
- src/facades/gmail-app.facade.ts
- src/facades/index.ts
- src/models/types.ts
- src/modules/spreadsheet-app.module.ts
- tests/error.test.ts
- tests/mocks.ts
- tests/success.test.ts

### Ending context

- src/constants/type-data.ts
- src/constants/template-data.ts
- src/facades/gmail-app.facade.ts
- src/facades/index.ts
- src/models/types.ts
- src/modules/spreadsheet-app.module.ts
- tests/error.test.ts
- tests/mocks.ts
- tests/success.test.ts

## Tasks

1. Get email signature of the default account in Gmail and append it to the message

   ```aider
   UPDATE src/facades/gmail-app.facade.ts
       UPDATE getDocumentBodyById(documentId: string): string
           → Get signature from Gmail
           → Concatenate the signature with the message
           → Create a new variable htmlBody and send send it as options to Gmail.createDraft()
   REMOVE src/facades/gmail-app.facade.ts
   UPDATE src/modules/spreadsheet-app.module.ts
       REMOVE globalDocId
       UPDATE setConfigData()
           → REMOVE globalDocId code
       UPDATE setConfigData()
           → REMOVE globalDocId code

   ```

2. Create msgDeCasual and msgDeFormal template types

   ```aider
   UPDATE src/constants/types.ts
       UPDATE ConfigTemplateKeys
           → REMOVE msgDe
           → ADD msgDeCasual
           → ADD msgDeFormal
   UPDATE src/constants/type-data.ts
       UPDATE templateData
           → REMOVE msgDe
           → ADD msgDeCasual
           → ADD msgDeFormal
   UPDATE src/modules/spreadsheet-app.module.ts
       UPDATE getTemplateWithSubstitutions()
           → ADD funcionality to handle msgDeCasual and msgDeFormal
   ```

3. UPDATE tests accordingly

   ```aider
   UPDATE tests/error.test.ts
   UPDATE tests/success.test.ts
   UPDATE tests/mocks.ts
   ```
