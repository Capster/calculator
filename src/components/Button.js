import "../assets/index.css";

export default function Button({ variant, ...props }) {
  const variantClass = variant ? `Button--${variant}` : "";
  return (
    <button className={`Button ${variantClass}`} {...props} />
  );
}
