import * as Plot from "@observablehq/plot";

/**
 *
 * @param {
 *  {
 *    plotOptions: any,
 *    type: "area" | "arrow" | "auto" | "axis" | "bar" | "bollinger" | "box" | "cell" | "contour" | "delaunay" | "density" | "dot" | "frame" | "geo" | "grid" | "hexgrid" | "image" | "line" | "linearRegression" | "link" | "raster" | "rect" | "rule" | "text" | "tick" | "tip" | "tree" | "vector,
 *    data: any[],
 *    marksOptions: any
 *  }
 * } param0
 * @returns
 */
export default function PlotFigure({ plotOptions, type, data, marksOptions }) {
  const marks = [Plot[type](data, marksOptions)];
  const plot = Plot.plot({
    ...plotOptions,
    marks,
  }).outerHTML;
  return (
    <div
      style={{
        color: "black",
      }}
      dangerouslySetInnerHTML={{ __html: plot }}
    ></div>
  );
}
