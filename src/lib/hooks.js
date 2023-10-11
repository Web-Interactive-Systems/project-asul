import { useTheme } from "next-themes";

export function useCurrentTheme() {
  const { theme, setTheme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  return { currentTheme, setTheme };
}
