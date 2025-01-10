# Specification for Google Apps Script App "Bulk Email to Team Contacts" - be-1-multiple-drafts-from-range

## High-Level Objective

Create multiple drafts from a selected range in a Google Sheet

## Mid-Level Objective

- Read emails from a selected range in a Google Sheet
- Create a draft email for each email in the range

## Implementation Notes

- Always write tests
- Carefully review each low-level task for exact code changes.

## Software Design Principles

### **General Design Principles**

- **Prioritize simplicity:** Eliminate unnecessary complexity and focus on clarity in code and design.
- **Encapsulate complexity:** Use modular design to hide details and provide clear, minimal interfaces.
- **Design for deep modules:** Offer significant functionality behind simple and minimal interfaces.
- **Minimize dependencies:** Reduce interconnections between components to simplify maintenance and updates.
- **Use abstraction effectively:** Ensure interfaces abstract essential details while hiding implementation complexity.
- **Avoid shallow abstractions:** Ensure modules and methods encapsulate substantial functionality.
- **Balance design principles:** Avoid extremes; aim for a balance between simplicity, functionality, and maintainability.
- **Design general-purpose modules:** Create reusable modules and interfaces that support multiple use cases.

### **Code Clarity and Readability**

- **Use meaningful names:** Ensure variable, method and class names are descriptive and consistent.
- **Write obvious code:** Make code self-explanatory using clear structure, good naming and strategic comments.
- **Provide documentation:** Write concise comments explaining purpose, usage and non-obvious details.
- **Format code for readability:** Use whitespace and consistent formatting to highlight structure and logic.
- **Follow conventions:** Adhere to consistent naming, coding styles, and patterns to enhance familiarity.
- **Avoid redundant comments:** Do not state what is obvious from the code itself; focus on what is not directly clear.
- **Document design decisions:** Capture rationale for critical choices to aid future understanding.

### **Complexity Management**

- **Define errors out of existence:** Redesign APIs to handle edge cases naturally without exceptions.
- **Encapsulate responsibilities:** Ensure each module handles its tasks internally and independently.
- **Eliminate special cases:** Simplify implementations by designing normal cases that inherently handle edge cases.
- **Centralize shared values:** Avoid duplication by using configuration files or centralized variables.
- **Pull complexity downward:** Encapsulate complex operations within modules, simplifying external interfaces.

### **Consistency**

- **Maintain consistent naming and patterns:** Standardize names and implementation styles across the codebase.
- **Adopt a uniform coding style:** Use style guides and enforce conventions with automated tools.
- **Design uniform interfaces:** Ensure similar features share consistent interfaces to simplify usage.
- **Follow existing patterns:** Conform to established conventions in the project or team to avoid introducing inconsistencies.

### **Performance**

- **Optimize critical paths:** Redesign around frequently executed operations to minimize execution time.
- **Reduce special cases:** Streamline logic by consolidating checks and handling exceptions separately.
- **Simplify for performance:** Write clean, efficient code that avoids unnecessary layers and redundancy.

### **Working with Code**

- **Adopt a strategic mindset:** Focus on creating clean, maintainable designs rather than quick fixes.
- **Document changes with the code:** Ensure code and its comments are updated together for clarity.
- **Evaluate multiple designs:** Explore and compare alternatives to select the cleanest and most effective solution.
- **Avoid mixing responsibilities:** Separate unrelated functionalities into distinct modules or methods.
- **Use design patterns wisely:** Apply established patterns where they fit naturally, but avoid overuse.

### **Comments and Documentation**

- **Write comments early:** Begin documentation during the design process to clarify abstractions and guide implementation.
- **Update comments with changes:** Keep documentation aligned with the evolving codebase.
- **Focus comments on intent:** Explain the purpose, behavior, and design decisions rather than mechanics.
- **Avoid duplication in documentation:** Place comments close to the relevant code and reference shared decisions where needed.
- **Separate interface and implementation comments:** Avoid mixing high-level descriptions with low-level details.

## Context

### Beginning context

- src/functions/SpreadsheetApp.ts
- src/lib/GmailApp.ts
- src/lib/SpreadsheetApp.ts
- src/menus/SpreadsheetApp.ts
- test/functions/SpreadsheetApp.test.ts
- test/lib/GmailApp.test.ts
- test/lib/SpreadsheetApp.test.ts
- test/mocks/SpreadsheetApp.ts

### Ending context

- src/functions/SpreadsheetApp.ts
- src/lib/GmailApp.ts
- src/lib/SpreadsheetApp.ts
- src/menus/SpreadsheetApp.ts
- test/functions/SpreadsheetApp.test.ts
- test/lib/GmailApp.test.ts
- test/lib/SpreadsheetApp.test.ts
- test/mocks/SpreadsheetApp.ts

## Low-Level Tasks

> Ordered from start to finish

1. Get sheet by name

   ```aider
   UPDATE src/lib/SpreasheetApp.ts:
       ADD getSheetByName(sheetName: string): GoogleAppsScript.Spreadsheet.Sheet
   ```

2. Get range by cell to last row

   ```aider
   UPDATE src/lib/SpreasheetApp.ts:
       ADD getRangeByCellToLastRow(sheet: GoogleAppsScript.Spreadsheet.Sheet, cell: string): GoogleAppsScript.Spreadsheet.Range
   ```

3. Get values from range

   ```aider
    UPDATE src/lib/SpreasheetApp.ts:
        ADD getValuesFromRange(range: GoogleAppsScript.Spreadsheet.Range): any[][]
   ```

4. Iterate over each email in the range and create draft emails

   ```aider
    UPDATE src/function/SpreasheetApp.ts:
        ADD createDraftEmailsFromRange(): void
            → call getSheetByName('contacts')
            → call getRangeFromRowByCellToLastRow(sheet, 'C3')
            → call getValuesFromRange(range)
            → iterate over each email in the range
                → call createDraftEmail(email)
   ```

5. Add menu item to create drafts from range

   ```aider
    UPDATE src/menu/SpreasheetApp.ts:
        ADD menu item to create drafts from range
            → call createDraftEmailsFromRange()
   ```

6. Write tests for each new function
   ```aider
    UPDATE test/lib/SpreasheetApp.test.ts:
        UPDATE global SpreadsheetApp mock if needed
        ADD describe block for getSheetByName(sheetName: string): void
        ADD describe block for getRangeByCellToLastRow(sheet: GoogleAppsScript.Spreadsheet.Sheet, cell: string): void
        ADD describe block for getValuesFromRange(range: GoogleAppsScript.Spreadsheet.Range): void
    UPDATE test/lib/GmailApp.test.ts:
        UPDATE global GmailApp mock if needed
        ADD test for getSheetByName(sheetName: string): void
        ADD describe block for getSheetByName(sheetName: string): void
        ADD describe block for getRangeByCellToLastRow(sheet: GoogleAppsScript.Spreadsheet.Sheet, cell: string): void
        ADD describe block for getValuesFromRange(range: GoogleAppsScript.Spreadsheet.Range): void****
    UPDATE src/functions/SpreasheetApp.ts:
        UPDATE "Mock lib functions" block if needed
        ADD describe block for createDraftEmailsFromRange(): void
    UPDATE mocks in test/mocks if needed
   ```
