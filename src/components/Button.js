import "../assets/index.css";

export default function Button({ className, ...props }) {
  return (
    <button className={`Button ${className}`} {...props} />
  );
}
