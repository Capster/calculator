import "./assets/index.css";

import { useReducer } from "react";

import Numpad from "./components/Numpad";
import Display from "./components/Display";
import ThemeSwitch from "./components/ThemeSwitch";

import { reducer } from "./reducers/"
import useTheme from "./hooks/useTheme.js"

function App() {
  const [theme, toggleTheme] = useTheme("#ffffff", "#22252d");
  const [state, dispatch] = useReducer(reducer, {
    expression: "0",
    result: "0",
  });

  return (
    <div className="App">
      <div className="App__screen">
        <div className="App__theme-switch">
          <ThemeSwitch value={theme} onChange={() => toggleTheme()}/>
        </div>
        <Display expression={state.expression} result={state.result}/>
        <Numpad handleClick={action => dispatch(action)}/>
      </div>
    </div>
  );
}

export default App;
