import { getMatches } from "@/actions"
import { Grid, Card, Box, Flex, Text, Strong, Link } from "@radix-ui/themes"
import { RxPlusCircled } from 'react-icons/rx';
import { GiSwordsEmblem } from "react-icons/gi"
import { IconContext } from 'react-icons'
import { useState, useEffect } from "react"
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export function MatchList() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const data = await getMatches();
        setMatches(data);
    };

    fetchData();
  }, []);

  return <>
    <Grid columns="4" gap="3" width="auto">
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