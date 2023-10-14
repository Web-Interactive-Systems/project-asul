import { getMatches } from "@/actions"
import { Grid, Card, Heading, Flex, Text, Strong, Link, Button } from "@radix-ui/themes"
import { RxPlusCircled, RxArrowLeft } from 'react-icons/rx';
import { GiSwordsEmblem } from "react-icons/gi"
import { useState, useEffect } from "react"
import { formatDistanceToNow, format } from "date-fns";
import { fr } from "date-fns/locale";
import { postgres, supabase } from "@/lib/supabase";

export function MatchList() {
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
    <Flex align={"center"} style={{marginBottom: '1rem'}} gap="3">
      <Button variant="soft">
        <Link href="#">
          <Flex justify={"center"} align={"center"} gap="2">
            <RxArrowLeft />
            <Text>Sessions</Text>
          </Flex>
        </Link>
      </Button>
      <Heading size={{initial: "3", xs: "5", sm: "7"}}>Mes matches <Text weight={'light'}>- {format(new Date(), 'dd/LL/Y')}</Text></Heading>
    </Flex>
    <Grid columns={{initial: '1', xs: '2', sm: '3', md: '4', lg: '5'}} gap="3">
      {[
        <Link key={-1} href="#" style={{color: 'inherit', textDecoration: 'none'}}>
          <Card >
          <Flex justify={"center"} align={"center"} height={"100%"}>
              <Flex justify={"center"} align={"center"} gap="2">
                <Text>Nouveau matche</Text>
                <RxPlusCircled />
              </Flex>
          </Flex>
        </Card>
        </Link>,
      ...matches.map((match, i) => {
        return <Link key={i} href="#" style={{gridColumnStart: !i && 1, color: 'inherit', textDecoration: 'none'}}>
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
      })]}
    </Grid>
  </>
}