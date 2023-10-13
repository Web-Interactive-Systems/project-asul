import { Grid } from "@radix-ui/themes";
import Plot from "@/features/dashboard/Plot";
import mockData from "@/features/dashboard/data.json";

const Data = mockData.map((d) => {
  return {
    ...d,
    date: new Date(d.date),
  };
});

export default function App() {
  return (
    <Grid rows="2" columns="2" gap="2">
      <Plot.root
        data={Data}
        plotOptions={{
          color: { scheme: "burd" },
          x: {
            tickFormat: "%d/%m/%Y",
            ticks: 5,
          },
        }}
      >
        <Plot.dot
          options={{
            x: "date",
            y: "score",
            stroke: "username",
            r: 5,
          }}
        />
        <Plot.line
          options={{
            x: "date",
            y: "score",
            stroke: "username",
          }}
        />
      </Plot.root>
      <Plot.root
        data={Data}
        plotOptions={{
          color: { scheme: "burd" },
          x: {
            tickFormat: "%d/%m/%Y",
            ticks: 5,
          },
        }}
      >
        <Plot.line
          options={{
            x: "date",
            y: "score",
            stroke: "username",
          }}
        />
      </Plot.root>
      <Plot.root
        plotOptions={{
          color: { scheme: "burd" },
          x: {
            type: "band",
            tickFormat: "%d/%m/%Y",
            ticks: 5,
          },
        }}
        data={Data}
      >
        <Plot.barY
          options={{
            x: "date",
            y: "score",
            stroke: "username",
          }}
        />
      </Plot.root>
      <Plot.root
        plotOptions={{
          color: { scheme: "burd" },
        }}
        data={Data}
      >
        <Plot.auto
          options={{
            x: "date",
            y: "score",
            stroke: "username",
          }}
        />
      </Plot.root>
    </Grid>
  );
}
