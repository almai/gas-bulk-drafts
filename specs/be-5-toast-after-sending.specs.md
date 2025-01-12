# Specification for Google Apps Script App "Bulk Email to Team Contacts" - be-5-toast-after-sending

## High-Level Objective

After sending the emails, the user should be informed about the success.

## Mid-Level Objective

- After sending the emails, a toast should be shown to the user, if the emails were sent successfully or not.

## Context

### Beginning context

- src/modules/SpreadsheetApp.ts

### Ending context

- src/modules/SpreadsheetApp.ts

## Low-Level Tasks

1. Implement toast functionality

    ```aider
    UPDATE src/modules/SpreadsheetApp.ts:
        ADD showToast(success: boolean): void
            → if success is true: show a toast with title "✅Success" and message "https://mail.google.com/mail/u/0/#drafts"
            → if success is false: show a toast with title "❌Error" and message "Could not send emails. Please try again."
    ```

2. Call the toast function after sending the emails

    ```aider
    UPDATE src/modules/SpreadsheetApp.ts:
        UPDATE createDraftEmailsFromContacts(): void
            → after sending the emails, call showToast(true) if successful, otherwise call showToast(false)
    ```
