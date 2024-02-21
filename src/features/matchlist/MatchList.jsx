import {
  Box,
  Grid,
  Card,
  Flex,
  Text,
  Strong,
  Link,
  Button,
  Heading,
  Badge,
} from '@radix-ui/themes';
import { SewingPinIcon, PlusCircledIcon, ArrowLeftIcon, PlusIcon } from '@radix-ui/react-icons';
import { useEffect } from 'react';
import { fr } from 'date-fns/locale/index.js';
import { useStore } from '@nanostores/react';

import { format, formatDistanceToNow } from 'date-fns';
import { postgres } from '@/lib/supabase';
import { MatchCardDialog } from '../MatchCard/MatchCardDialog';

import { $matchContent, $matchSession, $players, $matches } from '@/store/store';

export function MatchList() {
  const matchSession = useStore($matchSession);
  const matches = useStore($matches);
  const players = useStore($players);
  // const [matches, setMatches] = useState([]);

  console.log('== get ddd matches', matches);
  // useEffect(() => {
  //   // const matchInsertHandler = (data) => {
  //   //   setMatches((matches) => [data.new, ...matches]);
  //   // };

  //   // postgres.match.on('INSERT', matchInsertHandler);

  //   const fetchData = async () => {
  //     const data = await getMatchesBySession(matchSession.id);
  //     setMatches(data);
  //   };

  //   fetchData();

  //   return () => {
  //     // postgres.match.off('INSERT', matchInsertHandler);
  //   };
  // }, [matchSession]);

  // useEffect(() => {
  //   return () => {
  //     // clean up
  //   };
  // }, []);

  return (
    <Box>
      <Heading style={{ fontSize: '1rem', marginBottom: 'var(--space-3)' }}>
        Session du{' '}
        {matchSession?.session_date && format(new Date(matchSession.session_date), 'dd/LL/Y')}
      </Heading>
      <Flex align={'center'} style={{ marginBottom: 'var(--space-3)' }} gap="3">
        <Button
          variant="soft"
          onClick={() => {
            $matchContent.set('session');
          }}
          style={{ cursor: 'pointer' }}
        >
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

        {matches
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((match, i) => {
            const player = players.find((player) => player.id === match.player_id);

            return (
              <MatchCardDialog key={match.id} match={match}>
                <Card>
                  <Flex justify={'center'} align="center" direction="column" height="100%">
                    {/* {match.status} */}
                    {match.status === 'created' && <Badge color="amber">Créé</Badge>}
                    {match.status === 'validated' && <Badge color="lime">Validé</Badge>}
                    {match.status === 'started' && <Badge color="blue">Commencé</Badge>}
                    {match.status === 'declined' && <Badge color="purple">Refusé</Badge>}
                    {match.status === 'canceled' && <Badge color="red">Annulé</Badge>}
                    {match.status === 'finished' && <Badge color="green">Terminé</Badge>}

                    <Flex justify={'center'} align={'center'} gap="2">
                      {match.title}
                    </Flex>

                    <Text size="2" weight="light">
                      Il y a {formatDistanceToNow(new Date(match?.created_at), { locale: fr })}
                    </Text>
                    <Strong>
                      {(() => {
                        if (match.status === 'finished') {
                          return match.winer_id === player?.id
                            ? `${match.winer_score} - ${match.loser_score}`
                            : `${match.loser_score} - ${match.winer_score}`;
                        } else {
                          return '_ - _';
                        }
                      })()}
                    </Strong>
                  </Flex>
                </Card>
              </MatchCardDialog>
            );
          })}
      </Grid>
    </Box>
  );
}
