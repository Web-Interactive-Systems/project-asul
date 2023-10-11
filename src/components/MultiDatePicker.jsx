import { useState } from "react";
import {
  DatePickerStateProvider,
  useContextDaysPropGetters,
  useContextCalendars,
  useContextDatePickerOffsetPropGetters
} from "@rehookify/datepicker";
import { Flex, Text, Button, Grid, Box } from "@radix-ui/themes";
import clsx from "clsx";
import './Multiple.css'
const getDayClassName = (
  className,
  { selected, disabled, inCurrentMonth, now, range }
) => 
  clsx(
     {'active-date': selected}
  );

const DatePicker = ({ prevButton, nextButton, calendar }) => {

  const { weekDays } = useContextCalendars();
  const { dayButton } = useContextDaysPropGetters();

  const { month, year, days } = calendar;
  return (
    <section>
      <Flex
        direction="column"
        gap="3"
        style={{ maxWidth: 400 }}
        align="center"
        justify="center"
      >
        <Flex gap="3" align="center" justify="center">
        {prevButton}
          <Box>
            {month} {year}
          </Box>
          {nextButton}
        </Flex>
        <Grid columns="7" gap="1">
          {weekDays.map((day) => (
            <Flex key={`${month}-${day}`} align="center" justify="center">
              {day}
            </Flex>
          ))}
          {days.map((dpDay) => {
            return(
              <Box
              key={dpDay.$date.toDateString()}
              className={getDayClassName("", dpDay)}
              {...dayButton(dpDay)}
              >
              {dpDay.day}
            </Box>
            )
          })}
        </Grid>
      </Flex>
      <style>
        
      </style>
    </section>
  );
};

const Root = () => {
  const { subtractOffset, addOffset } = useContextDatePickerOffsetPropGetters()
  const { calendars } = useContextCalendars();
  return (
      <section>
        <DatePicker 
          prevButton={
            <button {...subtractOffset({ months: 1 })}>‹</button>
              }
          nextButton={
            <button {...addOffset({ months: 1 })}>›</button>
          }
          calendar={calendars[0]}
        />
      </section>
  );
};
const MultipleDatePicker = () => {
  const [selectedDates, onDatesChange] = useState([]);
  console.log(selectedDates)

  return (
    <DatePickerStateProvider
      config={{
        selectedDates,
        onDatesChange,
        dates: { mode: "multiple" },
      }}
      >    
      <Root/>
    </DatePickerStateProvider>
  );
};

export default MultipleDatePicker;
