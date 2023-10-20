import Cross from "../../src/features/Theme/cross";
import {format} from "date-fns"
import {
  DatePickerStateProvider,
  useContextDaysPropGetters,
  useContextCalendars,
  useContextDatePickerOffsetPropGetters,
} from '@rehookify/datepicker';
import { Flex, Button, Grid, Box, Text, Badge } from '@radix-ui/themes';
import clsx from 'clsx';
import './Multiple.css';

const getDayClassName = (className, { selected }) => clsx('dayNumber', { 'active-date': selected });

const DatePicker = ({ prevButton, nextButton, calendar }) => {
  const { weekDays } = useContextCalendars();
  const { dayButton } = useContextDaysPropGetters();
  const { month, year, days } = calendar;
  weekDays.forEach((element, index) => {
    switch (element) {
      case "Sun": weekDays[index] = "Dim";break;
      case "Mon": weekDays[index] = "Lun";break;
      case "Tue": weekDays[index] = "Mar";break;
      case "Wed": weekDays[index] = "Mer";break;
      case "Thu": weekDays[index] = "Jeu";break;
      case "Fri": weekDays[index] = "Ven";break;
      case "Sat": weekDays[index] = "Sam";break;
    }
  });
  return (
    <section>
      <Flex
        direction="column"
        gap="3"
        style={{ maxWidth: 300, height: 300 }}
        className="calendarPopup"
        align="center"
        justify="center"
      >
        <Flex className="datePickerHeader">
          <Box className="changeMonth">{prevButton}</Box>
          <Box className="monthDisplay">
            {month} {year}
          </Box>
          <Box className="changeMonth">{nextButton}</Box>
        </Flex>
        <Grid columns="7" gap="1">
          {weekDays.map((day) => (
            <Flex key={`${month}-${day}`} className="dateLibelle" align="center" justify="center">
              {day}
            </Flex>
          ))}
          {days.map((dpDay) => {
            return (
              <Flex
                align="center"
                justify="center"
                key={dpDay.$date.toDateString()}
                className={getDayClassName('dateCase', dpDay)}
                {...dayButton(dpDay)}
              >
                {dpDay.day}
              </Flex>
            );
          })}
        </Grid>
      </Flex>
    </section>
  );
};

const Root = () => {
  const { subtractOffset, addOffset } = useContextDatePickerOffsetPropGetters();
  const { calendars } = useContextCalendars();
  return (
    <section>
      <DatePicker
        prevButton={
          <Button className="monthBtn" {...subtractOffset({ months: 1 })}>
            ‹
          </Button>
        }
        nextButton={
          <Button className="monthBtn" {...addOffset({ months: 1 })}>
            ›
          </Button>
        }
        calendar={calendars[0]}
      />
    </section>
  );
};

export const MultipleDatePicker = ({selectedDates,onDatesChange,handleSupprClick}) => {
  return (
    <DatePickerStateProvider
      config={{
        selectedDates,
        onDatesChange,
        dates: { mode: 'multiple', toggle: true },
      }}
    >
      <Flex direction="row-reverse">
        <Flex direction="column" className="selected-date" gap="2" style={{ width: 200, height: 300 }}>
          <Text>Dates Sélectionnées:</Text>
              {selectedDates.sort((a,b)=>{return a-b}).map((date,index) => (    
              <Button color="indigo" variant="soft" key={index} onClick={()=>{handleSupprClick(index)}}>{format(date,"dd MMM yyyy")}<Badge color="crimson">{<Cross></Cross>}</Badge></Button>))
          }
        </Flex>
        <Root />
      </Flex>
    </DatePickerStateProvider>
    
  );
};