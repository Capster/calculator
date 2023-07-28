import "../assets/index.css";

import Button from "../components/Button";

import { formatOperator } from "../utils/formatOperator.js"
import buttons from "../data/buttons.js"

export default function Numpad({ handleClick }) {
  const numpadButtons = buttons.map(({ position, symbol, type }, index) => {
    const formattedSymbol = formatOperator(symbol) ?? symbol;
    return (
        <Button variant={position || ""} key={index} onClick={() => handleClick({ type, symbol })}>
          {formattedSymbol}
        </Button>
      )
    });

  return (
    <div className="Numpad">
      <div className="Numpad__container">
        {numpadButtons}
      </div>
    </div>
  );
}
