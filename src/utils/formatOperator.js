const prettyOperators = {
  "*": "×",
  "/": "÷",
  "+": "+",
  "-": "-"
}

export function formatOperator(str) {
  return prettyOperators[str]
}
