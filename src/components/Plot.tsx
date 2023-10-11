import * as Plot from "@observablehq/plot";
import mockData from "@lib/data.json";

interface IData {
  userid: number;
  username: string;
  score: number;
  date: Date | string;
}

export default function PlotFigure({ options }) {
  const Data = mockData as IData[];
  Data.forEach((d) => {
    d.date = new Date(d.date);
  });

  const marks = [
    Plot.ruleY([0]),
    Plot.dot(Data, {
      x: "date",
      y: "score",
      stroke: "username",
    }),
  ];

  options.marks = marks;
  const plot = Plot.plot({
    x: {
      tickFormat: (date) => date.toLocaleDateString("fr-FR"),
      ticks: 5,
    },
    ...options,
  }).outerHTML;
  return <div dangerouslySetInnerHTML={{ __html: plot }}></div>;
}
