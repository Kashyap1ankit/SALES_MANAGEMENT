import useChangeTheme from "../hooks/mode";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
type Theme = "light" | "dark";

export default function ModeButton() {
  const {
    theme,
    setTheme,
  }: { theme: Theme; setTheme: React.Dispatch<React.SetStateAction<Theme>> } =
    useChangeTheme();

  function handleModeToggle(): void {
    setTheme((prev: string) => (prev === "light" ? "dark" : "light"));
  }
  return (
    <div className="dark:text-white dark:border-white rounded-md px-4 py-2 bg-gray300 dark:bg-black fixed top-4 right-4 z-50">
      <button onClick={handleModeToggle}>
        {theme === "light" ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
}
