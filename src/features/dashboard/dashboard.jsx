import { Grid } from '@radix-ui/themes';
import { useEffect } from 'react';
import Plot from '@/features/dashboard/Plot';
import mockData from '@/features/dashboard/data.json';
import { getCumulPointsDashboard } from '../../actions/getCumulPointsDashboard.js';
import { getMatchesStatsBySessionId } from '@actions/getMatchesStatsBySession.js';

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

export function Dashboard() {

  useEffect(() => {
    (async () => {
      const { nb_matchs, average_score, error } = await getMatchesStatsBySessionId(48);
      console.log("average_score", average_score);
      console.log("nb_matchs", nb_matchs);
    }
    )()
  }, []);

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
        data={Data}
      >
        <Plot.auto
          options={{
            x: 'date',
            y: 'score',
            stroke: 'username',
          }}
        />
      </Plot.root>
    </Grid>
  );
}
