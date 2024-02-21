import { Grid, Box, Card, Flex, Text, Strong, Dialog } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { postgres } from '@/lib/supabase';
// import { getSessions } from '@/actions/getSessions';

import { $matchSession, $sessions } from '@/store/store';
import { useStore } from '@nanostores/react';
import { getSessions } from '@/actions/getSessions';

export function SessionCalendar({ onSelect }) {
  const sessions = useStore($sessions);

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

    return () => {
      postgres.session.off('INSERT', sessionInsertHandler);
    };
  }, []);

  const handleSelectSession = (session) => {
    $matchSession.set(session);

    onSelect();
  };

  return (
    <Box>
      <Grid columns="3" gap="3" width="auto">
        {sessions.map((session, i) => (
          <Card
            key={i}
            style={{ cursor: 'pointer' }}
            onClick={handleSelectSession.bind(null, session)}
          >
            <Flex gap="3" align="center">
              <Box>
                <Text>
                  Session du <Strong>{format(new Date(session.session_date), 'dd/LL/Y')}</Strong>
                </Text>
              </Box>
            </Flex>
          </Card>
        ))}
      </Grid>
    </Box>
  );
}
