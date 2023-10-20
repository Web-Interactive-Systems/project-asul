import { Card, Flex, Avatar, Box, Text } from "@radix-ui/themes";

export function PlayerCard({ name = "Joueur", points = "unknown" }) {
  return (
    <Card
      color="red"
      style={{ width: "60%", maxWidth: 240 }}
    >
      <Flex
        gap="3"
        width="100%"
        align="center"
      >
        <Box>
          <Text
            as="div"
            size="2"
            weight="bold"
          >
            {name}
          </Text>
          <Text
            as="div"
            size="2"
            color="gray"
          >
            {points}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
}
