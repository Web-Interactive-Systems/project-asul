import { Card } from '@radix-ui/themes';
import { getNbMatchGagneById } from '@/actions/getNbMatchGagneById';
import { getNbMatchById } from '@/actions/getNbMatchById';
import { useEffect, useState, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { $userSession } from '@/store/store';
import Plot from '@/features/dashboard/Plot';


export function NbMatch() {
  const [nbMatchGagnes, setNbMatchGagnes] = useState(0);
  const [nbMatch, setNbMatch] = useState(0);
  const [MatchPerdu, setMatchPerdu] = useState(0);
  const session = useStore($userSession);
  // console.log("nb matchs", nbMatchGagnes)

  useEffect(() => {
    let totalMatch;
    (async () => {
      if (session) {
        await getNbMatchById(session.user.id).then(
          async (values) => {
            await setNbMatch(values.data['length']);
            totalMatch = values.data['length']
            return values;
          }, (reason) => {
            console.error(reason)
            return reason
          }
        );
        await getNbMatchGagneById(session.user.id).then(
          async (values) => {
            await setNbMatchGagnes(values.count);
            await setMatchPerdu(totalMatch - values.count)
            console.log(totalMatch - values.count)
          }, (reason) => {
            console.error(reason)
            return reason
          }
        );
      };
    })();
  }, [session]);

  return (
    <Card>
      <Plot.root
        data={[{'libelle':'win','score':nbMatchGagnes},{'libelle':'lose','score':MatchPerdu}]}
      >
        <Plot.barY
          options={{
            x: 'Match gagné/perdu',
            y: 'score',
          }}
        />
        <Plot.ruleY options={[70]} />
      </Plot.root>
    </Card>
  );
}


