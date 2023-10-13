import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";

export default function Themes({ children }) {
  return (
    <ThemeProvider attribute="class">
      <Theme radius="full" accentColor="indigo">

        {children}
      </Theme>
    </ThemeProvider>
  );
}
