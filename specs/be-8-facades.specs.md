# Specification for Google Apps Script App "Bulk Email to Team Contacts" - be-8-facades

## High-Level Objective

Introduction of facades to abstract the Google Apps Script services.

## Mid-Level Objective

- Create facades for the used Google Apps Script services.
- Move all code that interacts with Google Apps Script services to the facades.
- Update the existing code to use the facades.

## Context

### Beginning context

- src/modules/SpreadsheetApp.ts
- src/modules/DocumentApp.ts
- src/modules/GmailApp.ts

### Ending context

- src/facades/GmailApp.ts
- src/facades/SpreadsheetApp.ts
- src/facades/index.ts
- src/models/index.ts
- src/models/log.model.ts
- src/models/types.ts
- src/modules/DocumentApp.ts
- src/modules/SpreadsheetApp.ts
- src/modules/contact.model.ts
- src/modules/template.model.ts

## Summary

This feature introduces facades to abstract the Google Apps Script services and refactors the code to use these facades. The changes are aimed at improving code organization and maintainability. Below are the most important changes:

### Introduction of Facades

* Created facades for `DocumentApp`, `GmailApp`, and `SpreadsheetApp` to interact with Google Apps Script services. (`src/facades/DocumentApp.ts`, `src/facades/GmailApp.ts`, `src/facades/SpreadsheetApp.ts`) [[1]](diffhunk://#diff-1f72158d2b3cb018867f9435ad91f474aa5643430c7c1de55e10f31c436d9259L2-R2) [[2]](diffhunk://#diff-d7e22cc798492e70ea903a335634c125f841197001218ee988723ea8c6977609R1-R18) [[3]](diffhunk://#diff-d4ef8c21e53ec536569253590f0b0a6bddc2697f2b101334a6631bd72154753eR1-R69)

### Refactoring to Use Facades

* Updated existing code to use the newly created facades, including renaming functions and updating imports. (`src/modules/SpreadsheetApp.ts`) [[1]](diffhunk://#diff-fa3ed5da4ed6ca9c29b8dc2b400b4fe6e56721d920ff3627e2234095265bf913L4-R27) [[2]](diffhunk://#diff-fa3ed5da4ed6ca9c29b8dc2b400b4fe6e56721d920ff3627e2234095265bf913L73-L84) [[3]](diffhunk://#diff-fa3ed5da4ed6ca9c29b8dc2b400b4fe6e56721d920ff3627e2234095265bf913L93-R60) [[4]](diffhunk://#diff-fa3ed5da4ed6ca9c29b8dc2b400b4fe6e56721d920ff3627e2234095265bf913L134-R122) [[5]](diffhunk://#diff-fa3ed5da4ed6ca9c29b8dc2b400b4fe6e56721d920ff3627e2234095265bf913L176-R144) [[6]](diffhunk://#diff-fa3ed5da4ed6ca9c29b8dc2b400b4fe6e56721d920ff3627e2234095265bf913L191-R167) [[7]](diffhunk://#diff-fa3ed5da4ed6ca9c29b8dc2b400b4fe6e56721d920ff3627e2234095265bf913L228-R181) [[8]](diffhunk://#diff-fa3ed5da4ed6ca9c29b8dc2b400b4fe6e56721d920ff3627e2234095265bf913L241-R208)

### Code Organization

* Moved all code interacting with Google Apps Script services to the facades and updated the module exports accordingly. (`src/facades/index.ts`)

### Data Models

* Defined data models and types in separate files for better organization and clarity. (`src/models/contact.model.ts`, `src/models/log.model.ts`, `src/models/template.model.ts`, `src/models/types.ts`) [[1]](diffhunk://#diff-ec5fe2c5199d6805f31892e76c0388ad27a6ef43f225755dbf16056c91d44da4R1-R4) [[2]](diffhunk://#diff-c7baeb4f91ad43d5e5b51da1551710da537b7d34e2dc28ac6920b1602902f929R1-R4) [[3]](diffhunk://#diff-b96b26ce6d0d14bfe0fe06650b4dfba0ae0492dbc1c3b4c821436f4824a99d48L1-R13) [[4]](diffhunk://#diff-f851ca827241622b321c32db1d55519096d871f3ecaff8e4f081a16249c79e85R1-R13)

### Removal of Redundant Code

* Removed redundant methods and code that was replaced by the new facade functions. (`src/modules/GmailApp.ts`, `src/modules/SpreadsheetApp.ts`) [[1]](diffhunk://#diff-dfd4fe3076fd258f65f65d72ecfcf44393b7ddc179edc1f025d3a35de7eb49aaL1-L13) [[2]](diffhunk://#diff-fa3ed5da4ed6ca9c29b8dc2b400b4fe6e56721d920ff3627e2234095265bf913L4-R27)

These changes enhance the maintainability and readability of the code by abstracting the Google Apps Script services and organizing the data models and types more effectively.
