import * as Plot from "@observablehq/plot";

/**
 *
 * @param {
 *  {
 *    plotOptions: any,
 *    type: string[],
 *    data: any[],
 *    marksOptions: any
 *  }
 * } param0
 * @returns
 */
export default function PlotFigure({ plotOptions, types, data, marksOptions }) {
  const marks = types.map((type) => {
    return Plot[type](data, marksOptions[type]);
  });
  console.log(marks);
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
