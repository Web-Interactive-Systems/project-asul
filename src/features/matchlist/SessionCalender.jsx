import { Grid, Box, Card, Flex, Text, Strong, Dialog } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { postgres } from '@/lib/supabase';
import { CreateMatchDialog } from '../match/CreateMatchDialog';

export function SessionCalendar({ open, onSelect }) {
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
        { id: 4, created_at: new Date() },
        { id: 5, created_at: new Date() },
        { id: 6, created_at: new Date() },
        { id: 7, created_at: new Date() },
        { id: 8, created_at: new Date() },
      ]);
      setSessions(data);
    };

    fetchData();

    return () => {
      postgres.session.off('INSERT', sessionInsertHandler);
    };
  }, []);

  const handleSelectSession = (session) => {
    ///
    onSelect();
    // setTimeout(() => {
    //   setOpen(true);
    // }, 1000);
  };

  return (
    <Box>
      <Grid columns={{ initial: '1', xs: '2', sm: '3', md: '4', lg: '5' }} gap="3">
        {sessions.map((session, i) => (
          <Card
            key={i}
            style={{ cursor: 'pointer' }}
            onClick={handleSelectSession.bind(null, session)}
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
