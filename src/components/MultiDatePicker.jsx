import { useState } from 'react';
import { useDatePickerState,DatePickerStateProvider,useDatePicker, useCalendars } from '@rehookify/datepicker';
import { Flex, Text, Button, Grid, Box } from '@radix-ui/themes';

const MultipleDatePicker = () => {

  const [selectedDates, onDatesChange] = useState([]);

  const {
    data: { weekDays, calendars },
    propGetters: {
      dayButton,
      previousMonthButton,
      nextMonthButton,
    },
  } = useDatePicker({
    selectedDates,
    onDatesChange,
  });

  const { month, year, days } = calendars[0];

  const onDayClick = (evt, date) => {
    //selectedDates = onDatesChange(selectedDates.push)
    console.log(date);
  }

  return (
    <section>   
      <Flex direction="column" gap="3" style={{ maxWidth: 400 }} align='center' justify='center'>  
            <Box>{month} {year}</Box>
          <Grid columns="7" gap="1" >
            {weekDays.map((day) => (
              <Flex key={`${month}-${day}`} align='center' justify='center'>{day}</Flex>
            ))}
          {days.map((dpDay) => (
            <Button key={dpDay.$date.toDateString()}  {...dayButton(dpDay, { onClick: onDayClick })}>
              {dpDay.day}
            </Button> 
          ))}
        </Grid>
      </Flex>
    </section>
  );
}
export default MultipleDatePicker
  



