import { useState } from 'react';
import { Flex, Heading, Box, Button, Text, Strong, Separator } from '@radix-ui/themes';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import { usePlayerMatch } from '@/hooks/usePlayerMatch';

import { broadcast, supabase } from '@/lib/supabase.js';

import { $matchContent, $matchSession } from '@/store/store';
import { getAuthUser } from '@/actions';
import { useStore } from '@nanostores/react';
import { $userSession } from '@/store/store';

function InuputSelect({ placeholder = 'input select', onSelect }) {
  const [term, setTerm] = useState('');
  const results = usePlayerMatch(term);

  const handleChange = (event) => setTerm(event.target.value);

  return (
    <Combobox aria-labelledby="demo" openOnFocus={true}>
      <ComboboxInput placeholder={placeholder} autocomplete onChange={handleChange} />
      <ComboboxPopover
        style={{
          background: 'white',
          border: 'solid',
          color: 'black',
          pointerEvents: 'all',
          cursor: 'pointer',
        }}
      >
        <Box>
          <ComboboxList style={{ listStyle: 'none' }}>
            {results.map((data) => (
              <ComboboxOption
                onClick={onSelect.bind(null, data.id)}
                key={data.id}
                value={data.username}
                style={{ padding: '15px 0' }}
              >
                {data.username}
              </ComboboxOption>
            ))}
          </ComboboxList>
        </Box>
      </ComboboxPopover>
    </Combobox>
  );
}

export function CreateMatch() {
  const [CurrentUserID, setCurrentUserID] = useState('');
  const matchSession = useStore($matchSession);
  const userSession = useStore($userSession);
  console.log('user', userSession);
  const handleSelect = (id) => {
    console.log('id user', id);

    setCurrentUserID(id);
  };
  const handleAddMatch = async () => {
    const authUser = await getAuthUser();

    const creator_id = authUser.id;
    const player_id = CurrentUserID;

    let { error } = await supabase
      .from('Match')

      .insert({
        title: 'match test match creator Louen',
        creator_id,
        player_id,
        status: 'en attente',
        session_id: matchSession.id,
      });

    if (error) {
      console.error('ahhh match ', error);
    } else {
      console.log('match créer');
    }

    broadcast.notifications.send('match', '*');

    $matchContent.set('match');
  };
  return (
    <Flex direction="column" align="center" gap="3">
      <Heading>Create Match</Heading>
      <Text as="span">
        {' '}
        <Strong>{userSession.player.username} </Strong>{' '}
      </Text>
      <Flex direction="row" align="center">
        <Separator orientation="horizontal" size="3" />
        <Text as="span"> VS </Text>
        <Separator orientation="horizontal" size="3" />
      </Flex>
      <InuputSelect placeholder="Player 1" onSelect={handleSelect} />
      <Button
        radius="full"
        color="blue"
        variant="solid"
        onClick={handleAddMatch}
        disabled={!!!CurrentUserID}
      >
        Envoyer une demande de Match
      </Button>
    </Flex>
  );
}
