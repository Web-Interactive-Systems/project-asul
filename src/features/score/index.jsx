import {
  Button,
  Flex,
  Heading,
  Separator,
  Strong,
  TextField,
  Callout,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";

export function Score({ J2 = { nom: "J2" } }) {
  const [scoreJ1, setScoreJ1] = useState(0);
  const [scoreJ2, setScoreJ2] = useState(0);
  const [isScoresValid, setIsScoresValid] = useState(true);
  useEffect(() => {
    if (scoreJ1 < 0 || scoreJ2 < 0 || scoreJ1 === "" || scoreJ2 === "") {
      setIsScoresValid(false);
    } else setIsScoresValid(true);
  }, [scoreJ1, scoreJ2]);
  const handleClick = (event) => {
    console.log(`score 1 : ${scoreJ1}`);
    console.log(`score 2 : ${scoreJ2}`);
  };
  return (
    <>
      <Flex
        direction="column"
        align="center"
        gap="5"
      >
        <Heading>Score</Heading>
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
              name="scoreJ1"
              value={scoreJ1}
              onChange={(e) => setScoreJ1(e.target.value)}
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
              name="scoreJ2"
              value={scoreJ2}
              onChange={(e) => setScoreJ2(e.target.value)}
              placeholder={`Score de ${J2.nom}`}
            />
          </TextField.Root>
        </Flex>
        <Button
          radius="large"
          color="grass"
          onClick={(e) => handleClick(e)}
          disabled={!isScoresValid}
        >
          Valider le score
        </Button>
      </Flex>
      <Callout.Root
        size="1"
        color="red"
        style={{ position: "absolute", bottom: "0" }}
      >
        <Callout.Icon></Callout.Icon>
        <Callout.Text size="1">Les scores ne sont pas valides.</Callout.Text>
      </Callout.Root>
    </>
  );
}
