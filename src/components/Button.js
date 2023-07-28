import "../assets/index.css";

export default function Button({ variant, ...props }) {
  return (
    <button className={`Button ${variant}`} {...props} />
  );
}
