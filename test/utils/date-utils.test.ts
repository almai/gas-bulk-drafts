import { DateUtils } from '../../src/utils';

describe('getCurrentDateTime', () => {
  test('returns date time in correct format', () => {
    const result = DateUtils.getCurrentDateTime();

    // Check format DD.MM.YYYY, HH:mm
    expect(result).toMatch(/^\d{2}\.\d{2}\.\d{4}, \d{2}:\d{2}$/);

    // Verify parts are valid
    const [datePart, timePart] = result.split(', ');
    const [day, month, year] = datePart.split('.');
    const [hours, minutes] = timePart.split(':');

    expect(Number(day)).toBeGreaterThanOrEqual(1);
    expect(Number(day)).toBeLessThanOrEqual(31);
    expect(Number(month)).toBeGreaterThanOrEqual(1);
    expect(Number(month)).toBeLessThanOrEqual(12);
    expect(Number(year)).toBeGreaterThanOrEqual(2024);
    expect(Number(hours)).toBeLessThanOrEqual(23);
    expect(Number(minutes)).toBeLessThanOrEqual(59);
  });
});

describe('getFormattedDate', () => {
  test('returns date in correct format', () => {
    const result = DateUtils.getFormattedDate();

    // Check format DD.MM.YYYY
    expect(result).toMatch(/^\d{2}\.\d{2}\.\d{4}$/);

    // Verify parts are valid
    const [day, month, year] = result.split('.');

    expect(Number(day)).toBeGreaterThanOrEqual(1);
    expect(Number(day)).toBeLessThanOrEqual(31);
    expect(Number(month)).toBeGreaterThanOrEqual(1);
    expect(Number(month)).toBeLessThanOrEqual(12);
    expect(Number(year)).toBeGreaterThanOrEqual(2024);
  });

  test('pads single digit day and month with zero', () => {
    // Mock date to January 5, 2024
    const mockDate = new Date(2024, 0, 5);
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

    const result = DateUtils.getFormattedDate();
    expect(result).toBe('05.01.2024');

    jest.restoreAllMocks();
  });
});
