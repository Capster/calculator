import { useEffect } from "react";
import { useLocalStorage } from "./useStorage";

export default function useTheme(lightColor, darkColor) {
  const [theme, setTheme] = useLocalStorage("useTheme", "dark");
  const isDark = theme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  useEffect(() => {
    document.body?.classList.toggle("dark-mode", isDark);
    const color = isDark ? darkColor : lightColor;
    document.querySelector("meta[name=theme-color]")?.setAttribute("content", color);
  }, [isDark, lightColor, darkColor]);

  return [theme, toggleTheme]
}
