import { Card } from '@radix-ui/themes';
import { getPointsSessionById } from '@/actions/getPointsSessionById';
import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $userSession } from '@/store/store';

export function timelineJoueur() {
  const [nbMatchGagnes, setNbMatchGagnes] = useState(0);
  const { computedScoreByDate, error } = getPointsSessionById();
  const session = useStore($userSession);
  // console.log("nb matchs", nbMatchGagnes)

  useEffect(() => {
    (async () => {
      if (session){
        const { count, error } = await getPointsSessionById(session.user.id);
        setNbMatchGagnes(count);
      }

    })();
  }, [session]);

  return (
    <Card>
      Nombre de victoires : {nbMatchGagnes}
    </Card>
  );
}