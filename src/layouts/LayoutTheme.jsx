import Themes from '@/features/theme/Themes';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Box, Separator } from '@radix-ui/themes';


export function LayoutTheme({ children }) {
  return (
    <Themes>
      <Box pb="8">
        <Header />
      </Box>
      <Box m="2">{children}</Box>
      <Footer />
    </Themes>
  );
}
