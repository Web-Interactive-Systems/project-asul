import { Box, Button, IconButton, Switch } from "@radix-ui/themes";
import Moon from "./moon";
import Sun from "./sun";
import { useCurrentTheme } from "@/lib/hooks";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { currentTheme, setTheme } = useCurrentTheme();

  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);

  function toggleTheme() {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  }

  return (
    <Box>
      {loaded && (
        <IconButton onClick={toggleTheme} variant="ghost">
          {currentTheme === "dark" ? <Moon /> : <Sun />}
        </IconButton>
      )}
    </Box>
  );
}
