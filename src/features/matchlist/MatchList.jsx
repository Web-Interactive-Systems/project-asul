import { getMatches } from "@/actions"
import { Grid, Card } from "@radix-ui/themes"
import { useState, useEffect } from "react"

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
    <Grid columns="3" gap="3" width="auto">
      {[<Card key={-1}>Hello</Card>, ...matches.map((match, i) => <Card key={i}>{match.title}</Card>)]}
    </Grid>
  </>
}