import { Grid } from '@radix-ui/themes';
import Plot from '@/features/dashboard/Plot';
import { getCumulPointsDashboard } from '../../actions/getCumulPointsDashboard.js';
import { useMemo, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $userSession } from '@/store/store';

let dt = await getCumulPointsDashboard();
dt.forEach((item) => {
  item.match_date = new Date(item.match_date);
});

export function DashboardEtudiant() {
  const session = useStore($userSession);

  dt = dt.filter((element) => {
    return element.Joueur == session.player.username;
  });

  return (
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
  );
}
