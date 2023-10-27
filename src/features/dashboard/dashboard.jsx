import { Grid } from '@radix-ui/themes';
import Plot from '@/features/dashboard/Plot';
import mockData from '@/features/dashboard/data.json';
import { getCumulPointsDashboard } from '../../actions/getCumulPointsDashboard.js';
import { Leaderboard } from '@/features/dashboard/Leaderboard';

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
  return <Leaderboard />;
}
