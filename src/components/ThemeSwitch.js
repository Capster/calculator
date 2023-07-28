import "../assets/index.css";
import { PiMoonBold as Moon } from "react-icons/pi";
import { PiSunBold as Sun } from "react-icons/pi";

export default function ThemeSwitch({ value, onChange, ...props }) {
  return (
    <button className="ThemeSwitch" onClick={() => onChange()} {...props} >
      <Sun
        size={18}
        className={
          `ThemeSwitch__icon
           ThemeSwitch__icon--light
          ${value === "light" ? "ThemeSwitch__icon--active" : ""}`
        }
      />
      <Moon
        size={18}
        className={
          `ThemeSwitch__icon
           ThemeSwitch__icon--dark
           ${value === "dark" ? "ThemeSwitch__icon--active" : ""}`
        }
      />
    </button>
  );
}
