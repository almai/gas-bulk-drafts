/**
 * Utility class for date/time formatting and other common operations
 */
export class DateUtils {
  /**
   * Returns the current date and time in "DD.MM.YYYY, HH:mm" format
   * @returns {string} Formatted date and time string
   */
  static getCurrentDateTime(): string {
    return `${this.day}.${this.month}.${this.year}, ${this.hours}:${this.minutes}`;
  }

  /**
   * Returns the current date in "DD.MM.YYYY" format
   * @returns {string} Formatted date string
   */
  static getFormattedDate(): string {
    return `${this.day}.${this.month}.${this.year}`;
  }

  private static get now(): Date {
    return new Date();
  }

  private static get day(): string {
    return String(this.now.getDate()).padStart(2, '0');
  }

  private static get month(): string {
    return String(this.now.getMonth() + 1).padStart(2, '0');
  }

  private static get year(): string {
    return String(this.now.getFullYear());
  }

  private static get hours(): string {
    return String(this.now.getHours()).padStart(2, '0');
  }

  private static get minutes(): string {
    return String(this.now.getMinutes()).padStart(2, '0');
  }
}
