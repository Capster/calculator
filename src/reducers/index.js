export function reducer(state, action) {
  const nextState = _reducer(state, action);

  let result
  try {
    // eslint-disable-next-line 
    result = eval(nextState.expression);
  } catch (e) {
    result = nextState.result;
  }

  return {
    ...nextState,
    result: String(result),
  }
}

const operators = ['+', '-', '*', '/'];

const _reducer = (state, { type, symbol }) => {
  const lastChar = state.expression.slice(-1);
  const isEmpty = state.expression === "0";
  const count = pattern => (state.expression.match(pattern) || []).length;

  switch (type) {
    case "toggle_theme":
      return {
        ...state,
        theme: (state.theme === "light") ? "dark" : "light",
      }
    case "number":
      return {
        ...state,
        expression: (isEmpty ? "" : state.expression) + symbol,
      };
    case "operator":
      if (isEmpty) return { ...state };
      const nextExpression = operators.includes(lastChar)
        ? state.expression.substr(0, state.expression.length - 1) + symbol
        : state.expression + symbol;
      return {
        ...state,
        expression: nextExpression,
      }
    case "point":
      const regex = /[\s-+*/]+/;
      const numbers = state.expression.split(regex);
      const lastNumber = numbers[numbers.length - 1];
      return {
        ...state,
        expression: lastNumber.includes(".") ? state.expression : state.expression + ".",
      }
    case "backspace":
      return {
        ...state,
        expression: (state.expression.length === 1) ? "0" : state.expression.slice(0, -1),
      }
    case "bracket_open":
      if (isEmpty) return { ...state, expression: "(" };
      return {
        ...state,
        expression: state.expression + ((lastChar === "(" || operators.includes(lastChar)) ? "(" : "*("),
      }
    case "bracket_close":
      const opened = count(/\(/g);
      const closed = count(/\)/g);
      if (operators.includes(lastChar) || opened === closed) return { ...state }
      return {
        ...state,
        expression: state.expression + ")",
      }
    case "clear":
      return {
        ...state,
        expression: "0",
      }
    case "eq":
      return {
        ...state,
        expression: state.result,
        result: "0",
      }
    default:
      throw Error(`Unknown action: ${type}`);
  }
};
