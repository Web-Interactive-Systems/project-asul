import * as Plot from '@observablehq/plot';
import { createContext, useContext, useEffect, useState, useRef } from 'react';

const MarksContext = createContext([[], () => {}]);
const DataContext = createContext([[], () => {}]);

export function root({ children, plotOptions, data }) {
  const [marks, setMarks] = useState([]);
  const divElem = useRef(null);

  useEffect(() => {
    if (divElem.current) {
      const plot = Plot.plot({
        ...plotOptions,
        marks,
      });

      divElem.current.append(plot);
      return () => {
        plot.remove();
      };
    }
  }, [marks, data]);

  if (marks.length === 0) {
    return (
      <MarksContext.Provider value={[marks, setMarks]}>
        <DataContext.Provider value={data}>{children}</DataContext.Provider>
      </MarksContext.Provider>
    );
  }

  return (
    <MarksContext.Provider value={[marks, setMarks]}>
      <DataContext.Provider value={data}>
        {children}
        <div
          style={{
            color: '#303030',
          }}
          ref={divElem}
        ></div>
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