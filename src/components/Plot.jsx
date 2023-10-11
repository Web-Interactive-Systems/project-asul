import * as Plot from "@observablehq/plot";
import Data from "@lib/data.json";

export default function PlotFigure({ options }) {
  const marks = [
    Plot.dot(Data[0].scores, {
      x: "date",
      y: "score",
    }),
  ];

  // Data.forEach((user) => {
  const dot = Plot.dot(Data[0].scores, {
    x: "date",
    y: "score",
  });
  // marks.push(dot);
  console.log(marks);
  console.log(options);
  options.marks = marks;
  const plot = Plot.plot({ ...options, document: new Document() });
  console.log(plot);
  return plot.toHyperScript();
}
