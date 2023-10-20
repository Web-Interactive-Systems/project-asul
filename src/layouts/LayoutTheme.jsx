import Themes from '@/features/theme/Themes';
import { Header } from '@/components/Header';
import { Box, Separator } from '@radix-ui/themes';

export function LayoutTheme({ children }) {
  return (
    <Themes>
      <Box pb="8" >
        <Header />
      </Box>
      <Box m="2" style={{margin: 0}}>{children}</Box>
    </Themes>
  );
}
