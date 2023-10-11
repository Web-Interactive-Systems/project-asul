import React from "react";
import { Flex, Heading, Box, Popover, Button } from "@radix-ui/themes"
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
// import "@reach/combobox/styles.css";

import { usePlayerMatch } from "../Hooks/usePlayerMatch";


function InuputSelect({ placeholder = "input select", onSelect }) {

  const [term, setTerm] = React.useState("");

  const results = usePlayerMatch(term);

  const handleChange = (event) => setTerm(event.target.value);

  return (
    <Combobox aria-labelledby="demo" onSelect={onSelect} openOnFocus={true}>
      <ComboboxInput autocomplete
        onChange={handleChange}/>
<ComboboxPopover>
        <Box>
          
          <ComboboxList>
            {results.map((data) => (
               <ComboboxOption key={data.name} value={data.name} />
            ))}
          </ComboboxList>
        </Box>
  </ComboboxPopover>
    </Combobox>

  )
}


export function CreateMatch() {
  const handleSelect = (selection) => console.log("handleSelect", selection)

  return (
    <Flex direction="column">
      <Heading>Create Match</Heading>
      <Flex direction="row">

        <InuputSelect placeholder="Player 1" onSelect={handleSelect} />
      </Flex>
    </Flex>

  );
};