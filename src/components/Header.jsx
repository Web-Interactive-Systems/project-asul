import { Flex, Box, Button, DropdownMenu, IconButton, Separator } from '@radix-ui/themes';
import { HamburgerMenuIcon, ArrowRightIcon, RocketIcon } from '@radix-ui/react-icons';
import ThemeToggle from '@/features/Theme/ThemeToggle.jsx';
import Logo from './Logo.jsx';

import styles from './Header.module.css';
import NeedAuth from './NeedAuth.jsx';
import { useStore } from '@nanostores/react';
import { $userSession } from '@/store/store.js';

export function Header() {
  const session = useStore($userSession);

  return (
    <Box style={{ zIndex: 9999 }} width="100%" position="fixed">
      <Flex direction="row" width="100%" align="center" className={styles.HeaderList}>
        <Button asChild variant="ghost">
          <a href="/">
            <Logo />
          </a>
        </Button>

        <Flex direction="row" gap="3" align="center" display={{ initial: 'none', md: 'flex' }}>
          <NeedAuth
            fallback={
              <Button asChild>
                <a href="/auth">
                  Se connecter
                  <ArrowRightIcon style={{ opacity: 1, marginRight: -3 }} />
                </a>
              </Button>
            }
          >
            <Button asChild variant="soft">
              <a href="/account">
                Mon Espace
                <RocketIcon style={{ opacity: 1, marginRight: -3 }} />
              </a>
            </Button>
            <Button asChild variant="soft">
              <a href="/dashboard">
                Dashboard
                <RocketIcon style={{ opacity: 1, marginRight: -3 }} />
              </a>
            </Button>
            <Button asChild variant="soft">
              <a href="/admin">
                <ArrowRightIcon style={{ opacity: 1, marginRight: -3 }} />
                Admin
              </a>
            </Button>
          </NeedAuth>
          <ThemeToggle />
        </Flex>

        <Flex align="center" gap="5" display={{ md: 'none' }}>
          <ThemeToggle />
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <IconButton size="3" variant="ghost" color="gray">
                <HamburgerMenuIcon width="16" height="16" />
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              {session && (
                <DropdownMenu.Item>
                  <a href="/auth" className={styles.HeaderLink}>
                    <ArrowRightIcon style={{ marginRight: 4 }} />
                    Se déconnecter
                  </a>
                </DropdownMenu.Item>
              )}
              <NeedAuth
                fallback={
                  <DropdownMenu.Item>
                    <a href="/auth" className={styles.HeaderLink}>
                      <RocketIcon style={{ marginRight: 4 }} />
                      Se connecter
                    </a>
                  </DropdownMenu.Item>
                }
              >
                <DropdownMenu.Item>
                  <a href="/account" className={styles.HeaderLink}>
                    <ArrowRightIcon style={{ marginRight: 4 }} />
                    Mon Espace
                  </a>
                </DropdownMenu.Item>

                <DropdownMenu.Item>
                  <a href="/admin" className={styles.HeaderLink}>
                    <ArrowRightIcon style={{ marginRight: 4 }} />
                    Admin
                  </a>
                </DropdownMenu.Item>

                <DropdownMenu.Item>
                  <a href="/dashboard" className={styles.HeaderLink}>
                    <ArrowRightIcon style={{ marginRight: 4 }} />
                    Dashboard
                  </a>
                </DropdownMenu.Item>

                <DropdownMenu.Item>
                  <a href="/barem" className={styles.HeaderLink}>
                    <ArrowRightIcon style={{ marginRight: 4 }} />
                    Barem
                  </a>
                </DropdownMenu.Item>
              </NeedAuth>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
      </Flex>

      <Separator style={{ width: '100%' }} />
    </Box>
  );
}
