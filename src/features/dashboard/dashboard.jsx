import { Grid } from '@radix-ui/themes';
import Plot from '@/features/dashboard/Plot';
import mockData from '@/features/dashboard/data.json';
import { getCumulPointsDashboard } from '../../actions/getCumulPointsDashboard.js';
import { getCurrentScore } from '../../actions/getCurrentScore.js';

const Data = mockData.map((d) => {
  return {
    ...d,
    date: new Date(d.date),
  };
});

const dt = await getCumulPointsDashboard();
dt.forEach((item) => {
  item.match_date = new Date(item.match_date);
});

const Data_CS = await getCurrentScore();

export function Dashboard() {
  return (
    <Grid rows="2" columns="2" gap="2">
      <Plot.root
        data={dt}
        plotOptions={{
          grid: true,
          x: {
            tickFormat: '%d/%m/%Y',
            label: 'Date',
          },
          y: {
            label: 'Score',
          },
        }}
      >
        <Plot.dot
          options={{
            x: 'match_date',
            y: 'score',
            stroke: 'Joueur',
            r: 3,
            channels: { Adversaire: 'adversaire', Status: 'result', Résultat: 'match' },
            tip: {
              format: {
                x: (d) => d.toLocaleDateString('fr'),
              },
            },
          }}
        />
        <Plot.ruleY options={[100]} />
        <Plot.lineY
          className="line-of-chart"
          options={{
            x: 'match_date',
            y: 'score',
            stroke: 'Joueur',
          }}
        />
      </Plot.root>
      <Plot.root
        data={Data}
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
            x: 'date',
            y: 'score',
            stroke: 'username',
          }}
        />
      </Plot.root>
      <Plot.root
        plotOptions={{
          color: { scheme: 'burd' },
          x: {
            type: 'band',
            tickFormat: '%d/%m/%Y',
            ticks: 5,
          },
        }}
        data={Data}
      >
        <Plot.barY
          options={{
            x: 'date',
            y: 'score',
            stroke: 'username',
          }}
        />
      </Plot.root>
      <Plot.root
        plotOptions={{
          color: { scheme: 'burd' },
        }}
        data={Data_CS}
      >
        <Plot.auto
          options={{
            x: 'nb_match',
            y: 'score',
            stroke: 'Joueur',
            r: 2,
            channels: { Joueur: 'Joueur', last_match: 'last_match' },
          }}
        />
      </Plot.root>
    </Grid>
  );
}
