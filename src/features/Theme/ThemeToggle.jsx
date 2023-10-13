import { useEffect, useState } from 'react';
import { Flex, IconButton } from '@radix-ui/themes';
import { useCurrentTheme } from '@/hooks/useCurrentTheme';
import Moon from './Moon';
import Sun from './Sun';

export default function ThemeToggle() {
  const { currentTheme, setTheme } = useCurrentTheme();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => setLoaded(true), []);

  function toggleTheme() {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  }

  return (
    <Flex align="center">
      {loaded && (
        <IconButton onClick={toggleTheme} variant="ghost">
          {currentTheme === 'dark' ? <Moon /> : <Sun />}
        </IconButton>
      )}
    </Flex>
  );
}
