import { Button, Flex, Heading, Separator, Strong } from "@radix-ui/themes";
import { useEffect, useState } from "react";

import { PlayerCard } from "./PlayerCard";

export function MatchCard({
  match = { state: "validated" },
  J2 = { name: "J2", points: 120 },
}) {
  const [matchState, setMatchState] = useState(match.state);
  useEffect(() => {
    setMatchState(match.state);
  }, [match.state]);
  return (
    <Flex
      direction="column"
      align="center"
      gap="5"
    >
      <Heading>Match</Heading>
      <PlayerCard
        name="J1"
        points={`${125} points`}
      />
      <Flex
        gap="2"
        align="center"
      >
        <Separator size="2" />
        <Strong>Vs</Strong>
        <Separator size="2" />
      </Flex>
      {matchState !== "created" ? (
        <PlayerCard
          name={J2.name}
          points={`${J2.points} points`}
        />
      ) : (
        <PlayerCard
          name="En attente ..."
          points=""
        />
      )}
      {matchState === "started" ? (
        <Button
          radius="large"
          color="green"
          style={{ width: "60%", maxWidth: 240 }}
          onClick={() => setMatchState("Finished")}
        >
          Terminer
        </Button>
      ) : (
        <Button
          radius="large"
          style={{ width: "60%", maxWidth: 240 }}
          disabled={matchState !== "validated"}
          onClick={() => setMatchState("started")}
        >
          Commencer
        </Button>
      )}
      {matchState !== "started" ? (
        <Button
          variant="ghost"
          color="gray"
          radius="large"
          style={{ width: "60%", maxWidth: 240 }}
          onClick={() => setMatchState("Canceled")}
        >
          Annuler le match
        </Button>
      ) : null}
    </Flex>
  );
}
