import * as Plot from "@observablehq/plot";

export default function PlotFigure({ options }) {
  return Plot.plot({ ...options, document: new Document() }).toHyperScript();
}
