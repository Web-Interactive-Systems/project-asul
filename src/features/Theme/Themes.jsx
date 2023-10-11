import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import ThemeToggle from "@/features/Theme/ThemeToggle";

export default function Themes({ children }) {
  return (
    <ThemeProvider attribute="class">
      <Theme radius="full" accentColor="indigo">
        <ThemeToggle />
        {children}
      </Theme>
    </ThemeProvider>
  );
}
