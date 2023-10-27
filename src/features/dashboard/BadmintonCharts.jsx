import Plot from '@/features/dashboard/Plot';
import { Table, TextArea, Box, TextFieldInput } from '@radix-ui/themes';

export function BadmintonMatchesPlot({ matches }) {
  const data = matches.flatMap((match, index) => [
    {
      match: index + 1,
      score: match.loser_score,
      type: 'Loser',
      fill: 'red',
    },

    {
      match: index + 1,
      score: match.winner_score,
      type: 'Winner',
      fill: 'green',
    },
  ]);

  const plotOptions = {
    x: {
      axis: null,
    },
    y: {
      label: 'Score',
    },
    color: {
      legend: true,
    },
    marginLeft: 50,
    height: 400,
  };

  return (
    <Plot.root plotOptions={plotOptions} data={data}>
      <Plot.barY
        options={{
          fx: 'match',
          y: 'score',
          x: 'type',
          fill: 'fill',
          title: 'type',
        }}
      />
    </Plot.root>
  );
}

export function BadmintonMatchesHistory({ matches }) {
  return (
    <Table.Root>
      <Table.Header>
        <Table.ColumnHeaderCell>Adeversaire</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>Résumé du match</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>Nombre de places gagnées</Table.ColumnHeaderCell>
      </Table.Header>

      <Table.Body>
        {matches.map((e) => (
          <Table.Row>
            <Table.RowHeaderCell>{e.loser_name}</Table.RowHeaderCell>
            <Table.RowHeaderCell>
              {e.winner_score} - {e.loser_score}
            </Table.RowHeaderCell>
            <Table.RowHeaderCell>Test</Table.RowHeaderCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomName() {
  const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Helen'];
  return names[getRandomInt(0, names.length - 1)];
}

export function generateRandomMatch() {
  const winnerScore = getRandomInt(11, 21);
  const loserScore = getRandomInt(0, winnerScore - 1);
  const winnerName = generateRandomName();
  let loserName = generateRandomName();

  while (loserName === winnerName) {
    loserName = generateRandomName();
  }

  return {
    winner_score: winnerScore,
    loser_score: loserScore,
    winner_name: winnerName,
    loser_name: loserName,
  };
}

// Représentation d'un match
// {
//   winner_score : Number,
//   loser_score : Number,
//   winner_name : String,
//   loser_name : String,
// }

// faire fonction pour récupérer les données depuis la BDD

// 1 - me reco à la BDD

// 2 - mettre ma fonction

// 3 - voir si plot arrive à exploiter

/**
 * 
 * //import { getScores } from '@/actions/getScores';

export function BadmintonMatchesPlot() {
    const[matches, setScores] = useState([]);

    useEffect(async () => {
        const response = await getScores();
        setScores(response.data);
    }, [])
        

    return (



  Ok.. 
  si je souhaite trouver le nom de l'adeversaire :

  




 */
