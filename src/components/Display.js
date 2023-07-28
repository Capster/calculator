import "../assets/index.css";

import Record from "./Record";

export default function Display({ expression, result }) {
  return (
    <div className="Display">
      <Record expression={expression}></Record>
      <Record big={true} expression={result}></Record>
    </div>
  );
}
