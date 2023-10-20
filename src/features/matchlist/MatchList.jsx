import { getMatches } from '@/actions';
import { Box, Grid, Card, Flex, Text, Strong, Link, Button, Heading } from '@radix-ui/themes';
import { SewingPinIcon, PlusCircledIcon, ArrowLeftIcon, PlusIcon } from '@radix-ui/react-icons';
import { useState, useEffect } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { postgres } from '@/lib/supabase';

export function MatchList({ onClose, session }) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const matchInsertHandler = (data) => {
      setMatches((matches) => [data.new, ...matches]);
    };

    postgres.match.on('INSERT', matchInsertHandler);

    const fetchData = async () => {
      const data = await getMatches();
      setMatches(data);
    };

    fetchData();

    return () => {
      postgres.match.off('INSERT', matchInsertHandler);
    };
  }, []);

  return (
    <Box>
      <Heading style={{ fontSize: '1rem', marginBottom: 'var(--space-3)' }}>
        Session du {format(new Date(session.created_at), 'dd/LL/Y')}
      </Heading>
      <Flex align={'center'} style={{ marginBottom: 'var(--space-3)' }} gap="3">
        <Button variant="soft" onClick={onClose} style={{ cursor: 'pointer' }}>
          <Flex justify={'center'} align={'center'} gap="2">
            <ArrowLeftIcon />
            <Text>Précédent</Text>
          </Flex>
        </Button>
      </Flex>
      <Grid columns={{ initial: '1', xs: '2', sm: '3', md: '4', lg: '5' }} gap="3">
        <Card>
          <Flex height="9" justify={'center'} align={'center'}>
            <Button size="4" onClick={null}>
              <PlusIcon />
              Ajouter un match
            </Button>
          </Flex>
        </Card>

        {matches.map((match, i) => {
          return (
            <Link
              key={i}
              href={`/match/${match}`}
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              <Card>
                <Flex justify={'center'} align="center" direction="column" height="100%">
                  <Text>Il y a</Text>
                  <Flex justify={'center'} align={'center'} gap="2">
                    <SewingPinIcon />
                    <Text>
                      Matche contre <Strong>{'Adversaire'}</Strong>
                    </Text>
                  </Flex>
                  <Strong>
                    {'2'} - {'0'}
                  </Strong>
                </Flex>
              </Card>
            </Link>
          );
        })}
      </Grid>
    </Box>
  );
}
