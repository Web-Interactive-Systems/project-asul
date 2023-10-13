import * as Plot from "@observablehq/plot";
import { createContext, useContext, useEffect, useState } from "react";
const marksContext = createContext([[], () => {}]);
const DataContext = createContext([[], () => {}]);

export function root({ children, plotOptions, data }) {
  const [marks, setMarks] = useState([]);

  if (marks.length === 0) {
    return (
      <marksContext.Provider value={[marks, setMarks]}>
        <DataContext.Provider value={data}>{children}</DataContext.Provider>
      </marksContext.Provider>
    );
  }

  const plot = Plot.plot({
    ...plotOptions,
    marks,
  });

  return (
    <marksContext.Provider value={[marks, setMarks]}>
      <DataContext.Provider value={data}>
        {children}
        {plot && (
          <div
            style={{
              color: "black",
            }}
            dangerouslySetInnerHTML={{ __html: plot.outerHTML }}
          ></div>
        )}
      </DataContext.Provider>
    </marksContext.Provider>
  );
}

export default new Proxy(
  {},
  {
    get: function (_, name) {
      if (name === "root") return root;
      if (!(name in Plot)) throw new Error("Plot does not have " + name);

      const DefaultComp = ({ options }) => {
        const [_, setMarks] = useContext(marksContext);
        const data = useContext(DataContext);
        useEffect(() => {
          setMarks((prev) => [...prev, Plot[name](data, options)]);
        }, [data]);
        return null;
      };

      return DefaultComp;
    },
  }
);
