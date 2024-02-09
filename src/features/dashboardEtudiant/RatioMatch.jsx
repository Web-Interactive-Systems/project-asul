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
      (async () => {
        if (session){
          const { count, error } = await getNbMatchGagneById(session.user.id);
          setNbMatchGagnes(count);

          const { data } = await getNbMatchById(session.user.id);
          setNbMatch(data['length']);

          setMatchPerdu(nbMatch - nbMatchGagnes)
          

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
  
    console.log('perdu',MatchPerdu);
    console.log('gagné',nbMatchGagnes);
    console.log('nombre de match gagné',nbMatch);

    return (
      <Card>
        Nombre de victoires : {nbMatchGagnes}
        Nombre de match : {nbMatch}
      </Card>
    );
  }
  
  
  