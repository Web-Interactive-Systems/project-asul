import * as Plot from "@observablehq/plot";

/**
 *
 * @param {
 *  {
 *    plotOptions: any,
 *    type: string,
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
