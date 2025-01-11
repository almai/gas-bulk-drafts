# Specification for Google Apps Script App "Bulk Email to Team Contacts" - be-3-get-templates-with-substitutions

## High-Level Objective

Get templates for subject, salutation and message body with substitutions for a contact in the "Contacts" sheet.

## Mid-Level Objective

- Find the template name (e.g. subjectDe) in the "Config" sheet.
- Find the variables in the template and replace them with the appropriate values from contact, employee or other (like pronouns).
- Return the template with the substitutions.
- Use subject, salutation + message = email body for the email drafts.

## Implementation Notes

- Always write tests
- Carefully review each low-level task for exact code changes.

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

- src/constants/template-data.ts
- src/functions/SpreadsheetApp.ts
- src/lib/SpreadsheetApp.ts
- src/menus/SpreadsheetApp.ts
- src/models/contact.model.ts
- src/models/employee.model.ts
- src/models/person.model.ts
- src/models/template.model.ts
- test/functions/SpreadsheetApp.test.ts
- test/lib/SpreadsheetApp.test.ts
- test/mocks/SpreadsheetApp.ts

### Ending context

- src/constants/template-data.ts
- src/functions/SpreadsheetApp.ts
- src/lib/SpreadsheetApp.ts
- src/menus/SpreadsheetApp.ts
- src/models/contact.model.ts
- src/models/employee.model.ts
- src/models/person.model.ts
- src/models/template.model.ts
- test/functions/SpreadsheetApp.test.ts
- test/lib/SpreadsheetApp.test.ts
- test/mocks/SpreadsheetApp.ts

## Low-Level Tasks

⚠️Heads-up: The contacts table has changed:

```aider
    |id |firstName|lastName |email             |gender|formal|language|isInternal|isActive|employeeId|employeeFirstName|employeeLastName|employeeGender|employeeIsActive|employeePersonalPronoun|employeePossessivePronoun|
    |---|---------|---------|------------------|------|------|--------|----------|--------|----------|-----------------|----------------|--------------|----------------|-----------------------|-------------------------|
    |1  |Dario    |Soller   |test11@maiburg.com|male  |TRUE  |de      |FALSE     |TRUE    |2         |Robert           |Schwarz         |male          |TRUE            |er                     |sein                     |
    |2  |Robert   |Schwarz  |test22@maiburg.com|male  |FALSE |de      |FALSE     |TRUE    |1         |Dario            |Soller          |male          |TRUE            |er                     |sein                     |
    |3  |Malin    |Klingsell|test33@maiburg.com|femal |TRUE  |en      |FALSE     |TRUE    |4         |Simon            |Maling          |male          |TRUE            |he                     |his                      |
    |4  |Simon    |Maling   |test44@maiburg.com|male  |FALSE |en      |FALSE     |TRUE    |3         |Malin            |Klingsell       |female        |TRUE            |she                    |her                      |
```

1. Get templates with substitutions for a contact

    ```aider
    UPDATE src/lib/SpreasheetApp.ts:
        ADD getTemplateWithSubstitutions(contact: Contact, templateName: 'subject' | 'salutation' | 'msg'): string
            → iterate over each template from "src/constants/template-data.ts"
                → find the cell that contains its name in the "Config" sheet
                → get the value of the cell on the right next to it (which contains the template with variables)
                → iterate over template.variables[]
                    → replace each variable in the template (e. g. {{employeeFirstName}}, {{personalPronoun}}) with the appropriate value from contact
                    → set template.content to the value with the substitutions
            → if templateName is 'subject'
                → depending on the contacts language return subjectDe or subjectEn
            → if templateName is 'salutation'
                → depending on the contacts language, formal, gender return salutationDeFormalMale, salutationDeFormalFemale, salutationEnFormalMale, salutationEnFormalFemale, salutationDeCasual or salutationEnCasual
            → if templateName is 'msg'
                → depending on the contacts language return msgDe or msgEn
    ```

2. Create draft emails with templates from contacts

    ```aider
    UPDATE src/functions/SpreasheetApp.ts:
        UPDATE createDraftEmailsFromContacts
            → get the subject, salutation and msg with substitutions for each contact, but filter out inactive or internal contacts
            → concatenate salutation and msg to create the email body
            → call createDraft() with the subject and email body
    ```

⚠️Heads-up: The contacts table has changed:

```aider
   UPDATE test/mocks/SpreasheetApp.ts:
        UPDATE test data to test against according to the new contacts table
    |id |firstName|lastName |email             |gender|formal|language|isInternal|isActive|employeeId|employeeFirstName|employeeLastName|employeeGender|employeeIsActive|employeePersonalPronoun|employeePossessivePronoun|
    |---|---------|---------|------------------|------|------|--------|----------|--------|----------|-----------------|----------------|--------------|----------------|-----------------------|-------------------------|
    |1  |Dario    |Soller   |test11@maiburg.com|male  |TRUE  |de      |FALSE     |TRUE    |2         |Robert           |Schwarz         |male          |TRUE            |er                     |sein                     |
    |2  |Robert   |Schwarz  |test22@maiburg.com|male  |FALSE |de      |FALSE     |TRUE    |1         |Dario            |Soller          |male          |TRUE            |er                     |sein                     |
    |3  |Malin    |Klingsell|test33@maiburg.com|femal |TRUE  |en      |FALSE     |TRUE    |4         |Simon            |Maling          |male          |TRUE            |he                     |his                      |
    |4  |Simon    |Maling   |test44@maiburg.com|male  |FALSE |en      |FALSE     |TRUE    |3         |Malin            |Klingsell       |female        |TRUE            |she                    |her                      |
```

3. Write tests for each new function, update test for changed functions

    ```aider
    UPDATE test/lib/SpreasheetApp.test.ts:
        ADD describe block for getPersonArrayFromSheet(sheetName: string): void
    UPDATE test/mocks/SpreasheetApp.ts:
        UPDATE test data to test against according to the new contacts table
    UPDATE test/functions/SpreasheetApp.ts:
        UPDATE tests for createDraftEmailsFromContacts(): void
    ```
