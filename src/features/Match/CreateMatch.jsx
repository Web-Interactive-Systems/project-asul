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

import { $matchContent } from '@/store/store';
import { addMatch } from '@/actions/addMatch';

function InuputSelect({ placeholder = 'input select', onSelect }) {
  const [term, setTerm] = useState('');

  const results = usePlayerMatch(term);

  const handleChange = (event) => setTerm(event.target.value);

  return (
    <Combobox aria-labelledby="demo" onSelect={onSelect} openOnFocus={true}>
      <ComboboxInput placeholder={placeholder} autocomplete onChange={handleChange} />
      <ComboboxPopover>
        <Box>
          <ComboboxList>
            {results.map((data) => (
              <ComboboxOption key={data.name} value={data.name} />
            ))}
          </ComboboxList>
        </Box>
      </ComboboxPopover>
    </Combobox>
  );
}

export function CreateMatch() {
  const [DisableButton, setDisableButton] = useState(true);

  const handleSelect = (selection) => {
    if (selection == '') {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
    console.log(selection);
  };

  const handleAddMatch = async () => {
    // set 'match', use in Account component
    $matchContent.set('match');

    const { data, error } = await addMatch({
      // payload
    });

    if (error) {
      //
    } else {
      // Send a realtime notification
      // Todo
    }
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
      {/* disabled={DisableButton} */}
      <Button onClick={handleAddMatch}>Envoyer une demande de Match</Button>
    </Flex>
  );
}
