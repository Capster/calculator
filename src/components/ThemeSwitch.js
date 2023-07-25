import "../assets/index.css";
import { PiMoonBold as Moon } from "react-icons/pi";
import { PiSunBold as Sun } from "react-icons/pi";

export default function ThemeSwitch({ value, onChange, ...props }) {
  return (
    <button className="ThemeSwitch" onClick={() => onChange()} {...props} >
      <Sun size={18} className={`ThemeSwitch-light ${value === "light" ? "ThemeSwitch-active" : ""}`} />
      <Moon size={18} className={`ThemeSwitch-dark ${value === "dark" ? "ThemeSwitch-active" : ""}`}/>
    </button>
  );
}
