import {
  Button,
  Flex,
  Heading,
  Separator,
  Strong,
  TextField,
  Text,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";

export function MatchScore({ J2 = { name: "J2" } }) {
  const [scoreJ1, setScoreJ1] = useState(0);
  const [scoreJ2, setScoreJ2] = useState(0);
  const [isScoresValid, setIsScoresValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState(" ");

  useEffect(() => {
    if (scoreJ1 < 0 || scoreJ2 < 0 || scoreJ1 === "" || scoreJ2 === "") {
      scoreJ1 < 0 || scoreJ2 < 0
        ? setErrorMessage("Un score doit être positif.")
        : scoreJ1 === "" || scoreJ2 === ""
        ? setErrorMessage("Un score ne peut pas être vide.")
        : null;
      setIsScoresValid(false);
    } else {
      setIsScoresValid(true);
      setErrorMessage(" ");
    }
  }, [scoreJ1, scoreJ2]);

  const handleClick = (event) => {
    scoreJ1 == 0 && scoreJ2 == 0
      ? setErrorMessage("Les deux scores ne peuvent pas être nuls.")
      : null;
    console.log(`score J1 : ${scoreJ1}`);
    console.log(`score J2 : ${scoreJ2}`);
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
          style={{ maxWidth: "200px" }}
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
            style={{ maxWidth: "200px" }}
          >
            <Separator size="2" />
            <Strong>Vs</Strong>
            <Separator size="2" />
          </Flex>
          <TextField.Root radius="large">
            <TextField.Slot>{J2.name}</TextField.Slot>
            <TextField.Input
              type="number"
              name="scoreJ2"
              value={scoreJ2}
              onChange={(e) => setScoreJ2(e.target.value)}
              placeholder={`Score de ${J2.name}`}
            />
          </TextField.Root>
        </Flex>
        <Flex
          direction="column"
          align="center"
          gap="2"
          width="100%"
        >
          <Button
            style={{ maxWidth: "200px", width: "100%" }}
            radius="large"
            color="grass"
            onClick={(e) => handleClick(e)}
            disabled={!isScoresValid}
          >
            Valider le score
          </Button>
          <Text
            color="red"
            size="1"
            align="center"
            style={{ maxWidth: "75%" }}
          >
            {errorMessage}
          </Text>
        </Flex>
      </Flex>
    </>
  );
}
