import { useState } from 'react';
import { Flex, Heading, Box, Button, Text, Strong, Separator } from '@radix-ui/themes';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import { usePlayerMatch } from '@/hooks/usePlayerMatch';

const StyledComboboxInput = styled(ComboboxInput, {
  width: 280,
  height: 36,
  borderRadius: 9999,
  padding: '0px 12px',
});

const StyledComboboxOption = styled(ComboboxOption, {
  transform: 'translate(-18px, 0)',
  cursor: 'pointer',
  padding: '18px 8px',
  margin: 'auto',
  color: 'var(--gray-9)',
  borderRadius: 12,
  '&:hover': {
    background: 'var(--blue-5)',
  },
});

const StyledComboboxList = styled(ComboboxList, {
  background: 'var(--gray-1)',
  listStyle: 'none',
  overflowY: 'auto',
  maxHeight: 300,
});

import { broadcast, supabase } from '@/lib/supabase.js';

import { $matchContent, $matchSession } from '@/store/store';
import { getAuthUser } from '@/actions';
import { useStore } from '@nanostores/react';
import { $userSession } from '@/store/store';
import { styled } from '@/lib/stitches';

function InuputSelect({ placeholder = 'input select', onSelect }) {
  const [term, setTerm] = useState('');
  const results = usePlayerMatch(term);

  const handleChange = (event) => {
    const term = event.target.value;
    setTerm(term);
    if (!term) {
      onSelect(null);
    }
  };

  return (
    <Combobox aria-labelledby="demo" openOnFocus={true}>
      <StyledComboboxInput placeholder={placeholder} autocomplete onChange={handleChange} />
      <ComboboxPopover
        style={{
          background: 'var(--gray-1)',
          color: 'black',
          pointerEvents: 'all',
          borderRadius: 4,
        }}
      >
        <Box>
          <StyledComboboxList>
            {results.map((data) => (
              <StyledComboboxOption
                onClick={onSelect.bind(null, data.id)}
                key={data.id}
                value={data.username}
              >
                {data.username}
              </StyledComboboxOption>
            ))}
          </StyledComboboxList>
        </Box>
      </ComboboxPopover>
    </Combobox>
  );
}

export function CreateMatch() {
  const [currentUserID, setCurrentUserID] = useState('');
  const matchSession = useStore($matchSession);
  const userSession = useStore($userSession);

  const handleSelect = (id) => {
    console.log('id user', id);
    setCurrentUserID(id);
  };
  const handleAddMatch = async () => {
    const authUser = await getAuthUser();

    const creator_id = authUser.id;
    const player_id = currentUserID;

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

    broadcast.notifications.send('match', player_id);

    $matchContent.set('match');
  };
  return (
    <Flex direction="column" align="center" gap="8">
      <Flex direction="column" align="center" gap="4">
        <Text as="span">
          {' '}
          <Strong>{userSession.player.username} </Strong>{' '}
        </Text>
        <Flex direction="row" align="center">
          <Separator orientation="horizontal" size="3" /> <Text as="span"> Contre </Text>
          <Separator orientation="horizontal" size="3" />
        </Flex>
        <InuputSelect placeholder="Choisir votre adversaire..." onSelect={handleSelect} />
      </Flex>
      <Button
        radius="full"
        variant="solid"
        size="3"
        onClick={handleAddMatch}
        disabled={!!!currentUserID}
      >
        <PaperPlaneIcon />
        Envoyer une demande de Match
      </Button>
    </Flex>
  );
}
