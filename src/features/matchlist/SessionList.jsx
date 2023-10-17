import { Grid, Card, Flex, Text, Strong, Heading } from "@radix-ui/themes"
import { useState, useEffect } from "react"
import { format } from "date-fns";
import { postgres } from "@/lib/supabase";

export function SessionList({onClose}) {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const sessionInsertHandler = (data) => {
      setSessions(sessions => [data.new, ...sessions])
    }

    postgres.session.on('INSERT', sessionInsertHandler)

    const fetchData = async () => {
        const data = await Promise.resolve([
          {id: 1, created_at: new Date()},
          {id: 2, created_at: new Date()},
          {id: 3, created_at: new Date()}
        ]);
        setSessions(data);
    };

    fetchData();

    return () => {
      postgres.session.off('INSERT', sessionInsertHandler)
    }
  }, []);

  return <>
    <Heading style={{fontSize: '1rem', marginBottom: 'var(--space-3)'}}>Choisir une session</Heading>
    <Grid columns={{initial: '1', xs: '2', sm: '3', md: '4', lg: '5'}} gap="3">
      {sessions.map((session, i) => {
        return <Card key={i} style={{cursor: 'pointer'}} onClick={() => {
          onClose(session)
        }}>
          <Flex height="9" justify={"center"} align={"center"}>
              <Text>Session du <Strong>{format(new Date(session.created_at), 'dd/LL/Y')}</Strong></Text>
          </Flex>
        </Card>
      })}
    </Grid>
  </>
}