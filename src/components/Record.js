import "../assets/index.css";
import { formatNumber } from "../utils/formatNumber.js"
import { formatOperator } from "../utils/formatOperator.js"

import { useEffect, useRef, useState } from "react";

export default function Record({ expression, big }) {
  const [scale, setScale] = useState(1);
  const spanRef = useRef();

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
  }, [expression, scale]);

  const stringExpression = expression + "";
  const content = stringExpression
    .split(/(\(|\)|\+|-|\*|\/)/g)
    .map((segment, index) => {
      if (segment === "(" || segment === ")") {
        return <span className="Record__segment Record__segment--bracket" key={index}>{segment}</span>
      }
      const prettyOperator = formatOperator(segment);
      if (prettyOperator) {
        return <span className="Record__segment Record__segment--operator" key={index}>{prettyOperator}</span>
      } else {
        const prettyNumber = formatNumber(segment);
        return <span className="Record__segment" key={index}>{prettyNumber}</span>;
      }
    });

  const style = { transform: `scale(${scale},${scale})` };

  return (
    <div className={`Record ${big ? "Record--big" : "Record--small"}`}>
      <p className="Record__container" ref={spanRef}  style={style}>
        {content}
      </p>
    </div>
  )
}
