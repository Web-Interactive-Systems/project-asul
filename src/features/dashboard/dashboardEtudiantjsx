import { Grid } from '@radix-ui/themes';
import Plot from '@/features/dashboard/Plot';

export function Dashboard() {

  const [timeline, setTimeline] = useState(null);


  useEffect(() => {
    fetch("localhost:3000/api/data/timeline/user/6").then((data) =>{
      return data.json();
    }).then((data) => {setTimeline(data)});
    }, []);

  return (
    <Grid rows="2" columns="2" gap="2">

      <Plot.root
        data={timeline.Score}
        plotOptions={{
          color: { scheme: 'burd' },
          x: {
            tickFormat: '%d/%m/%Y',
            ticks: 5,
          },
        }}
      >
        <Plot.line
          options={{
            //Mettre à la place des x et y les clés de l'objet json
            x: 'winer_score',
            y: 'loser_score',
          }}
        />
      </Plot.root>

    </Grid>
  );
}
