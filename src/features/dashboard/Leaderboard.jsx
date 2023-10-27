import { Avatar, Box, Flex, Grid, Table } from '@radix-ui/themes';
// import { usePlayers } from '@/hooks/usePlayers';
import { useStore } from '@nanostores/react';
import { $players } from '@/store/store';

export function Leaderboard({ col = 2, style }) {
  const players = useStore($players);
  console.log(players);
  if (!players || players.length === 0) return null;
  const playerArrays = [];
  const middle = Math.ceil(players.length / col);
  for (let i = 0; i < col; i++) {
    playerArrays.push(players.slice(i * middle, (i + 1) * middle));
  }

  console.log(playerArrays);
  let rank = 1;
  return (
    <Grid
      rows={((players.length - 1) / col).toFixed()}
      columns={col.toFixed()}
      gap="3"
      style={style}
    >
      {playerArrays.map((playerArray, i) => (
        <Table.Root key={i}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Score</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Match Gagnés</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Match Perdus</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>A</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>B</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>C</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>D</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {playerArray.map((player, i) => (
              <Table.Row key={player.id}>
                <Table.RowHeaderCell>
                  {rank++}{' '}
                  <Avatar
                    src={player.avatar}
                    alt={player.username.charAt(0)}
                    referrerPolicy="no-referrer"
                    rel="noreferrer"
                    fallback={
                      <img
                        src={player.avatar}
                        alt={player.username}
                        referrerPolicy="no-referrer"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: 'inherit',
                        }}
                      />
                    }
                  />
                  {player.username}
                </Table.RowHeaderCell>
                <Table.Cell>{Math.ceil((i + 1) * Math.random() * 100)}</Table.Cell>
                <Table.Cell>{Math.ceil((i + 1) * Math.random() * 100)}</Table.Cell>
                <Table.Cell>{Math.ceil((i + 1) * Math.random() * 100)}</Table.Cell>
                <Table.Cell>{Math.ceil((i + 1) * Math.random() * 100)}</Table.Cell>
                <Table.Cell>{Math.ceil((i + 1) * Math.random() * 100)}</Table.Cell>
                <Table.Cell>{Math.ceil((i + 1) * Math.random() * 100)}</Table.Cell>
                <Table.Cell>{Math.ceil((i + 1) * Math.random() * 100)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      ))}
    </Grid>
  );
}
