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
  switch (type) {
    case "toggle_theme":
      return {
        ...state,
        theme: (state.theme === "light") ? "dark" : "light",
      }
    case "number":
      return {
        ...state,
        expression: (state.expression === "0" ? "" : state.expression) + symbol,
      };
    case "operator":
      if (state.expression === "0") return { ...state };
      const lastChar = state.expression.slice(-1);
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
    case "negative":
      return {
        ...state,
        expression: state.expression.startsWith("-") ? state.expression.slice(1) : "-" + state.expression,
      }
    case "bracket_open":
      // TODO
      if (!operators.includes(state.expression.slice(-1))) {
        return {
          ...state,
          expression: state.expression + "*(",
        }
      }

      return {
        ...state,
        expression: (state.expression === "0") ? "(" : state.expression + "(",
      }
    case "bracket_close":
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
