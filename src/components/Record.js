import "../assets/index.css";
import { formatNumber } from "../utils/formatNumber.js"
import { formatOperator } from "../utils/formatOperator.js"

import { useEffect, useRef, useState } from "react";

export default function Record({ expression, big }) {
  const [scale, setScale] = useState(1);
  const spanRef = useRef();

  // https://github.com/fellipeutaka/react-calculator/blob/main/src/components/CalculatorHead.tsx
  // Do we really need that hook here?
  useEffect(() => {
    const parentNode = spanRef.current?.parentNode;
    const availableWidth = parentNode?.offsetWidth;
    const actualWidth = spanRef.current?.offsetWidth;
    const actualScale = availableWidth / (actualWidth || 0);
    if (scale !== actualScale) {
      if (actualScale < 1) {
        setScale(actualScale);
      } else if (scale < 1) {
        setScale(1);
      }
    }
  }, [expression]);

  // Skip the format stage for the big one
  // Text should stick a little to the right little
  // + Disable moving animation (leave only the transform one)
  const stringExpression = expression + "";
  const content = stringExpression
    .split(/(\(|\)|\+|-|\*|\/)/g)
    .map((segment, index) => {
      if (segment === "(" || segment === ")") {
        return <span className="Record-bracket" key={index} ref={spanRef}>{segment}</span>
      }
      const prettyOperator = formatOperator(segment);
      if (prettyOperator) {
        return <span className="Record-operator" key={index} ref={spanRef}>{prettyOperator}</span>
      } else {
        const prettyNumber = formatNumber(segment);
        return <span ref={spanRef} key={index} ref={spanRef}>{prettyNumber}</span>;
      }
    });

  const style = { transform: `scale(${scale},${scale})` };

  return (
    <div className={big ? "Record-big" : "Record-small"} style={style}>
      {content}
    </div>
  )
}
