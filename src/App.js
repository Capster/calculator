import './App.css';

import { useReducer } from 'react';

import Button from './components/Button';
import Record from './components/Record';
import ThemeSwitch from './components/ThemeSwitch';

import { formatOperator } from "./utils/formatOperator.js"
import buttons from './data/buttons.js'
import { reducer } from './reducers/'
import useTheme from "./hooks/useTheme.js"

function App() {
  const [theme, toggleTheme] = useTheme("#ffffff", "#22252d");
  const [state, dispatch] = useReducer(reducer, {
    expression: "0",
    result: "0",
  });

  const numpadButtons = buttons.map(({ position, symbol, type }, index) => {
    const formattedSymbol = formatOperator(symbol) ?? symbol;
    return <Button className={position || ""} key={index} onClick={() => dispatch({ type, symbol })}>
      {formattedSymbol}
    </Button>
  });

  return (
    <div className="App">
      <div className="App-screen">
        <div className="App-switch">
          <ThemeSwitch value={theme} onChange={() => toggleTheme()}/>
        </div>
        <div className="App-display">
          {
            state.result !== "0" && <Record expression={state.expression}></Record>
          }
          <Record big={true} expression={state.result}></Record>
        </div>
        <div className="App-numpad">
          <div className="Numpad-container">
            {numpadButtons}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
