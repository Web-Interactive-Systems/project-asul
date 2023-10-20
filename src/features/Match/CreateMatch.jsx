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

import { supabase } from '@/lib/supabase.js';

import { $matchContent } from '@/store/store';
import { addMatch } from '@/actions/addMatch';

function InuputSelect({ placeholder = 'input select', onSelect }) {
  const [term, setTerm] = useState('');

  const results = usePlayerMatch(term);

  const handleChange = (event) => setTerm(event.target.value);

  return (
    <Combobox aria-labelledby="demo" onSelect={onSelect} openOnFocus={true}>
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
              
              <ComboboxOption key={data.id} value={data.username} data-id={data.id} class={data.username}>{data.username}</ComboboxOption>
            ))}
          </ComboboxList>
        </Box>
      </ComboboxPopover>
    </Combobox>
  );
}

export function CreateMatch() {
  const [DisableButton, setDisableButton] = useState(true);
  const [CurrentUserID, setCurrentUserID] = useState("");

  const handleSelect = (selection) => {
    if (selection == '') {
      setDisableButton(true);
    } else {
      setCurrentUserID(document.querySelector("."+selection).dataset.id)
      console.log("id",CurrentUserID)
       setDisableButton(false);
    }
    
  };
  const handleAddMatch = () => {
    (async () => {
      const creator_id = 2;

      const player_id = CurrentUserID;

      let { error } = await supabase
        .from('Match')

        .insert({
          title: 'match test match creator Louen',
          creator_id,
          player_id,
          status: 'en attente',
        });

      if (error) {
        console.error('ahhh match ', error);
      } else {
        console.log('match créer');
      }
      
    })();
  };
  return (
    <Flex direction="column" align="center" gap="3">
      <Heading>Create Match</Heading>
      <Text as="span">
        {' '}
        <Strong>Moi </Strong>{' '}
      </Text>
      <Flex direction="row" align="center">
        <Separator orientation="horizontal" size="3" />
        <Text as="span"> VS </Text>
        <Separator orientation="horizontal" size="3" />
      </Flex>
      <InuputSelect placeholder="Player 1" onSelect={handleSelect} />
      <Button
        radius="large"
        color="blue"
        variant="solid"
        onClick={handleAddMatch}
        disabled={DisableButton}
      >
        Envoyer une demande de Match
      </Button>
    </Flex>
  );
}
