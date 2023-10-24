  import { Grid } from '@radix-ui/themes';
  import Plot from '@/features/dashboard/Plot';
  import mockData from '@/features/dashboard/data.json';
  import * as Plott from "@observablehq/plot";
  import {getCumulPointsDashboard} from '../../actions/getCumulPointsDashboard.js';

  const Data = mockData.map((d) => {
    return {
      ...d,
      date: new Date(d.date),
    };
  });
  const dt = await getCumulPointsDashboard()
  dt.forEach(item => {
    item.match_date = new Date(item.match_date);
  });
  console.log(Data)
  console.log(dt)

  export function Dashboard() {
    const tes = Plott.plot({
      marks: [
        Plott.ruleY([0]),
        Plott.lineY(dt, {x: "match_date", y: "score", stroke: "userid", tip: true}),
        Plott.dot(dt, {x: "match_date", y: "score", stroke: "userid", r: 3,  tip: true})
      ],
      tooltip: {
        fill: "red",
        stroke: "blue",
        r: 8
      }
    })
    return (
      <>
      <div
        dangerouslySetInnerHTML={{__html:tes.outerHTML}}
      >
      </div>
      <Grid rows="2" columns="2" gap="2">
        <Plot.root
          data={dt}
          plotOptions={{
            grid: true,
            x: {
              tickFormat: '%d/%m/%Y',
              label:'Date des Matchs'
            },
            y: {
              label:'Score des Joueurs'
            },
          }}
        >
          <Plot.dot
            options={{
              x: 'match_date',
              y: 'score',
              stroke: 'userid',
              r: 3,
              tip: true
            }}
          />
          <Plot.ruleY options={[100]}/>
          <Plot.lineY
            options={{
              x: 'match_date',
              y: 'score',
              stroke: 'userid',
              tip: true
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
      </>
    );
  }
