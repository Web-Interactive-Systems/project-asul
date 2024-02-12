import { Card } from '@radix-ui/themes';
import { getNbMatchGagneById } from '@/actions/getNbMatchGagneById';
import { getNbMatchById } from '@/actions/getNbMatchById';
import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $userSession } from '@/store/store';
import { Chart } from "chart.js";


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
            console.log(values.data['length']);
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


      //   const myChart = new Chart({
      //     type: 'doughnut',
      //     data: {
      //         labels: '',
      //         datasets: [{
      //             label: '',
      //             data: [{nbMatch}-{nbMatchGagnes},{nbMatch}],
      //             backgroundColor: [
      //               'rgb(255, 99, 132)',
      //               'rgb(54, 162, 235)',
      //             ],
      //             borderWidth: 1
      //         }]
      //     },
      //    options: {
      //         scales: {
      //             yAxes: [{
      //                 ticks: {
      //                     beginAtZero: true
      //                 }
      //             }]
      //         }
      //     }
      // });
    })();
  }, [session]);

  return (
    <Card>
      Nombre de victoires : {nbMatchGagnes}
      Nombre de match : {nbMatch}
    </Card>
  );
}


