import { Grid, Box, Card, Flex, Text, Strong, IconButton, Dialog, Button } from '@radix-ui/themes';
import { PlusIcon, Cross1Icon } from '@radix-ui/react-icons';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { postgres } from '@/lib/supabase';
import { SessionCalendar } from './SessionCalender';
import { CreateMatchDialog } from '../match/CreateMatchDialog';

import { $matchContent, $matchSession, $sessions } from '@/store/store';
import { getSessions } from '@/actions/getSessions';
import { useStore } from '@nanostores/react';
import { logger } from '@/lib/logger';

const log = logger('SessionList');

export function SessionList() {
  const [open, setOpen] = useState(false);
  const [openMatch, setOpenMatch] = useState(false);
  const sessions = useStore($sessions);

  log.debug('sessions', sessions);

  useEffect(() => {
    const sessionInsertHandler = (data) => {
      $sessions.set((sessions) => [data.new, ...sessions]);
    };

    postgres.session.on('INSERT', sessionInsertHandler);

    // const fetchData = async () => {
    //   const {data} = await getSessions();

    //   $sessions.set(data);
    // };

    // fetchData();

    postgres.session.on('INSERT', sessionInsertHandler);

    return () => {
      postgres.session.off('INSERT', sessionInsertHandler);
    };
  }, []);

  const handleSelectSession = () => {
    setOpen(false);
    setOpenMatch(true);
  };

  return (
    <Box>
      <Grid columns={{ initial: '1', xs: '2', sm: '3', md: '4', lg: '5' }} gap="3">
        <Card>
          <Flex height="9" justify={'center'} align={'center'}>
            <Dialog.Root open={open}>
              <Dialog.Trigger>
                <Button
                  size="4"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <PlusIcon />
                  Ajouter un match
                </Button>
              </Dialog.Trigger>

              <Dialog.Content>
                <Dialog.Title
                  style={{
                    position: 'relative',
                  }}
                >
                  Choisir une session
                  <IconButton
                    variant="soft"
                    color="gray"
                    onClick={() => setOpen(false)}
                    style={{
                      position: 'absolute',
                      right: 0,
                    }}
                  >
                    <Cross1Icon />
                  </IconButton>
                </Dialog.Title>
                <Dialog.Description size="2" mb="4">
                  Choisir une session pour le match
                </Dialog.Description>

                <Flex direction="column" gap="3">
                  {/* CALENDAR */}
                  <SessionCalendar onSelect={handleSelectSession} />
                </Flex>
              </Dialog.Content>
            </Dialog.Root>

            <CreateMatchDialog open={openMatch} onCancel={() => setOpenMatch(false)} />
          </Flex>
        </Card>

        {sessions
          .sort((a, b) => new Date(b.session_date) - new Date(a.session_date))
          .map((session, i) => {
            return (
              <Card
                key={i}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  $matchSession.set(session);
                }}
              >
                <Flex
                  height="9"
                  justify={'center'}
                  align={'center'}
                  onClick={() => {
                    $matchSession.set(session);
                    $matchContent.set('match');
                  }}
                >
                  <Text>
                    Session du <Strong>{format(new Date(session.session_date), 'dd/LL/Y')}</Strong>
                  </Text>
                </Flex>
              </Card>
            );
          })}
      </Grid>
    </Box>
  );
}
