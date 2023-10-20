import { useState } from "react"
import { Flex, Button, Grid, Box,Badge,Text } from '@radix-ui/themes';
import {MultipleDatePicker} from '../../components/MultiDatePicker'
import { getSessions } from "@/actions/getSessions";



 export function SessionSelector({onClose}) {
    const [selectedDates, onDatesChange] = useState([]);
    const handleSupprClick = (index) =>{
        const newDates = selectedDates.filter((_, i) => i !== index);
        onDatesChange(newDates);
    }
    return( 
        <>
        <Flex>
            <MultipleDatePicker selectedDates={selectedDates} onDatesChange={onDatesChange} handleSupprClick={handleSupprClick}></MultipleDatePicker>
        </Flex>
        </>
    )
}