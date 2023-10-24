import { Card } from '@radix-ui/themes';
import { getNbMatchGagneById } from '@/actions/getNbMatchGagneById';
import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $userSession } from '@/store/store';

export function NbMatchGagnes() {
  const [nbMatchGagnes, setNbMatchGagnes] = useState(0);
  const { count, error } = getNbMatchGagneById();
  const session = useStore($userSession);
  // console.log("nb matchs", nbMatchGagnes)

  useEffect(() => {
    (async () => {
      if (session){
        const { count, error } = await getNbMatchGagneById(session.user.id);
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
