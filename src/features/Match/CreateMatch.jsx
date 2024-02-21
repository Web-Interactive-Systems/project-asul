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
import { broadcast, supabase } from '@/lib/supabase.js';

import { $matchContent, $matchSession } from '@/store/store';
import { getAuthUser } from '@/actions';
import { useStore } from '@nanostores/react';
import { $userSession } from '@/store/store';
import { styled } from '@/lib/stitches';

import { usePlayerMatch } from '@/hooks/usePlayerMatch';
import { logger } from '@/lib/logger';

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

const log = logger('CreateMatch');

export function CreateMatch() {
  const [playerInfo, setPlayerInfo] = useState('');
  const matchSession = useStore($matchSession);
  const userSession = useStore($userSession);

  const handleSelect = (id, username) => {
    log.debug('id user', id, username);
    setPlayerInfo({ id, username });
  };
  const handleAddMatch = async () => {
    const authUser = await getAuthUser();

    let { data, error } = await supabase
      .from('Match')
      .insert({
        title: `🏸 vs. ${playerInfo.username}`,
        creator_id: authUser.id,
        player_id: playerInfo.id,
        status: 'created',
        session_id: matchSession.id,
      })
      .select();

    if (error) {
      log.error('ahhh match ', error);
    } else {
      log.debug('match créer');
    }

    broadcast.notifications.on(
      'match-res',
      (e) => {
        log.debug('match response', e.payload.data.accepted);
      },
      true
    );

    broadcast.notifications.send('match', playerInfo.id, {
      sessionId: matchSession.id,
      matchId: data[0].id,
    });

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
        disabled={!!!playerInfo?.id}
      >
        <PaperPlaneIcon />
        Envoyer une demande de Match
      </Button>
    </Flex>
  );
}

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
                onClick={onSelect.bind(null, data.id, data.username)}
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
