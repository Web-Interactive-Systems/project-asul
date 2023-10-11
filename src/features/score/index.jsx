import { Button, Flex, Separator, Strong, TextField } from "@radix-ui/themes";

export function Score({ J2 = { nom: "J2" } }) {
  const handleClick = (event) => {
    console.log(event);
  };
  return (
    <Flex
      direction="column"
      align="center"
      gap="5"
    >
      <Flex
        direction="column"
        align="center"
        gap="3"
      >
        <TextField.Root radius="large">
          <TextField.Slot>J1</TextField.Slot>
          <TextField.Input
            type="number"
            min="0"
            onKeyDownCapture={(event) => {
              (event.charCode != 8 && event.charCode == 0) ||
                (event.charCode >= 48 && event.charCode <= 57);
            }}
            placeholder="Score de J1"
          />
        </TextField.Root>
        <Flex
          gap="2"
          align="center"
        >
          <Separator size="2" />
          <Strong>Vs</Strong>
          <Separator size="2" />
        </Flex>
        <TextField.Root radius="large">
          <TextField.Slot>{J2.nom}</TextField.Slot>
          <TextField.Input
            type="number"
            placeholder={`Score de ${J2.nom}`}
          />
        </TextField.Root>
      </Flex>
      <Button
        radius="large"
        color="grass"
        onClick={handleClick}
      >
        Valider le score
      </Button>
    </Flex>
  );
}
