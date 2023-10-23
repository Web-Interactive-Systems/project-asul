import * as Plot from '@observablehq/plot';
import { createContext, useContext, useEffect, useState } from 'react';

const MarksContext = createContext([[], () => {}]);
const DataContext = createContext([[], () => {}]);

export function root({ children, plotOptions, data }) {
  const [marks, setMarks] = useState([]);

  if (marks.length === 0) {
    return (
      <MarksContext.Provider value={[marks, setMarks]}>
        <DataContext.Provider value={data}>{children}</DataContext.Provider>
      </MarksContext.Provider>
    );
  }

  const plot = Plot.plot({
    ...plotOptions,
    marks,
  });

  return (
    <MarksContext.Provider value={[marks, setMarks]}>
      <DataContext.Provider value={data}>
        {children}
        {plot && (
          <div
            style={{
              color: 'black',
            }}
            dangerouslySetInnerHTML={{ __html: plot.outerHTML }}
          ></div>
        )}
      </DataContext.Provider>
    </MarksContext.Provider>
  );
}

export default new Proxy(
  {},
  {
    get: function (_, name) {
      if (name === 'root') return root;
      if (!(name in Plot)) throw new Error('Plot does not have ' + name);

      const DefaultComp = ({ options }) => {
        const [_, setMarks] = useContext(MarksContext);
        const data = useContext(DataContext);

        useEffect(() => {
          if (name === "ruleY") {
            setMarks((prev) => [...prev, Plot[name](options)])
          }
          else{
            setMarks((prev) => [...prev, Plot[name](data, options)]);
          }
        }, [data]);

        return null;
      };

      return DefaultComp;
    },
  }
);
