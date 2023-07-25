import { formatOperator } from "../formatOperator"

describe("formatOperator", () => {
  test("it should return undefined", () => {
    expect(formatOperator("!")).toBeUndefined();
  });

  test("it should return a special symbol", () => {
    expect(formatOperator("+")).toBe("+");
    expect(formatOperator("-")).toBe("-");
    expect(formatOperator("*")).toBe("×");
    expect(formatOperator("/")).toBe("÷");
  });
});
