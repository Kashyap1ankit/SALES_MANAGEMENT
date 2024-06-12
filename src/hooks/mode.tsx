import { useEffect, useState } from "react";

type Theme = "light" | "dark";

interface rType {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

export default function useChangeTheme(): rType {
  const storedTheme = localStorage.getItem("ui-theme") as Theme | null;
  const localTheme: Theme =
    storedTheme === "light" || storedTheme === "dark" ? storedTheme : "light";
  const [theme, setTheme] = useState<Theme>(localTheme);
  const oppTheme = theme === "light" ? "dark" : "light";
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(oppTheme);
    root.classList.add(theme);
    localStorage.setItem("ui-theme", theme);
  }, [theme, oppTheme]);

  return { theme, setTheme };
}
