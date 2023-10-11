import { Box, Button, IconButton, Switch } from "@radix-ui/themes";
import { useTheme } from "next-themes";
import Moon from "./moon";
import Sun from "./sun";
import { useCurrentTheme } from "@/lib/hooks";

export default function ThemeToggle() {
  const { currentTheme, setTheme } = useCurrentTheme();

  function toggleTheme() {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  }

  return (
    <Box>
      <IconButton onClick={toggleTheme} variant="ghost">
        {currentTheme === "dark" ? <Moon /> : <Sun />}
      </IconButton>
    </Box>
  );
}
