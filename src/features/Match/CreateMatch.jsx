import React from "react";
import {Flex, Heading, Box} from "@radix-ui/themes"
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
// import "@reach/combobox/styles.css";

import { usePlayerMatch } from "../Hooks/usePlayerMatch";

const options = [
  {
    sortcode: "55-77-42-56",
    accountnumber: "0848890234",
    accounttype: "savings account",
    accountname: "xyz sam"
  }
  // ...
];


function InuputSelect({placeholder = "input select"}) {

  const [term, setTerm] = React.useState("");
  const results = usePlayerMatch(term);
  const handleChange = (event) => setTerm(event.target.value);

  return (
    <Combobox aria-labelledby="demo">
      <ComboboxInput autocomplete 
      onChange={handleChange}/>
      <ComboboxPopover>
        <Box style={{background: 'red'}}>
          {JSON.stringify(results)}
          {/* map le tableau de result
          List ul // Option li
          dans value result.name */}
        <ComboboxList>
          <ComboboxOption value="Apple" />
        </ComboboxList></Box>
      </ComboboxPopover>
  </Combobox>

  )
}


export function CreateMatch () {

  return (
    <Flex direction="column">
      <Heading>Create Match</Heading>

      <Flex direction="row">
      <InuputSelect placeholder="Player 1" />
     
      </Flex>
    </Flex>
     
  );
};