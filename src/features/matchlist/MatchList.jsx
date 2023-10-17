import { getMatches } from "@/actions"
import { Grid, Card, Flex, Text, Strong, Link, Button, Heading } from "@radix-ui/themes"
import { RxPlusCircled, RxArrowLeft } from 'react-icons/rx';
import { GiSwordsEmblem } from "react-icons/gi"
import { useState, useEffect } from "react"
import { formatDistanceToNow, format } from "date-fns";
import { fr } from "date-fns/locale";
import { postgres } from "@/lib/supabase";

export function MatchList({onClose, session}) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const matchInsertHandler = (data) => {
      setMatches(matches => [data.new, ...matches])
    }

    postgres.match.on('INSERT', matchInsertHandler)

    const fetchData = async () => {
        const data = await getMatches();
        setMatches(data);
    };

    fetchData();

    return () => {
      postgres.match.off('INSERT', matchInsertHandler)
    }
  }, []);

  return <>
    <Heading style={{fontSize: '1rem', marginBottom: 'var(--space-3)'}}>Session du {format(new Date(session.created_at), 'dd/LL/Y')}</Heading>
    <Flex align={"center"} style={{marginBottom: 'var(--space-3)'}} gap="3">
      <Button variant="soft" onClick={onClose} style={{cursor: 'pointer'}} >
        <Flex justify={"center"} align={"center"} gap="2">
          <RxArrowLeft />
          <Text>Changer de session</Text>
        </Flex>
      </Button>
      <Button variant="soft" >
        <Link href="#" style={{color: 'inherit', textDecoration: 'none'}}>
          <Flex justify={"center"} align={"center"} gap="2">
            <Text>Nouveau matche</Text>
            <RxPlusCircled />
          </Flex>
        </Link>
      </Button>
    </Flex>
    <Grid columns={{initial: '1', xs: '2', sm: '3', md: '4', lg: '5'}} gap="3">
      {matches.map((match, i) => {
        return <Link key={i} href="#" style={{color: 'inherit', textDecoration: 'none'}}>
          <Card>
          <Flex justify={"center"} align={"center"} direction={"column"} height={"100%"}>
              <small style={{opacity: 0.5}}>Il y a {formatDistanceToNow(new Date(match.created_at), {locale: fr})}</small>
              <Flex justify={"center"} align={"center"} gap="2">
                <GiSwordsEmblem />
                <Text>Matche contre <Strong>{ "Adversaire" }</Strong></Text>
              </Flex>
              <Strong style={{fontSize: '1.5rem', color: `var(--${Math.round(Math.random()) && 'red' || 'green'}-10)`}}>{"2"} - {"0"}</Strong>
          </Flex>
        </Card>
        </Link>
      })}
    </Grid>
  </>
}