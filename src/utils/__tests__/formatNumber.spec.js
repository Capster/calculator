import { formatNumber } from '../formatNumber';

describe("formatNumber", () => {
  test("it should format a number stored inside a string", () => {
    expect(formatNumber("1234567890")).toBe("1,234,567,890");
  });

  test("it should format a number with a floating point", () => {
    expect(formatNumber("1234567890.123456789")).toBe("1,234,567,890.123456789");
  });

  test("it should return the same string if there is no number", () => {
    expect(formatNumber("Hello world!")).toBe("Hello world!");
  });
});
