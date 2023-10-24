import Themes from '@/features/theme/Themes';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Box, Separator } from '@radix-ui/themes';
import { MatchAskPopup } from '@/features/popup/MatchAskPopup';

export function LayoutTheme({ children }) {
  return (
    <Themes>
      <Box pb="8">
        <Header />
      </Box>
      <Box p="8" m="4">
        {children}
        <MatchAskPopup />
      </Box>
      <Footer />
    </Themes>
  );
}
