import React from "react";
import {useState} from "react";
import { Flex, Heading, Box, Button} from "@radix-ui/themes"
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
// import "@reach/combobox/styles.css";

import { useDateMatch } from "../Hooks/useDateMatch";



function InuputSelect({ onSelect }) {

  const [term, setTerm] = useState("");

  

  const results = useDateMatch(term);

  const handleChange = (event) => setTerm(event.target.value);



  return (
    <Combobox aria-labelledby="demo" onSelect={onSelect} openOnFocus={true}>
      <ComboboxInput autocomplete
        onChange={handleChange}/>
      <ComboboxPopover>
        <Box>
          <ComboboxList>
            {results.map((data) => (
               <ComboboxOption key={data.date} value={data.date} />
            ))}
          </ComboboxList>
        </Box>
      </ComboboxPopover>
    </Combobox>
  )
}


export function SelectDate() {
  const [DisableButton, setDisableButton] = useState(true);

  const handleSelect = (selection) => {
    if (selection == ""){
      setDisableButton(true)
    }
    else{
      setDisableButton(false)
    }
    console.log(selection)
  }
  
  return (
    <Flex direction="column" align="center" gap="3">
      <Heading>Sélection de la session</Heading>
      <InuputSelect placeholder="Player 1" onSelect={handleSelect} />
      <Button radius="large" color="blue" variant="solid" disabled={DisableButton}>Select session</Button>
    </Flex>

  );
};