import { Flex, Box, Button, Separator, Heading, Grid } from '@radix-ui/themes';
import Logo from './Logo.jsx';

export function Footer() {
  return (

    <Box width="100%">
      <Separator style={{ width: '100%' }} />
        <Grid gap="9" align="center" justify="between" columns={{ initial: '1', xs: '3' }} style={{ padding: '10px', marginLeft: '20vw', marginRight: '20vw' }}>
          <Box>
            <Button asChild variant="ghost" style={{ color: 'grey' }}>
              <a href="/">
                <Logo />
              </a>
            </Button>
          </Box>
          <Flex gap="3" direction="column" align="start">
            <Heading size="3">Communauté</Heading>
            <Button asChild variant="ghost" style={{ color: 'grey' }}>
              <a href="#">
                Instagram
              </a>
            </Button>
          </Flex>

          <Flex gap="3" direction="column" align="start">
            <Heading size="3">More</Heading>
            <Button asChild variant="ghost" style={{ color: 'grey' }}>
              <a href="#">
                Blog
              </a>
            </Button>
          </Flex>

        </Grid>
    </Box>
  );
}
