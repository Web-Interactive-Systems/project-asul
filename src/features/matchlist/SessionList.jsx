import { Grid, Box, Card, Flex, Text, Strong, IconButton, Dialog, Button } from '@radix-ui/themes';
import { PlusIcon, Cross1Icon } from '@radix-ui/react-icons';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { postgres } from '@/lib/supabase';
import { SessionCalendar } from './SessionCalender';
import { CreateMatchDialog } from '../match/CreateMatchDialog';

export function SessionList({ onClose }) {
  const [open, setOpen] = useState(false);
  const [openMatch, setOpenMatch] = useState(false);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const sessionInsertHandler = (data) => {
      setSessions((sessions) => [data.new, ...sessions]);
    };

    postgres.session.on('INSERT', sessionInsertHandler);

    const fetchData = async () => {
      const data = await Promise.resolve([
        { id: 1, created_at: new Date() },
        { id: 2, created_at: new Date() },
        { id: 3, created_at: new Date() },
      ]);
      setSessions(data);
    };

    fetchData();

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
                <Button size="4" onClick={() => setOpen(true)}>
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
                  Make changes to your profile.
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
        {sessions.map((session, i) => (
          <Card
            key={i}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              onClose(session);
            }}
          >
            <Flex height="9" justify={'center'} align={'center'}>
              <Text>
                Session du <Strong>{format(new Date(session.created_at), 'dd/LL/Y')}</Strong>
              </Text>
            </Flex>
          </Card>
        ))}
      </Grid>
    </Box>
  );
}
