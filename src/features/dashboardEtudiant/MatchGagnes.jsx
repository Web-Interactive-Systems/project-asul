import { Card } from '@radix-ui/themes';
import { getNbMatchGagneById } from '@/actions/getNbMatchGagneById';
import { useEffect, useState } from 'react';

// const matches = await getMatches();

export function NbMatchGagnes() {
  const [nbMatchGagnes, setNbMatchGagnes] = useState(0);
  const {count, error} = getNbMatchGagneById();
  // console.log("nb matchs", nbMatchGagnes)

  useEffect(() => {

    const fetchData = async () =>{
      const {count, error} = await getNbMatchGagneById();
      setNbMatchGagnes(count);
    };

    fetchData();

    // count ? setNbMatchGagnes(count) : null;
    // console.log("error", error)
    // console.log("count", count)
  }, []);

  return (
      <Card>
        Nombre de match gagnés : {nbMatchGagnes}
      </Card>
  );
}
