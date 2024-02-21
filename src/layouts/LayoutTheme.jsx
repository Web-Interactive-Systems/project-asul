import Themes from '@/features/theme/Themes';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Box, Separator } from '@radix-ui/themes';
import { MatchAskPopup } from '@/features/popup/MatchAskPopup';
import Feedback from '@/components/Feedback';

export function LayoutTheme({ children }) {
  return (
    <Themes>
      <Box pb="8">
        <Header />
      </Box>
      <Box m="4">
        <Feedback client:only="react" />
        {children}
        <MatchAskPopup />
      </Box>
      <Footer />
    </Themes>
  );
}
