/**
 * @file This file defines the data model for the log.
 */

export interface Log {
  contactId: number;
  firstName: string;
  lastName: string;
  email: string;
  gmailId: string;
  draftUrl: string;
  timestamp: Date;
}
