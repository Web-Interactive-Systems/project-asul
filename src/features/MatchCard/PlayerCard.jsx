import { debounce } from '@/lib/utils';
import { Card, Flex, Text, TextField } from '@radix-ui/themes';
import { useCallback, useMemo } from 'react';

export function PlayerCard({ name = 'Joueur', onChange }) {
  const handleChange = useCallback((value) => {
    onChange?.(value);
  }, []);

  const debounceChange = useMemo(
    () => debounce((value) => handleChange(value), 500),
    [handleChange]
  );

  return (
    <Card color="red" style={{ width: '100%', maxWidth: 240 }}>
      <Flex direction="column" gap="2" align="center">
        <Text as="div" size="2" weight="bold">
          {name}
        </Text>

        <TextField.Input
          type="number"
          min={0}
          width="100%"
          radius="full"
          variant="soft"
          defaultValue={0}
          placeholder="Score du match..."
          onChange={(e) => {
            debounceChange(e.target.value);
          }}
        />
      </Flex>
    </Card>
  );
}
